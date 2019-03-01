import { isNil } from 'lodash';
export function emailValidator(text, onValid, onInvalid) {
    if (!isNil(text) && text.length > 0) {
        const emailRegExp = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
        text.match(emailRegExp) ? onValid() : onInvalid('Invalid email');
    }
    else {
        onInvalid('Required');
    }
}
// Accepts password with minLength = 8 and maxLength = 12
export function passwordValidator(text, onValid, onInvalid) {
    if (!isNil(text) && text.length > 0) {
        const emailRegExp = /^.{8,12}$/;
        text.match(emailRegExp)
            ? onValid()
            : onInvalid('Invalid password. Password should have atleast 8 character');
    }
    else {
        onInvalid('Required');
    }
}
export function confirmPasswordValidator(passwordText, confirmPasswordText, onValid, onInvalid) {
    if (isNil(confirmPasswordText) ||
        (!isNil(confirmPasswordText) && confirmPasswordText.length === 0)) {
        onInvalid('Required');
    }
    else if (isNil(passwordText) ||
        (!isNil(passwordText) && passwordText !== confirmPasswordText)) {
        onInvalid('Password do not match');
    }
    else {
        onValid();
    }
}
//# sourceMappingURL=Validator.js.map