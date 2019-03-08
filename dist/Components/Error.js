import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { guide } from '../Styles/CommonStyles';
export default class Error extends React.PureComponent {
    render() {
        return (React.createElement(View, { style: {
                flex: 1,
                alignItems: 'center',
                height: '100%'
            } },
            React.createElement(Icon, { containerStyle: { marginTop: 100 }, name: "error", color: guide.buttonColor, size: 100 }),
            React.createElement(Text, { style: { fontSize: 18, marginTop: 20 } }, this.props.errorMessage)));
    }
}
//# sourceMappingURL=Error.js.map