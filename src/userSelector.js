import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const UserSelector = () => {
    const [inputText, setInputText] = useState("");
    const users = useSelector((state) => state.users);
    const currentUser = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();

    const changeInput = (e) => {
        setInputText(e.target.value);
    };

    console.log(currentUser);

    return (
        <div>
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        dispatch({
                            type: "ADD_USER",
                            payload: { username: inputText },
                        });
                        setInputText("");
                    }}
                >
                    <input
                        type="text"
                        onChange={(e) => changeInput(e)}
                        value={inputText}
                    />
                    <div>Current text: {inputText} </div>
                    <div>Current user is : {currentUser?.username}</div>
                </form>
                {users?.length ? (
                    <select
                        defaultValue={currentUser?.userid || 0}
                        onChange={(e) => {
                            if (e !== currentUser?.userid) {
                                dispatch({
                                    type: "CHANGE_USER",
                                    payload: { userid: e.target.value },
                                });
                            }
                        }}
                    >
                        {currentUser?.userid ? (
                            <option value="0" key={"0"}>
                                Select
                            </option>
                        ) : null}
                        {users.map((user, i) => (
                            <option value={user.userid} key={user.userid}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                ) : null}
            </div>
        </div>
    );
};

export default UserSelector;
