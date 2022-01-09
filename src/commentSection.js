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
        <div className="commentContainer" key={"comment-" + index}>
            <div
                className="userImage"
                style={{ backgroundColor: user.bgColor }}
            ></div>
            <div className="commentsSection">
                <div className="comment">
                    <div className="commentHeading">
                        <div
                            className={`userName ${
                                user.userid === currentUser?.userid
                                    ? "current"
                                    : ""
                            }`}
                        >
                            {user.username}
                        </div>
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

                    <div className="commentText">
                        {!edit ? (
                            text
                        ) : (
                            <CommentBox
                                ref={inputRef}
                                text={text}
                                dispatch={dispatch}
                                action={{ type: "EDIT", payload: index }}
                                callback={() => setEdit(false)}
                            />
                        )}
                    </div>
                    {currentUser?.userid ? (
                        <div className="commentFooter">
                            <div
                                className={`footerActions ${
                                    replying ? "cancel" : "replay"
                                }`}
                                onClick={() =>
                                    setReplying((preReplying) => !preReplying)
                                }
                            >
                                <div className="footerIcon replayIcon"></div>
                                <div className="replayText">
                                    {replying ? "Cancel" : "Reply"}
                                </div>
                            </div>
                            {user.userid === currentUser?.userid ? (
                                <React.Fragment>
                                    <div
                                        className="footerActions delete"
                                        onClick={() => {
                                            dispatch({
                                                type: "DELETE",
                                                payload: index,
                                            });
                                        }}
                                    >
                                        <div className="footerIcon deleteIcon"></div>
                                        <div className="deleteText">Delete</div>
                                    </div>
                                    <div
                                        className={`footerActions ${
                                            edit ? "cancel" : "edit"
                                        }`}
                                        onClick={() =>
                                            setEdit((prevEdit) => !prevEdit)
                                        }
                                    >
                                        <div className="footerIcon editIcon"></div>
                                        <div className="editText">
                                            {edit ? "Cancel" : "Edit"}
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : null}
                        </div>
                    ) : null}
                </div>
                {replying && (
                    <div className="newReply">
                        <div
                            className="userImage"
                            style={{ backgroundColor: currentUser.bgColor }}
                        ></div>
                        <CommentBox
                            ref={inputRef}
                            text={""}
                            dispatch={dispatch}
                            action={{ type: "REPLY", payload: [...index] }}
                            callback={() => setReplying(false)}
                        />
                    </div>
                )}
                <div className="replys">
                    {reply.map((sub, idx) => (
                        <CommentSection
                            comment={sub}
                            index={[...index, idx]}
                            dispatch={dispatch}
                            key={"commentSection-" + idx}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
