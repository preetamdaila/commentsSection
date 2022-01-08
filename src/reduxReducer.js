import createUser from "./createUser";

const getFromLocal = (key, state, callback) => {
  let data = localStorage.getItem(key);
  if (data && callback(JSON.parse(data))) {
    return JSON.parse(data);
  }
  localStorage.setItem(key, JSON.stringify(state));
  return state;
};

const setInLocal = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
};

const getCurrentUser = ({ users = [] }, userid = "") => {
  if (users.length > 0) {
    return users.filter((user) => userid == user.userid);
  } else return {};
};

const initialState = () => {
  return {
    createUser: getFromLocal("currentuser", {}, (data) => !!data.userid),
    users: getFromLocal("users", [], (data) => data.length),
  };
};

const reduxReducer = (state = initialState(), { type, payload }) => {
  switch (type) {
    case "ADD_USER":
      let updatedUsers = [...state.users, createUser(payload.username)];
      setInLocal("users", updatedUsers);
      return { currentUser: state.currentUser, users: updatedUsers };
    case "CHANGE_USER":
      let currentUser = getCurrentUser(state, payload.id);
      setInLocal("currentUser", createUser);
      return { users: state.users, currentUser: currentUser };
    default:
      return state;
  }
};
export default reduxReducer;
