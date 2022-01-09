import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CommentBox = React.forwardRef((props, ref) => {
    const { text, dispatch, action, callback } = props;
    const [inputText, setInputText] = useState(text);
    const currentUser = useSelector((state) => state.currentUser);

    const changeInput = (e) => {
        if (e.target.value.length < 200) setInputText(e.target.value);
    };

    useEffect(() => {
        if (ref) ref.current.focus();
    }, [props, ref]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (text.trim() !== inputText.trim())
                    dispatch({
                        type: action.type,
                        payload: {
                            text: inputText,
                            index: action.payload,
                            user: currentUser,
                        },
                    });
                setInputText("");
                if (callback) callback();
            }}
        >
            <input
                ref={ref}
                className="commentBox"
                type="text"
                value={inputText}
                onChange={(e) => changeInput(e)}
                placeholder={`${
                    action.type === "REPLY"
                        ? "Reply here"
                        : action.type === "EDIT"
                        ? "Edit your comment"
                        : "Comment here"
                }`}
                disabled={currentUser?.userid ? false : "disabled"}
            />
        </form>
    );
});

export default CommentBox;
