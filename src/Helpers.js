export const GOING = 1;
export const SOON  = 0;

export function sortLots(array) {
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

export function formatCoinNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ').replace(".", ",")
}