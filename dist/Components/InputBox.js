import React, { PureComponent } from 'react';
import { Input } from 'react-native-elements';
import { styles } from '../Styles/CommonStyles';
import { Text, View } from 'react-native';
export default class InputBox extends PureComponent {
    render() {
        return (React.createElement(View, { style: styles.inputFieldContainer },
            React.createElement(Input, { ref: ref => this.props.saveRef(ref), inputStyle: styles.inputStyle, style: styles.textInput, inputContainerStyle: styles.textInputContainer, placeholder: this.props.placeHolder, onChangeText: this.props.onChangeText, secureTextEntry: this.props.secureTextEntry, onBlur: this.props.onBlur, onSubmitEditing: this.props.onSubmit }),
            React.createElement(Text, { style: styles.errorText }, this.props.showErrorMessage && this.props.errorMessage)));
    }
}
//# sourceMappingURL=InputBox.js.map