import api from '../Api';

export default class LongPoll {
    constructor (ts, time, hash, sign, access_token, callback) {
        this.ts = ts;
        this.time = time;
        this.hash = hash;
        this.sign = sign;
        this.access_token = access_token;
        this.error_times = 0;
        this.callback = callback;
        this.enabled  = true;
        this.execute();
    }

    async execute () {
        while(this.enabled) {
            let result = null;
            try {
                result = await api.get('longpoll', {
                    params: {
                        'ts': this.ts,
                        'time': this.time,
                        'hash': this.hash,
                        'sign': this.sign,
                        'access_token': this.access_token
                    }
                });

                if (!result.data.response) {
                    throw Error("Not connected");
                }
                await this.callback(result.data);
            } catch(e) {
                if(this.error_times>2) {
                    this.enabled = false;
                    window.location.reload(true);
                    break;
                }
                this.error_times+=1;
                continue;
            }
        }
    }
}