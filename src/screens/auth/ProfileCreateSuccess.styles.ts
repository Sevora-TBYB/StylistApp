import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

export const profileCreateSuccessStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Icon Section
  iconSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkMark: {
    fontSize: 48,
    fontWeight: 'bold',
  },

  // Content Section
  contentSection: {
    marginBottom: 60,
    alignItems: 'center',
    // paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },

  // Button Section
  buttonSection: {
    width: '100%',
    // paddingHorizontal: 20,
  },
});
