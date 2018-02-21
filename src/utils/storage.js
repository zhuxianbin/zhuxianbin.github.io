export default {
    get(key) {
        return JSON.parse(window.localStorage[key]||"{}");
    },
    set(key, value) {
        return window.localStorage[key] = JSON.stringify(value);
    },
    remove(key) {
        return window.localStorage.removeItem(key);
    }
}
