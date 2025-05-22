import { StyleSheet } from 'react-native';
import Colors from '../../../assets/colors/Colors';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { fonts } from '@assets/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.app_white,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.app_white,
    marginTop: hp(4),
  },
  header: { marginHorizontal: '6%', flex: 1 },
  signUpText: {
    fontSize: 27,
    color: Colors.black,
    marginTop: hp(8),
    lineHeight: 32.4,
    letterSpacing: 0.5,
    fontFamily: fonts.urbanistBold,
  },
  centerSection: {
    marginTop: hp(4),
  },
  label: {
    fontSize: 15,
    color: '#8F8F8F',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: '5%',
    lineHeight: 18,
    left: 3,
  },
  footer: { flex: 1, justifyContent: 'flex-end', marginBottom: 10, marginTop: 20 },
  haveAnText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#C4C4C4',
    lineHeight: 16.8,
    letterSpacing: 0.5,
    fontFamily: fonts.urbanistMedium,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '800',
    color: Colors.black,
    lineHeight: 18,
    letterSpacing: 0.5,
    marginTop: hp(0.2),
    fontFamily: fonts.urbanistBold,
  },
  error: {
    color: Colors.error_red,
    fontSize: 13,
    marginTop: 7,
    fontFamily: fonts.urbanistItalic,
    textAlign: 'center',
    marginVertical: hp(1),
  },
  text: {
    textAlignVertical: 'center',
    alignItems: 'center',
    flex: 1,
    color: Colors.black,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
    fontFamily: fonts.urbanistMedium,
    lineHeight: 39,
  },
  labelStyle: {
    fontSize: 18,
    color: '#aaa',
    fontFamily: fonts.urbanistMedium,
    lineHeight: 39,
  },
  inputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderBottomColor: '#DEDFE1',
  },
  errorMessage: {
    color: Colors.error_red,
    fontSize: 13,
    marginTop: 7,
    fontFamily: fonts.urbanistItalic,
  },
    buttonText: {
        fontSize: 20,
        color: Colors.white,
        letterSpacing: 0.7,
        fontFamily: fonts.urbanistSemiBold,
      },
      buttonContainer: {
        backgroundColor: Colors.primary_color,
        borderRadius: 28.5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 53,
      },
});

