import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { moderateScale, verticalScale } from '../../utils/Metrices';

export const loginScreenStyles = StyleSheet.create({
  // Slider Styles
  sliderContainer: {
    height: SIZES.SLIDER_HEIGHT, // Using SIZES instead of height * 0.5
    backgroundColor: COLORS.PRIMARY,
  },
  slider: {
    flex: 1,
  },
  slide: {
    width: SIZES.SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.PADDING_LARGE,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    width: SIZES.SCREEN_WIDTH, // Using SIZES instead of width
    height: SIZES.SLIDER_HEIGHT,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.PADDING_MEDIUM,
  },
  paginationDot: {
    width: SIZES.PAGINATION_DOT_SIZE,
    height: SIZES.PAGINATION_DOT_SIZE,
    borderRadius: SIZES.BORDER_RADIUS_SMALL,
    backgroundColor: COLORS.TEXT_WHITE,
    marginHorizontal: SIZES.MARGIN_SMALL / 2,
  },
  paginationDotActive: {
    backgroundColor: COLORS.TEXT_WHITE,
    width: SIZES.PAGINATION_DOT_ACTIVE_WIDTH,
  },
  
  // Form Styles
  content: {
    // flex: 1,
    paddingHorizontal: SIZES.PADDING_LARGE,
    borderTopRightRadius: SIZES.BORDER_RADIUS_ROUND,
    borderTopLeftRadius: SIZES.BORDER_RADIUS_ROUND,
    justifyContent: 'center',
  },
  darkModeToggle: {
    alignSelf: 'flex-end',
    marginBottom: SIZES.MARGIN_LARGE,
    padding: SIZES.PADDING_SMALL + 2, // 10
    borderRadius: SIZES.BORDER_RADIUS_MEDIUM,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  darkModeText: {
    fontSize: SIZES.FONT_SIZE_MEDIUM,
    fontWeight: '500',
  },
  title: {
    marginTop: verticalScale(SIZES.MARGIN_MEDIUM),
    fontSize: moderateScale(SIZES.FONT_SIZE_EXTRA_LARGE),
    color: COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    fontSize: SIZES.FONT_SIZE_REGULAR,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SIZES.MARGIN_SMALL - 2,
  },
  form: {
    marginTop: SIZES.MARGIN_LARGE,
  },
  input: {
    borderWidth: SIZES.BORDER_WIDTH_THIN,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: SIZES.BORDER_RADIUS_MEDIUM,
    padding: SIZES.PADDING_MEDIUM - 1, // 15
    fontSize: SIZES.FONT_SIZE_REGULAR,
    marginBottom: SIZES.MARGIN_MEDIUM - 1, // 15
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SIZES.BORDER_RADIUS_MEDIUM,
    padding: SIZES.PADDING_MEDIUM - 1, // 15
    alignItems: 'center',
    marginTop: SIZES.MARGIN_SMALL + 2, // 10
  },
  buttonText: {
    color: COLORS.TEXT_WHITE,
    fontSize: SIZES.FONT_SIZE_REGULAR,
    fontWeight: 'bold',
  },
  gradientButton: {
    borderRadius: SIZES.BORDER_RADIUS_ROUND,
    marginTop: SIZES.MARGIN_SMALL + 2, // 10
  },
  linkButton: {
    marginTop: SIZES.MARGIN_LARGE,
    alignItems: 'center',
  },
  linkText: {
    color: COLORS.ACCENT,
    fontSize: SIZES.FONT_SIZE_MEDIUM,
  },
});
