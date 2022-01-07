import React, { useReducer, useEffect } from "react";
import "./main.css";
import Comments from "./comments";
import CommentBox from "./commentBox";
import useLocalStorage from "./useLocalStorate";
import reducer from "./reducer";

const Main = () => {
  const [storedComments, setStoredComments] = useLocalStorage(
    "comments",
    [],
    (data) => data.length
  );
  const [comments, dispatch] = useReducer(reducer, storedComments);

  useEffect(() => {
    setStoredComments("comments", comments);
  }, [comments]);

  return (
    <div className="mainContainer">
      <CommentBox text={""} dispatch={dispatch} action={{ type: "ADD" }} />
      <Comments comments={comments} dispatch={dispatch} />
    </div>
  );
};

export default Main;
