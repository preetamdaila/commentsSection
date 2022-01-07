const getFromLocalStorage = (key, state) => {
  let data = localStorage.getItem(key);
  if (data && JSON.parse(data).length) {
    return JSON.parse(data);
  }
  localStorage.setItem(key, JSON.stringify(state));
  return state;
};

const setInLocalStorage = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
};

const useLocalStorage = (key, state) => {
  return [getFromLocalStorage(key, state), setInLocalStorage];
};

export default useLocalStorage;
