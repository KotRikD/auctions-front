import EventEmitter from 'events';
import merge from 'merge';

let TabStore = merge(EventEmitter.prototype, {

    Tab: "home",

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

export default TabStore;