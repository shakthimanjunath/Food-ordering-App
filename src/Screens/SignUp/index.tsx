import React from 'react';
import { View, Alert, Text } from 'react-native';
import InputBox from '../../Components/InputBox';
import { Avatar, Button } from 'react-native-elements';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import {isNil} from 'lodash';
import { emailValidator, passwordValidator, confirmPasswordValidator } from '../../Util/Validator';
import { styles } from '../../Styles/CommonStyles';
import { login, isUserLoggedIn } from '../../Services/Auth';

interface SignUpProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface SignupState {
  formSubmitted: boolean;
  emailIdError: string | undefined;
  passwordError: string | undefined;
  confirmPasswordError: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  loading: boolean;
}

export default class SignUp extends React.Component<SignUpProps, SignupState>{
  inputRefs: any = [];
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      formSubmitted: false,
      emailIdError: undefined,
      passwordError: undefined,
      confirmPasswordError: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      loading: true
    };
  }

  componentWillMount() {
    isUserLoggedIn(
      () => {
        this.props.navigation.navigate('Home', {
          hideSplashscreen: () => {
            this.setState({ loading: false });
          }
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }

  focusNextField(nextField: string) {
    this.inputRefs[nextField].input.focus();
  }

  validateForm(onFormValid: Function) {
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
        this.setState({ passwordError: undefined });
      },
      (error: string) => {
        this.setState({ passwordError: error });
      }
    );
    confirmPasswordValidator(
      this.state.password,
      this.state.confirmPassword,
      () => {
        this.setState({ confirmPasswordError: undefined, loading: false }, () => {
          onFormValid();
        });
      },
      (error: string) => {
        this.setState({ confirmPasswordError: error, loading: false });
      }
    );
  }

  render(){
    let showEmailErrorMessage = this.state.formSubmitted && !isNil(this.state.emailIdError);
    let showPasswordErrorMessage = this.state.formSubmitted && !isNil(this.state.passwordError);
    let showConfirmPasswordErrorMessage =
      this.state.formSubmitted && !isNil(this.state.confirmPasswordError);
    if (this.state.loading) return <View />;
    return(
      <View style={{ flex: 1 }}>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
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
            onSubmit={() => this.focusNextField('ConfirmPassword')}
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
          <InputBox
            showErrorMessage={showConfirmPasswordErrorMessage}
            errorMessage={this.state.confirmPasswordError}
            secureTextEntry={true}
            placeHolder="Confirm password"
            saveRef={(ref: any) => (this.inputRefs['ConfirmPassword'] = ref)}
            onBlur={() => {
              confirmPasswordValidator(
                this.state.password,
                this.state.confirmPassword,
                () => {
                  this.setState({ confirmPasswordError: undefined });
                },
                (error: string) => {
                  this.setState({ confirmPasswordError: error });
                }
              );
            }}
            onChangeText={text => {
              this.setState({ confirmPassword: text }, () => {
                confirmPasswordValidator(
                  this.state.password,
                  text,
                  () => {
                    this.setState({ confirmPasswordError: undefined });
                  },
                  (error: string) => {
                    this.setState({ confirmPasswordError: error });
                  }
                );
              });
            }}
          />
          <Button
            loadingProps={{ color: 'black', animating: true }}
            title={'Sign Up'}
            loading={this.state.loading}
            disabled={this.state.loading}
            buttonStyle={styles.buttonStyle}
            containerStyle={{ paddingHorizontal: 10, borderRadius: 20 }}
            onPress={() => {
              this.setState({ formSubmitted: true, loading: true }, () =>
                this.validateForm(() =>
                  login(
                    // TODO: Replace this with sign up method after integrating google auth
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
          <View style={{ flex: 0.1 }} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Text>Already a User? </Text>
            <Button
              title="Login now"
              type="clear"
              titleStyle={styles.TransparentButtonText}
              onPress={() => {
                this.setState({ loading: false }, () => {
                  this.props.navigation.navigate('Login');
                });
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}