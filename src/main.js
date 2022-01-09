import React, { useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import "./main.css";
import Comments from "./comments";
import CommentBox from "./commentBox";
import useLocalStorage from "./useLocalStorate";
import reducer from "./reducer";
import UserSelector from "./userSelector";

const Main = () => {
    const [storedComments, setStoredComments] = useLocalStorage(
        "comments",
        [],
        (data) => data.length
    );

    const [comments, dispatch] = useReducer(reducer, storedComments);
    const currentUser = useSelector((state) => state.currentUser);

    useEffect(() => {
        setStoredComments("comments", comments);
    }, [comments, setStoredComments]);

    return (
        <div className="mainContainer">
            <UserSelector />
            <CommentBox
                text={""}
                dispatch={dispatch}
                action={{ type: "ADD" }}
            />
            <Comments comments={comments} dispatch={dispatch} />
        </div>
    );
};

export default Main;
