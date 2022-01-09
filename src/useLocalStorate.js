const getFromLocalStorage = (key, state, callback) => {
    let data = localStorage.getItem(key);
    if (data && callback(JSON.parse(data))) {
        return JSON.parse(data);
    }
    localStorage.setItem(key, JSON.stringify(state));
    return state;
};

const setInLocalStorage = (key, state) => {
    localStorage.setItem(key, JSON.stringify(state));
};

const useLocalStorage = (key, state, callback = () => true) => {
    return [getFromLocalStorage(key, state, callback), setInLocalStorage];
};

export default useLocalStorage;
