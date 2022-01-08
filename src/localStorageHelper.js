export const getFromLocal = (key, state, callback) => {
    let data = localStorage.getItem(key);
    try {
        if (data && callback(JSON.parse(data))) {
            return JSON.parse(data);
        }
    } catch {
        console.log(`Error in reading ${key} in Local Storage`);
    }
    localStorage.setItem(key, JSON.stringify(state));
    return state;
};

export const setInLocal = (key, state) => {
    localStorage.setItem(key, JSON.stringify(state));
};
