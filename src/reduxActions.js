export const addUser = (username) => {
    return {
        type: "ADD_USER",
        payload: { username: username },
    };
};

export const changeUser = (userid) => {
    return {
        type: "CHANGE_USER",
        payload: {
            userid: userid,
        },
    };
};
