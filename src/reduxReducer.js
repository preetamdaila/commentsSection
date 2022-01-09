import createUser from "./createUser";
import { getFromLocal, setInLocal } from "./localStorageHelper";

const getCurrentUser = ({ users = {} }, userid = "") => {
    if (users.length > 0) {
        let current = users.filter((user) => userid == user.userid);
        return current.length ? current[0] : {};
    } else return {};
};

const initialState = () => {
    return {
        createUser: getFromLocal("currentUser", {}, (data) => !!data?.userid),
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
            let currentUser = getCurrentUser(state, payload.userid);
            setInLocal("currentUser", currentUser);
            return { users: state.users, currentUser: currentUser };
        default:
            return state;
    }
};
export default reduxReducer;
