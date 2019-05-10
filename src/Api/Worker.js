
export default async function lpCallback(data) {
    if (!data.response.events || data.response.events === undefined) return;
    if(document.hidden) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return false;
    }

}