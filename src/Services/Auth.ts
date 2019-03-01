import { AsyncStorage } from 'react-native';
import { isNil, noop } from 'lodash';

export function isUserLoggedIn(onUserLoggedIn: Function, onUserNotLoggedIn?: Function) {
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

export function logout(onSuccess: Function, onError?: Function) {
  AsyncStorage.removeItem('USER_LOGGED_IN').then(
    () => {
      onSuccess();
    },
    () => {
      !isNil(onError) && onError();
    }
  );
}

export function login(
  email: string | undefined, // TODO: remove undefined
  password: string | undefined, // TODO: remove undefined
  onSuccess: Function,
  onError: Function
) {
  AsyncStorage.setItem('USER_LOGGED_IN', `${email} + ${password}`)
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
}