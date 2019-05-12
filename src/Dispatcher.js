import {Dispatcher} from 'flux';
import TabStore from "./Stores/TabStore";
import AuthStore from "./Stores/AuthStore";
import AppStore from './Stores/AppStore';
import LongPoll from "./Api/LongPoll";
import lpCallback from "./Api/Worker";
import {sortLots} from "./Helpers";
import ApiHelper from "./Api/ApiHelper";

export const TAB_CHANGED = "EVENT_TAB_CHANGED";
export const APP_CONNCETED = "APP_CONNECTED";
export const LOT_SELECTED = "LOT_SELECTED";
export const LOTNULL_SELECTED = "LOTNULL_SELECTED";
export const ERROR_SUBMITTED = "ERROR_SUBMITTED";
export const NEW_LOT = "NEW_LOT";
export const SHOW_MESSAGE = "SHOW_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const LOT_UPDATE = "LOT_UPDATE";
export const WIN_LOT = "WIN_LOT";
export const UPDATE_DATA = "UPDATE_DATA";
export const CLEAR_WINLOT = "CLEAR_WINLOT";

const AppDispatcher = new Dispatcher();

AppDispatcher.register(async (payload)=> {
    console.log("New Payload");
    console.log(payload);
    console.log("-----payload-----");
    switch(payload.type) {
        case TAB_CHANGED:
            TabStore.Tab = payload.tab;
            TabStore.emitChange();
            break;
        case APP_CONNCETED:
            AuthStore.AuthData = payload.AuthData;
            AuthStore.StartData = payload.StartData;
            AuthStore.VKProfile = payload.VKProfile;
            AuthStore.VKToken = payload.VKToken;

            AuthStore.LongPoll = new LongPoll(
                payload.StartData.longpoll.ts,
                payload.StartData.longpoll.time,
                payload.StartData.longpoll.hash,
                payload.StartData.longpoll.sign,
                payload.AuthData.access_token,
                lpCallback
            );
            AuthStore.emitChange();

            AppStore.Lots = await sortLots(payload.StartData.lots);
            AppStore.emitChange();
            break;
        case LOT_SELECTED:
            let selectedLot = AuthStore.StartData.lots[0];
            for (let lot of AuthStore.StartData.lots) {
                if (lot.id === payload.lot) {
                    selectedLot = lot;
                    break;
                }
            };

            AppStore.SelectedAuction = selectedLot;
            AppStore.emitChange();

            window.history.pushState(null, null, window.location.href);
            break;
        case ERROR_SUBMITTED:
            console.log(payload.error);
            AuthStore.Error = payload.error;
            AuthStore.emitChange();
            break;
        case LOTNULL_SELECTED:
            AppStore.setNullSA();
            AppStore.emitChange();
            break;
        case NEW_LOT:
            AuthStore.StartData.lots.push(payload.lot);
            AppStore.Lots = await sortLots(AuthStore.StartData.lots);
            AuthStore.emitChange();
            AppStore.emitChange();
            break;
        case LOT_UPDATE:
            let slotInd = -1;
            for (let [ind, lot] of AuthStore.StartData.lots.entries()) {
                if (lot.id === payload.updated.id) {
                    slotInd = ind;
                    console.log("Нашёл лот и собираюсь обновлять его!");
                    break;
                }
            }

            AuthStore.StartData.lots[slotInd] = payload.updated;
            if (AppStore.SelectedAuction && AppStore.SelectedAuction.id === AuthStore.StartData.lots[slotInd].id) {
                AppStore.SelectedAuction = AuthStore.StartData.lots[slotInd]
            }
            AppStore.Lots = await sortLots(AuthStore.StartData.lots);

            AuthStore.emitChange();
            AppStore.emitChange();
            break;
        case SHOW_MESSAGE:
            AppStore.showMessage = payload.message;
            AppStore.emitChange();
            break;
        case CLEAR_MESSAGE:
            AppStore.setNullMessage();
            AppStore.emitChange();
            break;
        case WIN_LOT:
            AppStore.winLot = payload.lot;
            AuthStore.StartData.win_history.splice(0,0,payload.lot);
            AuthStore.emitChange();
            AppStore.emitChange();
            break;
        case UPDATE_DATA:
            try {
                let result = await ApiHelper.updateData();
                if (!result.data.response) {
                    AuthStore.Error = result.data.error;
                    AuthStore.emitChange();
                }

                AppStore.setNullSA();
                AppStore.setNullMessage();
                AppStore.setNullLots();

                AuthStore.StartData = result.data.response;
                AppStore.Lots = await sortLots(result.data.response.lots);

                AppStore.emitChange();
                AuthStore.emitChange();
            } catch (e) {
                AuthStore.Error = e;
                AuthStore.emitChange();
            }
            break;
        case CLEAR_WINLOT:
            AppStore.winLot = null;
            AppStore.emitChange();
            break;
        default:
            break;
    }
});

export default AppDispatcher;