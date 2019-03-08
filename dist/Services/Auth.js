import { AsyncStorage } from 'react-native';
import { isNil, noop } from 'lodash';
export function isUserLoggedIn(onUserLoggedIn, onUserNotLoggedIn) {
    AsyncStorage.getItem('FOOD_ORDERING_APP_USER_TOKEN')
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
    AsyncStorage.removeItem('FOOD_ORDERING_APP_USER_TOKEN').then(() => {
        onSuccess();
    }, () => {
        !isNil(onError) && onError();
    });
}
export function getUserToken(onFetchSuccess, onFetchError) {
    AsyncStorage.getItem('FOOD_ORDERING_APP_USER_TOKEN')
        .then(userToken => {
        !isNil(userToken)
            ? !isNil(onFetchSuccess)
                ? onFetchSuccess(userToken)
                : noop()
            : !isNil(onFetchError)
                ? onFetchError('token empty')
                : noop();
    })
        .catch(() => {
        !isNil(onFetchError) ? onFetchError('Could not fetch token') : noop();
    });
}
// Stores token in async storage for login persistance.
export function loginSuccessfull(token, onSuccess, onError) {
    AsyncStorage.setItem('FOOD_ORDERING_APP_USER_TOKEN', token.toString())
        .then(() => onSuccess())
        .catch(() => {
        onError();
    });
}
//# sourceMappingURL=Auth.js.map