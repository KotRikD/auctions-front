import EventEmitter from 'events';
import merge from 'merge';

let AppStore = merge(EventEmitter.prototype, {

    SelectedAuction: null,
    Lots: {
        'onGoing': [],
        'soonGoing': []
    },
    showMessage: null,
    winLot: null,

    setNullSA: function () {
        this.SelectedAuction = null;
        AppStore.emitChange()
    },

    setNullMessage: function() {
        this.showMessage = null;
        AppStore.emitChange();
    },

    setNullLots: function () {
        this.Lots = null;
        AppStore.emitChange();
    },

    emitChange: function () {
        this.emit('change');
    },

    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }

});

export default AppStore;