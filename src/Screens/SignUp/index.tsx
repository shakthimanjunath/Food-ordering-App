import React from 'react';
import { View, Text, Alert } from 'react-native';
import InputBox from '../../Components/InputBox';
import { Avatar, Button } from 'react-native-elements';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { isNil, get } from 'lodash';
import {
  emailValidator,
  passwordValidator,
  confirmPasswordValidator
} from '../../Util/Validator';
import { styles } from '../../Styles/CommonStyles';
import { isUserLoggedIn, loginSuccessfull } from '../../Services/Auth';
import { Mutation, compose, withApollo } from 'react-apollo';
import { RequiredValidator } from '../../Util/Validator';
import { CREATE_USER } from '../../Services/Mutations';
import { checkIfUserHasAlreadyRegistered } from '../../Services/queries';

interface SignUpProps {
  navigation: NavigationScreenProp<NavigationState>;
  client: any;
}

interface SignupState {
  formSubmitted: boolean;
  emailIdError: string | undefined;
  name: string | undefined;
  seatNumber: string | undefined;
  passwordError: string | undefined;
  confirmPasswordError: string | undefined;
  seatNumberError: string | undefined;
  nameError: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  loading: boolean;
  userAlreadyLoggedIn: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

class SignUp extends React.Component<SignUpProps, SignupState> {
  inputRefs: any = [];
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      formSubmitted: false,
      emailIdError: undefined,
      name: undefined,
      seatNumber: undefined,
      passwordError: undefined,
      confirmPasswordError: undefined,
      seatNumberError: undefined,
      nameError: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      loading: true,
      userAlreadyLoggedIn: false,
      showPassword: false,
      showConfirmPassword: false
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
    RequiredValidator(
      this.state.name,
      () => {
        this.setState({ nameError: undefined });
      },
      (error: string) => {
        this.setState({ nameError: error });
      }
    );
    RequiredValidator(
      this.state.seatNumber,
      () => {
        this.setState({ seatNumberError: undefined });
      },
      (error: string) => {
        this.setState({ seatNumberError: error });
      }
    );
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
        this.setState(
          { confirmPasswordError: undefined, loading: false },
          () => {
            onFormValid();
          }
        );
      },
      (error: string) => {
        this.setState({ confirmPasswordError: error, loading: false });
      }
    );
  }

  showErrorMessage(value) {
    return this.state.formSubmitted && !isNil(value);
  }

  _renderErrorPage() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Sorry, Some error</Text>
      </View>
    );
  }

  _renderLoaderPage() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading</Text>
      </View>
    );
  }

  _renderUserAlreadyLoggedIn() {
    return (
      <Text
        style={{
          color: 'red',
          fontSize: 12,
          paddingHorizontal: 30,
          textAlign: 'center',
          marginTop: 10
        }}
      >
        Looks like your account is already registered. Please try to Login.
      </Text>
    );
  }

  SignUp(createUser) {
    this.props.client
      .query({
        query: checkIfUserHasAlreadyRegistered,
        variables: {
          mailId: get(this.state, 'email', '')
        }
      })
      .then(data => {
        if (get(data, 'data.allUsers', []).length > 0) {
          this.setState({ userAlreadyLoggedIn: true, loading: false });
        } else {
          this.validateForm(() => {
            createUser({
              variables: {
                name: this.state.name,
                mailId: this.state.email,
                seatNumber: this.state.seatNumber,
                password: this.state.password
              }
            })
              .then((data: any) => {
                // TODO: replace any
                this.setState({ loading: false, userAlreadyLoggedIn: false });
                loginSuccessfull(
                  data.data.createUser.id,
                  () => this.props.navigation.navigate('Home'),
                  () => {
                    Alert.alert(
                      'Could not complete Signup process. Please login again for login persistance'
                    );
                  }
                );
              })
              .catch(() => {
                Alert.alert(
                  'Could not complete Signup process. Please login again for login persistance'
                );
              });
          });
        }
      })
      .catch(() => {
        console.log('Error: Could not check if user has already registered');
        Alert.alert('Something went wrong. Please try again');
      });
  }

  render() {
    return (
      <Mutation mutation={CREATE_USER}>
        {(createUser, { loading, error }) => {
          loading && this._renderLoaderPage();
          error && this._renderErrorPage();
          return (
            <View style={{ flex: 1 }}>
              <View
                style={{
                  marginTop: 60,
                  marginBottom: 20,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Avatar
                  source={require('../../../Images/logo.png')}
                  size="large"
                />
              </View>
              <View>
                <InputBox
                  showErrorMessage={this.showErrorMessage(this.state.nameError)}
                  errorMessage={this.state.nameError}
                  placeHolder="Name"
                  saveRef={(ref: any) => (this.inputRefs['Name'] = ref)}
                  onSubmit={() => this.focusNextField('Email')}
                  onBlur={() => {
                    RequiredValidator(
                      this.state.name,
                      () => {
                        this.setState({ nameError: undefined });
                      },
                      (error: string) => {
                        this.setState({ nameError: error });
                      }
                    );
                  }}
                  onChangeText={text => {
                    this.setState({ name: text }, () => {
                      RequiredValidator(
                        text,
                        () => {
                          this.setState({ nameError: undefined });
                        },
                        (error: string) => {
                          this.setState({ nameError: error });
                        }
                      );
                    });
                  }}
                />
                <InputBox
                  showErrorMessage={this.showErrorMessage(
                    this.state.emailIdError
                  )}
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
                  showErrorMessage={this.showErrorMessage(
                    this.state.passwordError
                  )}
                  errorMessage={this.state.passwordError}
                  secureTextEntry={!this.state.showPassword}
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
                  extras={{
                    rightIcon: {
                      name: !this.state.showPassword ? 'lock' : 'lock-open',
                      color: 'black',
                      onPress: () =>
                        this.setState({
                          showPassword: !this.state.showPassword
                        })
                    },
                    rightIconContainerStyle: {
                      width: 50,
                      height: 50
                    }
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
                  showErrorMessage={this.showErrorMessage(
                    this.state.confirmPasswordError
                  )}
                  errorMessage={this.state.confirmPasswordError}
                  secureTextEntry={!this.state.showConfirmPassword}
                  placeHolder="Confirm password"
                  onSubmit={() => this.focusNextField('SeatNumber')}
                  saveRef={(ref: any) =>
                    (this.inputRefs['ConfirmPassword'] = ref)
                  }
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
                  extras={{
                    rightIcon: {
                      name: !this.state.showConfirmPassword
                        ? 'lock'
                        : 'lock-open',
                      color: 'black',
                      onPress: () =>
                        this.setState({
                          showConfirmPassword: !this.state.showConfirmPassword
                        })
                    },
                    rightIconContainerStyle: {
                      width: 50,
                      height: 50
                    }
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
                <InputBox
                  showErrorMessage={this.showErrorMessage(
                    this.state.seatNumberError
                  )}
                  errorMessage={this.state.seatNumberError}
                  placeHolder="Seat Number"
                  saveRef={(ref: any) => (this.inputRefs['SeatNumber'] = ref)}
                  onBlur={() => {
                    RequiredValidator(
                      this.state.seatNumber,
                      () => {
                        this.setState({ seatNumberError: undefined });
                      },
                      (error: string) => {
                        this.setState({ seatNumberError: error });
                      }
                    );
                  }}
                  onChangeText={text => {
                    this.setState({ seatNumber: text }, () => {
                      RequiredValidator(
                        text,
                        () => {
                          this.setState({ seatNumberError: undefined });
                        },
                        (error: string) => {
                          this.setState({ seatNumberError: error });
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
                    this.setState(
                      { formSubmitted: true, loading: true },
                      () => {
                        this.SignUp(createUser);
                      }
                    );
                  }}
                />
                <View style={{ flex: 0.1 }} />
                {this.state.userAlreadyLoggedIn &&
                  this._renderUserAlreadyLoggedIn()}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: 20
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
          );
        }}
      </Mutation>
    );
  }
}

export default compose(withApollo)(SignUp);
