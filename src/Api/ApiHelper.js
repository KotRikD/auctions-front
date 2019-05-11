import api from './index';
import AuthStore from "../Stores/AuthStore";


export default class ApiHelper {

    static getData(b64) {
        let bodyData = new FormData();
        bodyData.set('data', b64);
        return api.post('app.connect', bodyData, {
            headers: {'Content-Type': 'multipart/form-data' }
        });
    }

    static getStartData(authToken = undefined) {
        let token = null;
        if(authToken !== undefined) {
            token = authToken
        } else {
            if(AuthStore.AuthData.access_token === null) {
                return false;
            } else {
                token = AuthStore.AuthData.access_token
            }
        }
        return api.get('app.getStartData', {
            params: {
                'access_token': token
            }
        });
    }

    static updateData() {
        return api.get('app.updateData', {
            params: {
                'access_token': AuthStore.AuthData.sign
            }
        })
    }

    static getWinHistory() {
        return api.get('app.getWinHistory', {
            params: {
                'access_token': AuthStore.AuthData.sign
            }
        })
    }

}