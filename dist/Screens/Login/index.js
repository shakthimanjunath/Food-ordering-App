import React, { PureComponent } from 'react';
import { Avatar, Button, Header } from 'react-native-elements';
import { View, Alert } from 'react-native';
import { styles, guide } from '../../Styles/CommonStyles';
import { emailValidator, passwordValidator } from '../../Util/Validator';
import { isNil } from 'lodash';
import InputBox from '../../Components/InputBox';
import { login } from '../../Services/Auth';
export default class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.inputRefs = [];
        this.state = {
            formSubmitted: false,
            emailIdError: undefined,
            passwordError: undefined,
            email: undefined,
            password: undefined,
            loading: false
        };
    }
    validateForm(callBack) {
        emailValidator(this.state.email, () => {
            this.setState({ emailIdError: undefined });
        }, (error) => {
            this.setState({ emailIdError: error });
        });
        passwordValidator(this.state.password, () => {
            this.setState({ passwordError: undefined, loading: false }, () => callBack());
        }, (error) => {
            this.setState({ passwordError: error, loading: false });
        });
    }
    focusNextField(nextField) {
        this.inputRefs[nextField].input.focus();
    }
    render() {
        const showEmailErrorMessage = this.state.formSubmitted && !isNil(this.state.emailIdError);
        const showPasswordErrorMessage = this.state.formSubmitted && !isNil(this.state.passwordError);
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(Header, { leftComponent: {
                    icon: 'arrow-back',
                    color: '#fff',
                    onPress: () => this.props.navigation.goBack(null)
                }, centerComponent: { text: 'Login', style: { color: '#fff' } }, containerStyle: { backgroundColor: guide.buttonColor }, barStyle: "light-content" }),
            React.createElement(View, { style: { flex: 4, justifyContent: 'center', alignItems: 'center' } },
                React.createElement(Avatar, { source: require("../../../Images/logo.png"), size: "xlarge" })),
            React.createElement(View, { style: { flex: 6 } },
                React.createElement(InputBox, { showErrorMessage: showEmailErrorMessage, errorMessage: this.state.emailIdError, placeHolder: "Email Address", saveRef: (ref) => (this.inputRefs['Email'] = ref), onSubmit: () => this.focusNextField('Password'), onBlur: () => {
                        emailValidator(this.state.email, () => {
                            this.setState({ emailIdError: undefined });
                        }, (error) => {
                            this.setState({ emailIdError: error });
                        });
                    }, onChangeText: text => {
                        this.setState({ email: text }, () => {
                            emailValidator(text, () => {
                                this.setState({ emailIdError: undefined });
                            }, (error) => {
                                this.setState({ emailIdError: error });
                            });
                        });
                    } }),
                React.createElement(InputBox, { showErrorMessage: showPasswordErrorMessage, errorMessage: this.state.passwordError, secureTextEntry: true, placeHolder: "Password", saveRef: (ref) => (this.inputRefs['Password'] = ref), onBlur: () => {
                        passwordValidator(this.state.password, () => {
                            this.setState({ passwordError: undefined });
                        }, (error) => {
                            this.setState({ passwordError: error });
                        });
                    }, onChangeText: text => {
                        this.setState({ password: text }, () => {
                            passwordValidator(text, () => {
                                this.setState({ passwordError: undefined });
                            }, (error) => {
                                this.setState({ passwordError: error });
                            });
                        });
                    } }),
                React.createElement(Button, { loadingProps: { color: 'black', animating: true }, title: "Log In", loading: this.state.loading, disabled: this.state.loading, buttonStyle: styles.buttonStyle, containerStyle: { paddingHorizontal: 10, borderRadius: 20 }, onPress: () => {
                        this.setState({ formSubmitted: true, loading: true }, () => this.validateForm(() => login(this.state.email, this.state.password, () => {
                            this.setState({ loading: false });
                            this.props.navigation.navigate('Home');
                        }, () => {
                            Alert.alert('Could not Login');
                        })));
                    } }))));
    }
}
//# sourceMappingURL=index.js.map