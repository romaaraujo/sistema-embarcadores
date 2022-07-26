const strToBool = string => {
    regex = /^\s*(true|1|on)\s*$/i
    return regex.test(string);
}

module.exports = {
    strToBool
}