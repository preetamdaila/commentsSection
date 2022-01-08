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

  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: "ADD_USER", payload: { username: inputText } });
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
            onChange={(e) => {
              if (e !== currentUser.userid) {
                dispatch({
                  type: "CHANGE_USER",
                  payload: { userid: e.target.value },
                });
              }
            }}
          >
            {users.map((user, i) => (
              <option value={user.id} key={user.id}>
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
