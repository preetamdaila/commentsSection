import getCurrentDateTime from "./getCurrentDateTime";

const createComment = (user, text) => {
    return {
        user: user,
        text: text,
        time: getCurrentDateTime(),
        reply: [],
        lastEdit: "",
    };
};

const deleteComment = (comments, index) => {
    if (index.length === 1) return comments.filter((c, i) => i !== index[0]);
    else
        return comments.map((c, i) => {
            if (i === index[0])
                return { ...c, reply: deleteComment(c.reply, index.slice(1)) };
            else return c;
        });
};

const edit = (comments, text, index) => {
    return comments.map((c, i) => {
        if (i === index[0])
            if (index.length === 1)
                return { ...c, text: text, lastEdit: getCurrentDateTime() };
            else return { ...c, reply: edit(c.reply, text, index.slice(1)) };
        else return c;
    });
};

const createReply = (c, text, user) => {
    return {
        ...c,
        reply: [...c.reply, createComment(user, text)],
    };
};

const reply = (comments, text, index, user) => {
    return comments.map((c, i) => {
        if (i === index[0])
            if (index.length === 1) return createReply(c, text, user);
            else
                return {
                    ...c,
                    reply: reply(c.reply, text, index.slice(1), user),
                };
        else return c;
    });
};

const reducer = (comments, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...comments,
                createComment(action.payload.user, action.payload.text),
            ];
        case "DELETE":
            return deleteComment(comments, action.payload);
        case "EDIT":
            return edit(comments, action.payload.text, action.payload.index);
        case "REPLY":
            return reply(
                comments,
                action.payload.text,
                action.payload.index,
                action.payload.user
            );
        default:
            return comments;
    }
};

export default reducer;
