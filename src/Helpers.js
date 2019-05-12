import React from 'react';
import VkSdk from "@happysanta/vk-apps-sdk";
import AppDispatcher, {ERROR_SUBMITTED} from "./Dispatcher";
import AuthStore from "./Stores/AuthStore";
import {IOS, platform} from "@vkontakte/vkui";

export const GOING = 1;
export const SOON  = 0;

export async function sortLots(array) {
    array = await addUsersToLots(array);

    let onGoing = [];
    let soonGoing = [];

    for (let lot of array) {
        switch (lot.status) {
            case GOING:
                onGoing.push(lot);
                break;
            case SOON:
                soonGoing.push(lot);
                break;
            default:
                break;
        }
    }

    return {
        onGoing: onGoing,
        soonGoing: soonGoing
    };
}

export function accurateTime(minutes, seconds) {
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;
    return minutes + ":" + seconds;
}

export const countdownRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return <span>00:00</span>;
    } else {
        return <span>{accurateTime(minutes, seconds)}</span>;
    }
};

export function formatCoinNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ').replace(".", ",")
}

export function isJSError(e) {
    return e && e.stack && e.message && typeof e.stack === 'string' && typeof e.message === 'string';
}

export async function addUsersToLots(lotsObject) {
    let buildString = '';

    lotsObject.forEach((el, index)=>{
        el.last_bets.forEach((el2)=>{
            if(el.VKProfile === undefined) {
                buildString += `${el2.user.vk_user_id},`
            }
        })
    });

    try {
        let result = await VkSdk.callAPIMethod("users.get", {
            user_ids: buildString,
            fields: 'photo_200',
            access_token: AuthStore.VKToken,
            v: '5.92'
        });

        for (let el of result.response) {
            if (el.photo_200 === "" || el.photo_200 === undefined) {
                if (el.first_name === "DELETED") {
                    el.photo_200 = "https://vk.com/images/deactivated_200.png?ava=1"
                } else {
                    el.photo_200 = "https://vk.com/images/camera_200.png?ava=1"
                }
            }
            for ( let item of lotsObject ) {
                for (let bet of item.last_bets) {
                    if(bet.user.vk_user_id === el.id) bet.VKProfile = el;
                }
            }
        }
    } catch(e) {
        AppDispatcher.dispatch({
            type: ERROR_SUBMITTED,
            error: e
        });
        console.log(e);
        return;
    }

    return lotsObject;
}

export function openLinkIOS(link) {
    // ЭТО ФИКС БАГА window.open или 3d-touch пошёл нахуй
    const a = document.createElement('a')
    a.setAttribute('href', link);
    a.setAttribute("rel", "noopener noreferrer");
    const os = platform();
    if (os !== IOS) {
        a.setAttribute("target", "_blank");
    }
    a.dispatchEvent(new MouseEvent("click", {'view': window, 'bubbles': true, 'cancelable': true}))
}

/*
make_lot: payload = id
buy_lot: payload = 2e9+id
"vk.com/coin#x".COIN_MERCHANT_ID."_".($sum*1000)."_".$payload."_1";
 */
export function buildBetLink(merchantID, sum, payload, isConst) {
    console.log(`https://vk.com/coin#x${merchantID}_${sum*1000}_${payload}_${(isConst)?0:1}_${Math.floor(Math.random() * 999)+1}`);
    return `https://vk.com/coin#x${merchantID}_${sum*1000}_${payload}_${(isConst)?0:1}_${Math.floor(Math.random() * 999)+1}`
}