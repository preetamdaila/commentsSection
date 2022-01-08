const generateFixLengthHex = (size = 1) => {
  let i = 0;
  let str = "";
  while (i < size) {
    str += parseInt(Math.floor(Math.random() * 16)).toString(16);
    i++;
  }
  return str;
};

const generateHexColor = () => {
  return (
    "#" +
    generateFixLengthHex(2) +
    generateFixLengthHex(2) +
    generateFixLengthHex(2)
  );
};

const createUser = (username) => {
  return {
    username: username,
    bgColor: generateHexColor(),
    userid: generateFixLengthHex(16),
  };
};

export default createUser;
