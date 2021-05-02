export const debounce = (callback, time) => {
    let interval
    return (...args) => {
        clearTimeout(interval);
        interval = setTimeout(() => {
            interval = null;
            callback(...args);
        }, time)
    }
}

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

