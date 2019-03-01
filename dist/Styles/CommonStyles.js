import { StyleSheet, Dimensions } from 'react-native';
export const guide = {
    buttonColor: "#FF8B02"
};
const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
    textInputContainer: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 20
    },
    textInput: {
        textAlign: 'center',
        paddingBottom: 0
    },
    inputStyle: {
        textAlign: 'center',
        alignSelf: 'center'
    },
    buttonStyle: {
        backgroundColor: guide.buttonColor,
        marginHorizontal: 20,
        borderRadius: 20,
        marginTop: 10
    },
    TransparentButtonText: {
        color: guide.buttonColor
    },
    errorText: {
        width: width,
        textAlign: 'left',
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginHorizontal: 10
    },
    inputFieldContainer: {
        paddingHorizontal: 20
    }
});
//# sourceMappingURL=CommonStyles.js.map