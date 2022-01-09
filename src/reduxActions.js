export const addUser = (username) => {
    return {
        type: "ADD_USER",
        payload: username,
    };
};

export const currentUser = (username) => {
    return {
        type: "CURRENT_USER",
        payload: username,
    };
};
