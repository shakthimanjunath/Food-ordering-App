import React, { PureComponent } from 'react';
import { Avatar, Button, Header } from 'react-native-elements';
import { View, Alert } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { styles, guide } from '../../Styles/CommonStyles';
import { emailValidator, passwordValidator } from '../../Util/Validator';
import { isNil } from 'lodash';
import InputBox from '../../Components/InputBox';
import { login } from '../../Services/Auth';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface LoginState {
  formSubmitted: boolean;
  emailIdError: string | undefined;
  passwordError: string | undefined;
  email: string | undefined;
  password: string | undefined;
  loading: boolean;
}
export default class Login extends PureComponent<Props, LoginState> {
  inputRefs: any = [];
  constructor(props: Props) {
    super(props);
    this.state = {
      formSubmitted: false,
      emailIdError: undefined,
      passwordError: undefined,
      email: undefined,
      password: undefined,
      loading: false
    };
  }

  validateForm(callBack: Function) {
    emailValidator(
      this.state.email,
      () => {
        this.setState({ emailIdError: undefined });
      },
      (error: string) => {
        this.setState({ emailIdError: error });
      }
    );
    passwordValidator(
      this.state.password,
      () => {
        this.setState({ passwordError: undefined, loading: false }, () => callBack());
      },
      (error: string) => {
        this.setState({ passwordError: error, loading: false });
      }
    );
  }

  focusNextField(nextField: string) {
    this.inputRefs[nextField].input.focus();
  }

  render() {
    const showEmailErrorMessage = this.state.formSubmitted && !isNil(this.state.emailIdError);
    const showPasswordErrorMessage = this.state.formSubmitted && !isNil(this.state.passwordError);
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{
            icon: 'arrow-back',
            color: '#fff',
            onPress: () => this.props.navigation.goBack(null)
          }}
          centerComponent={{ text: 'Login', style: { color: '#fff' } }}
          containerStyle={{ backgroundColor: guide.buttonColor }}
          barStyle="light-content"
        />
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <Avatar source={require("../../../Images/logo.png")} size="xlarge" />
        </View>
        <View style={{ flex: 6 }}>
          <InputBox
            showErrorMessage={showEmailErrorMessage}
            errorMessage={this.state.emailIdError}
            placeHolder="Email Address"
            saveRef={(ref: any) => (this.inputRefs['Email'] = ref)}
            onSubmit={() => this.focusNextField('Password')}
            onBlur={() => {
              emailValidator(
                this.state.email,
                () => {
                  this.setState({ emailIdError: undefined });
                },
                (error: string) => {
                  this.setState({ emailIdError: error });
                }
              );
            }}
            onChangeText={text => {
              this.setState({ email: text }, () => {
                emailValidator(
                  text,
                  () => {
                    this.setState({ emailIdError: undefined });
                  },
                  (error: string) => {
                    this.setState({ emailIdError: error });
                  }
                );
              });
            }}
          />
          <InputBox
            showErrorMessage={showPasswordErrorMessage}
            errorMessage={this.state.passwordError}
            secureTextEntry={true}
            placeHolder="Password"
            saveRef={(ref: any) => (this.inputRefs['Password'] = ref)}
            onBlur={() => {
              passwordValidator(
                this.state.password,
                () => {
                  this.setState({ passwordError: undefined });
                },
                (error: string) => {
                  this.setState({ passwordError: error });
                }
              );
            }}
            onChangeText={text => {
              this.setState({ password: text }, () => {
                passwordValidator(
                  text,
                  () => {
                    this.setState({ passwordError: undefined });
                  },
                  (error: string) => {
                    this.setState({ passwordError: error });
                  }
                );
              });
            }}
          />
          <Button
            loadingProps={{ color: 'black', animating: true }}
            title="Log In"
            loading={this.state.loading}
            disabled={this.state.loading}
            buttonStyle={styles.buttonStyle}
            containerStyle={{ paddingHorizontal: 10, borderRadius: 20 }}
            onPress={() => {
              this.setState({ formSubmitted: true, loading: true }, () =>
                this.validateForm(() =>
                  login(
                    this.state.email,
                    this.state.password,
                    () => {
                      this.setState({ loading: false });
                      this.props.navigation.navigate('Home');
                    },
                    () => {
                      Alert.alert('Could not Login');
                    }
                  )
                )
              );
            }}
          />
        </View>
      </View>
    );
  }
}
