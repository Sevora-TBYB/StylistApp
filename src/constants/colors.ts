// Primary Colors
export const COLORS = {
  // Primary Theme Colors
  PRIMARY: '#000000',        // Black
  PRIMARY_LIGHT: '#333333',  // Dark Gray
  PRIMARY_DARK: '#000000',   // Pure Black
  
  // Secondary Colors
  SECONDARY: '#FFFFFF',      // White
  SECONDARY_LIGHT: '#F8F9FA', // Light Gray
  SECONDARY_DARK: '#E9ECEF', // Medium Light Gray
  
  // Accent Colors
  ACCENT: '#007bff',         // Blue (for accent elements)
  ACCENT_LIGHT: '#e3f2fd',   // Light Blue
  
  // Status Colors
  SUCCESS: '#28a745',        // Green
  WARNING: '#ffc107',        // Yellow
  ERROR: '#dc3545',          // Red
  INFO: '#17a2b8',           // Cyan
  
  // Text Colors
  TEXT_PRIMARY: '#333333',   // Dark Gray
  TEXT_SECONDARY: '#666666', // Medium Gray
  TEXT_LIGHT: '#999999',     // Light Gray
  TEXT_WHITE: '#FFFFFF',     // White
  
  // Background Colors
  BACKGROUND_PRIMARY: '#FFFFFF',    // White
  BACKGROUND_SECONDARY: '#F8F9FA',  // Light Gray
  BACKGROUND_DARK: '#000000',       // Black
  BACKGROUND_DARKER: '#242424',     // Dark Gray
  
  // Border Colors
  BORDER_LIGHT: '#E9ECEF',   // Light Border
  BORDER_MEDIUM: '#DDD',     // Medium Border
  BORDER_DARK: '#333333',    // Dark Border
  
  // Transparent Colors
  TRANSPARENT: 'transparent',
  OVERLAY: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  OVERLAY_LIGHT: 'rgba(0, 0, 0, 0.3)', // Light overlay
};

// Color aliases for easier usage
export const PRIMARY_COLOR = COLORS.PRIMARY;
export const SECONDARY_COLOR = COLORS.SECONDARY;
export const ACCENT_COLOR = COLORS.ACCENT;
export const WHITE = COLORS.SECONDARY;
export const BLACK = COLORS.PRIMARY;

export default COLORS;
