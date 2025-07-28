import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { horizontalScale, verticalScale } from '../../utils/Metrices';

export const profileCreationStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.PADDING_LARGE,
    paddingVertical: 24,
  },
  
  // Header Section
  headerSection: {
    marginBottom: SIZES.MARGIN_EXTRA_LARGE,
    // alignItems: 'center',
  },
  heading: {
    fontSize: SIZES.FONT_SIZE_LARGE,
    marginBottom: 12,
    color: COLORS.TEXT_PRIMARY,
  },
  description: {
    fontSize: SIZES.FONT_SIZE_MEDIUM,
    lineHeight: 22,
    color: COLORS.TEXT_SECONDARY,
    // paddingHorizontal: 20,
  },

  // Image Section
  imageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: SIZES.IMAGE_SIZE_SMALL,
    height: SIZES.IMAGE_SIZE_SMALL,
    borderRadius: SIZES.BORDER_RADIUS_LARGE,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  placeholderImage: {
    width: SIZES.IMAGE_SIZE_SMALL,
    height: SIZES.IMAGE_SIZE_SMALL,
    borderRadius: 40,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.BORDER_LIGHT,
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  uploadButton: {
    height:verticalScale(30),
    width:horizontalScale(120),
    borderWidth: 1,
    borderRadius: SIZES.BORDER_RADIUS_ROUND*2,
    borderColor: COLORS.PRIMARY,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    // alignContent: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },

  // Form Section
  formSection: {
    flex: 1,
  },

  // Button Section
  buttonSection: {
    marginTop: 24,
    marginBottom: 20,
  },
});
