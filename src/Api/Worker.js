import AppDispatcher, {LOT_UPDATE, NEW_LOT, SHOW_MESSAGE, UPDATE_DATA, UPDATE_WINS_DATA, WIN_LOT} from "../Dispatcher";

export const LP_DIALOG_MESSAGE = 1;
export const LP_WIN_NEW = 2;
export const LP_LOT_NEW = 3;
export const LP_LOT_UPDATE = 4;
export const LP_GLOBAL_RELOAD = 5;

export default async function lpCallback(data) {
    if (!data.response.events || data.response.events === undefined) return;
    if(document.hidden) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return false;
    }


    for(let ev of data.response.events) {
        console.log(ev);
        //START Responsing events
        //0 index - its type of longpoll event
        //1 index - its body of longpoll event
        switch(ev[0]) {
            case LP_LOT_NEW:
                AppDispatcher.dispatch({
                    type: NEW_LOT,
                    lot: ev[1]
                });
                break;
            case LP_DIALOG_MESSAGE:
                AppDispatcher.dispatch({
                    type: SHOW_MESSAGE,
                    message: ev[1].message
                });
                break;
            case LP_LOT_UPDATE:
                AppDispatcher.dispatch({
                    type: LOT_UPDATE,
                    updated: ev[1]
                });
                break;
            case LP_WIN_NEW:
                AppDispatcher.dispatch({
                    type: WIN_LOT,
                    lot: ev[1]
                });
                break;
            case LP_GLOBAL_RELOAD:
                AppDispatcher.dispatch({
                    type: UPDATE_DATA
                });
                break;
            default:
                console.log("Неизвестное событие: "+ev[0]);
                break;

        }
    }
    return;
}