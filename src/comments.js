import React from "react";
import CommentSection from "./commentSection";

const Comments = (props) => {
  const { comments, dispatch } = props;
  return (
    <div className="commentsContainer">
      {comments.map((comment, index) => (
        <CommentSection
          comment={comment}
          index={[index]}
          dispatch={dispatch}
          key={"commentSection-" + index}
        />
      ))}
    </div>
  );
};

export default Comments;
