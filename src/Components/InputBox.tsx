import React, { PureComponent } from 'react';
import { Input } from 'react-native-elements';
import { styles } from '../Styles/CommonStyles';
import { Text, View } from 'react-native';
interface Props {
  placeHolder: string;
  secureTextEntry?: boolean;
  showErrorMessage?: boolean;
  errorMessage: string | undefined;
  onSubmit?(): void;
  saveRef(ref: any): void;
  onBlur?(): void;
  onChangeText(text: string): void;
}

export default class InputBox extends PureComponent<Props> {
  inputRef: any;
  render() {
    return (
      <View style={styles.inputFieldContainer}>
        <Input
          ref={ref => this.props.saveRef(ref)}
          inputStyle={styles.inputStyle}
          style={styles.textInput}
          inputContainerStyle={styles.textInputContainer}
          placeholder={this.props.placeHolder}
          onChangeText={this.props.onChangeText}
          secureTextEntry={this.props.secureTextEntry}
          onBlur={this.props.onBlur}
          onSubmitEditing={this.props.onSubmit}
        />
          <Text style={styles.errorText}>{this.props.showErrorMessage &&  this.props.errorMessage}</Text>
      </View>
    );
  }
}
