const doubleDigitNumber = (number) => {
    return Math.floor(number / 10) === 0 ? "0" + number : number;
};

const getCurrentDate = () => {
    let current = new Date();
    return (
        doubleDigitNumber(current.getDate()) +
        "/" +
        doubleDigitNumber(current.getMonth() + 1) +
        "/" +
        current.getFullYear()
    );
};

const getCurrentTime = () => {
    let current = new Date();
    return (
        doubleDigitNumber(current.getHours()) +
        ":" +
        doubleDigitNumber(current.getMinutes()) +
        ":" +
        doubleDigitNumber(current.getSeconds())
    );
};

const getCurrentDateTime = () => {
    return getCurrentDate() + " " + getCurrentTime();
};

export default getCurrentDateTime;
