import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, changeUser } from "./reduxActions";
import "./userSelector.css";

const UserSelector = () => {
    const [inputText, setInputText] = useState("");
    const users = useSelector((state) => state.users);
    const currentUser = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();

    const changeInput = (e) => {
        setInputText(e.target.value);
    };

    return (
        <div className="userSection">
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(addUser(inputText.trim()));
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
                    <div className="usersList">
                        {users.map((user, i) => (
                            <div
                                className={`user ${
                                    currentUser?.userid === user.userid
                                        ? "selectedUser"
                                        : ""
                                }`}
                                onClick={() => {
                                    if (
                                        !currentUser?.userid ||
                                        currentUser?.userid !== user.userid
                                    )
                                        dispatch(changeUser(user.userid));
                                }}
                                key={user.userid}
                            >
                                <div
                                    className="userColor"
                                    style={{ backgroundColor: user.bgColor }}
                                ></div>
                                <div className="username" key={user.userid}>
                                    {user.username}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default UserSelector;
