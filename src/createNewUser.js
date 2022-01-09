import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./reduxActions";

const CreateNewUser = () => {
    const [inputText, setInputText] = useState("");
    const dispatch = useDispatch();

    const changeInput = (e) => {
        setInputText(e.target.value);
    };

    return (
        <div className="createNewUser">
            <form
                className="newUserForm"
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
                    placeholder="Create new user here"
                />
            </form>
        </div>
    );
};

export default CreateNewUser;
