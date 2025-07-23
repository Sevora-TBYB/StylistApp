import { StyleSheet } from "react-native";
import { moderateScale } from "../../utils/Metrices";
import { COLORS } from "../../constants";


const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60, // Add top padding to push content from top
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: moderateScale(40), // Position image towards top

  },
  logo: {
    borderRadius: 60,
    // backgroundColor: COLORS.SECONDARY,
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    letterSpacing: 2,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: COLORS.TEXT_LIGHT,
    textAlign: 'center',
    fontWeight: '300',
  },
  loadingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: moderateScale(160),
    height: 4,
    backgroundColor: COLORS.BACKGROUND_DARKER,
    borderRadius: 2,
    overflow: 'hidden',
    // marginBottom: 15,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 2,
  },
  loadingText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 14,
    fontWeight: '300',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.TEXT_LIGHT,
    fontSize: 12,
    fontWeight: '300',
  },
});

export default styles;