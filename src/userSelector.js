import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeUser } from "./reduxActions";
import "./userSelector.css";
import CreateNewUser from "./createNewUser";

const UserSelector = () => {
    const users = useSelector((state) => state.users);
    const currentUser = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();

    return (
        <div className="userSection">
            <CreateNewUser />
            <div className="availableUsers">
                {users?.length ? (
                    <React.Fragment>
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
                                        style={{
                                            backgroundColor: user.bgColor,
                                        }}
                                    ></div>
                                    <div className="username" key={user.userid}>
                                        {user.username}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {currentUser?.userid ? null : (
                            <div className="noUserSelected">
                                No user selected
                            </div>
                        )}
                    </React.Fragment>
                ) : (
                    <div className="noUserAvailable">No user available.</div>
                )}
            </div>
        </div>
    );
};

export default UserSelector;
