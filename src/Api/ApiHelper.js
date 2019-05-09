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

    static getStartData() {
        return api.get('app.getStartData', {
            params: {
                'access_token': AuthStore.AuthData.sign
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

    /*  static getLastGame() {
          return api.get('app.getLastGame', {
              params: {
                  'access_token': AuthStore.userToken.sign
              }
          });
      }

      static getMe() {
          return api.get('app.getMe', {
              params: {
                  'access_token': AuthStore.userToken.sign
              }
          });
      }

      static getCurrentGame() {
          return api.get('app.getCurrentGame', {
              params: {
                  'access_token': AuthStore.userToken.sign
              }
          });
      } */

    static postStory(upload_url) {
        let bodyData = new FormData();
        bodyData.set('access_token', AuthStore.AuthData.sign);
        bodyData.set('data', upload_url);
        return api.post('stories.create', bodyData, {
            headers: {'Content-Type': 'multipart/form-data' }
        })
    }

    static appTrack(hash, message) {
        let to = AuthStore.AuthData.sign;
        if (to === null) {
            to = "";
        }
        let bodyData = new FormData();
        bodyData.set('hash', hash);
        bodyData.set('message', btoa(message));
        bodyData.set('access_token', to);
        return api.post('app.track', bodyData, {
            headers: {'Content-Type': 'multipart/form-data' }
        })
    }

    static selectRoom(type) {
        return api.get('rooms.select', {
            params: {
                'type': type,
                'access_token': AuthStore.AuthData.sign
            }
        })
    }

    static getPayment() {
        return api.get('payment.get', {
            params: {
                'access_token': AuthStore.AuthData.sign
            }
        });
    }

}