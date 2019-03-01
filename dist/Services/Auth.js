import { AsyncStorage } from 'react-native';
import { isNil, noop } from 'lodash';
export function isUserLoggedIn(onUserLoggedIn, onUserNotLoggedIn) {
    console.log('isUserLoggedIn');
    AsyncStorage.getItem('USER_LOGGED_IN')
        .then(userToken => {
        !isNil(userToken) && userToken
            ? !isNil(onUserLoggedIn)
                ? onUserLoggedIn()
                : noop()
            : !isNil(onUserNotLoggedIn)
                ? onUserNotLoggedIn()
                : noop();
    })
        .catch(() => {
        !isNil(onUserNotLoggedIn) ? onUserNotLoggedIn() : noop();
    });
}
export function logout(onSuccess, onError) {
    AsyncStorage.removeItem('USER_LOGGED_IN').then(() => {
        onSuccess();
    }, () => {
        !isNil(onError) && onError();
    });
}
export function login(email, // TODO: remove undefined
password, // TODO: remove undefined
onSuccess, onError) {
    AsyncStorage.setItem('USER_LOGGED_IN', `${email} + ${password}`)
        .then(() => {
        onSuccess();
    })
        .catch(() => {
        onError();
    });
}
//# sourceMappingURL=Auth.js.map