import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { guide } from '../Styles/CommonStyles';

interface ErrorProps {
  errorMessage: string;
}

export default class Error extends React.PureComponent<ErrorProps> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          height: '100%'
        }}
      >
        <Icon
          containerStyle={{ marginTop: 100 }}
          name="error"
          color={guide.buttonColor}
          size={100}
        />
        <Text style={{ fontSize: 18, marginTop: 20 }}>
          {this.props.errorMessage}
        </Text>
      </View>
    );
  }
}
