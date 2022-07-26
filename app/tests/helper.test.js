const { strToBool } = require("./../src/helpers/convertTypes");

test('input string then output a bool true', () => {
    expect(strToBool('true')).toBe(true);
});

test('input string then output a bool false', () => {
    expect(strToBool('false')).toBe(false);
});