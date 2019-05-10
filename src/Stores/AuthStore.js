import EventEmitter from 'events';
import merge from 'merge';

let AuthStore = merge(EventEmitter.prototype, {

    AuthData: null,
    Error: null,
    StartData: null,
    VKProfile: null,
    VKToken: null,
    LongPoll: null,

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

export default AuthStore;