import {Dispatcher} from 'flux';
import TabStore from "./Stores/TabStore";
import AuthStore from "./Stores/AuthStore";
import AppStore from './Stores/AppStore';
import LongPoll from "./Api/LongPoll";
import lpCallback from "./Api/Worker";
import {sortLots} from "./Helpers";

export const TAB_CHANGED = "EVENT_TAB_CHANGED";
export const APP_CONNCETED = "APP_CONNECTED";
export const LOT_SELECTED = "LOT_SELECTED";
export const LOTNULL_SELECTED = "LOTNULL_SELECTED";

const AppDispatcher = new Dispatcher();

AppDispatcher.register((payload)=> {
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

            AppStore.Lots = sortLots(payload.StartData.lots);
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
            break;
        case LOTNULL_SELECTED:
            AppStore.setNullSA();
            AppStore.emitChange();
            break;
        default:
            break;
    }
});

export default AppDispatcher;