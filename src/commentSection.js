import React, { useRef, useState } from "react";
import CommentBox from "./commentBox";
import { useSelector } from "react-redux";

const CommentSection = (props) => {
    const {
        comment: { user, time, text, reply, lastEdit },
        index,
        dispatch,
    } = props;
    const [edit, setEdit] = useState(false);
    const [replying, setReplying] = useState(false);
    const inputRef = useRef();
    const currentUser = useSelector((state) => state.currentUser);

    return (
        <div className="comments" key={"comment-" + index}>
            <div className="userImage"></div>
            <div className="commentsSection">
                <div className="commentHeading">
                    <div className="userName">{user}</div>
                    <div className="commentTime">{time}</div>
                    {lastEdit.length ? (
                        <div className="lastEdit" title={lastEdit}>
                            Edited
                            <div className="lastEditTime">
                                last on {lastEdit}
                            </div>
                        </div>
                    ) : null}
                </div>
                {!edit ? (
                    <div className="commentText">{text}</div>
                ) : (
                    <CommentBox
                        ref={inputRef}
                        text={text}
                        dispatch={dispatch}
                        action={{ type: "EDIT", payload: index }}
                        callback={() => setEdit(false)}
                    />
                )}
                <div className="commentFooter">
                    <div
                        className="footerActions replay"
                        style={{ border: replying ? "1px solid red" : "" }}
                        onClick={() =>
                            setReplying((preReplying) => !preReplying)
                        }
                    >
                        <div className="footerIcon replayIcon">-</div>
                        <div className="replayText">
                            {replying ? "Cancel" : "Reply"}
                        </div>
                    </div>
                    <div
                        className="footerActions delete"
                        onClick={() => {
                            dispatch({ type: "DELETE", payload: index });
                        }}
                    >
                        <div className="footerIcon deleteIcon">-</div>
                        <div className="deleteText">Delete</div>
                    </div>
                    <div
                        className="footerActions edit"
                        style={{ border: edit ? "1px solid red" : "" }}
                        onClick={() => setEdit((prevEdit) => !prevEdit)}
                    >
                        <div className="footerIcon editIcon">-</div>
                        <div className="editText">
                            {edit ? "Cancel" : "Edit"}
                        </div>
                    </div>
                </div>
                {reply.map((sub, idx) => (
                    <CommentSection
                        comment={sub}
                        index={[...index, idx]}
                        dispatch={dispatch}
                        key={"commentSection-" + idx}
                    />
                ))}
                {replying && (
                    <CommentBox
                        ref={inputRef}
                        text={""}
                        dispatch={dispatch}
                        action={{ type: "REPLY", payload: [...index] }}
                        callback={() => setReplying(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default CommentSection;
