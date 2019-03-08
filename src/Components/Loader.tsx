import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { guide } from '../Styles/CommonStyles';

export default class Loader extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <ActivityIndicator size="large" color={guide.buttonColor} />
      </View>
    );
  }
}
