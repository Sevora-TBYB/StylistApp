import {StyleSheet} from 'react-native';
import {COLORS} from '../constants';

export const globalStyles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  
  // Common container variations
  containerWhite: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
  },
  
  containerSecondary: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  
  containerDark: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_DARK,
  },
  
  // Common content containers
  content: {
    flex: 1,
    padding: 20,
  },
  
  contentCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  // Common text styles
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: 10,
  },
  
  subtitle: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: 20,
  },
  
  body: {
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 20,
  },
  
  // Common button styles
  button: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 5,
  },
  
  buttonSecondary: {
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.BORDER_MEDIUM,
  },
  
  buttonText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  buttonTextSecondary: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Common input styles
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
    marginBottom: 15,
  },
  
  // Common layout helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  spaceAround: {
    justifyContent: 'space-around',
  },
  
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Common margins and paddings
  mt10: {marginTop: 10},
  mt20: {marginTop: 20},
  mt30: {marginTop: 30},
  mb10: {marginBottom: 10},
  mb20: {marginBottom: 20},
  mb30: {marginBottom: 30},
  p10: {padding: 10},
  p20: {padding: 20},
  px20: {paddingHorizontal: 20},
  py20: {paddingVertical: 20},
  
  // Shadow styles
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  shadowLight: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default globalStyles;
