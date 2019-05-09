import {Dispatcher} from 'flux';
import TabStore from "./Stores/TabStore";

export const TAB_CHANGED = "EVENT_TAB_CHANGED";

const AppDispatcher = new Dispatcher();

AppDispatcher.register((payload)=> {
    switch(payload.type) {
        case TAB_CHANGED:
            TabStore.Tab = payload.tab;
            TabStore.emitChange();
            break;
        default:
            break;
    }
});

export default AppDispatcher;