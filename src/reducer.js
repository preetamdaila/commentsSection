import getCurrentDateTime from "./getCurrentDateTime";

const createComment = (name, text) => {
  return {
    user: name,
    text: text,
    time: getCurrentDateTime(),
    reply: [],
    lastEdit: "",
  };
};

const deleteComment = (comments, index) => {
  console.log(comments, index);
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

const createReply = (c, text) => {
  return {
    ...c,
    reply: [...c.reply, createComment("Name", text)],
  };
};

const reply = (comments, text, index) => {
  return comments.map((c, i) => {
    if (i === index[0])
      if (index.length === 1) return createReply(c, text);
      else return { ...c, reply: reply(c.reply, text, index.slice(1)) };
    else return c;
  });
};

const reducer = (comments, action) => {
  switch (action.type) {
    case "ADD":
      return [...comments, createComment("Name", action.payload.text)];
    case "DELETE":
      return deleteComment(comments, action.payload);
    case "EDIT":
      return edit(comments, action.payload.text, action.payload.index);
    case "REPLY":
      return reply(comments, action.payload.text, action.payload.index);
    default:
      return comments;
  }
};

export default reducer;
