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
  TEXT_PRIMARY: '#121212',   // Dark Gray
  TEXT_SECONDARY: '#737378', // Medium Gray
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

// Dark Mode Colors
export const DARK_COLORS = {
  // Primary Theme Colors (inverted)
  PRIMARY: '#FFFFFF',        // White (inverted)
  PRIMARY_LIGHT: '#CCCCCC',  // Light Gray
  PRIMARY_DARK: '#FFFFFF',   // Pure White
  
  // Secondary Colors (inverted)
  SECONDARY: '#000000',      // Black (inverted)
  SECONDARY_LIGHT: '#1A1A1A', // Dark Gray
  SECONDARY_DARK: '#0F0F0F', // Darker Gray
  
  // Accent Colors (same)
  ACCENT: '#007bff',         // Blue (same)
  ACCENT_LIGHT: '#1a3a5c',   // Dark Blue
  
  // Status Colors (same)
  SUCCESS: '#28a745',        // Green
  WARNING: '#ffc107',        // Yellow
  ERROR: '#dc3545',          // Red
  INFO: '#17a2b8',           // Cyan
  
  // Text Colors (inverted)
  TEXT_PRIMARY: '#FFFFFF',   // White (inverted)
  TEXT_SECONDARY: '#CCCCCC', // Light Gray
  TEXT_LIGHT: '#999999',     // Medium Gray
  TEXT_WHITE: '#000000',     // Black (inverted)
  
  // Background Colors (inverted)
  BACKGROUND_PRIMARY: '#000000',    // Black (inverted)
  BACKGROUND_SECONDARY: '#1A1A1A',  // Dark Gray
  BACKGROUND_DARK: '#FFFFFF',       // White (inverted)
  BACKGROUND_DARKER: '#0F0F0F',     // Very Dark Gray
  
  // Border Colors (adapted)
  BORDER_LIGHT: '#DBDBDB',   // Dark Border
  BORDER_MEDIUM: '#DBDBDB',  // Medium Dark Border
  BORDER_DARK: '#DBDBDB',    // Light Border (inverted)
  
  // Transparent Colors
  TRANSPARENT: 'transparent',
  OVERLAY: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
  OVERLAY_LIGHT: 'rgba(255, 255, 255, 0.05)', // Light white overlay
};

// Function to get colors based on theme
export const getColors = (isDarkMode: boolean) => {
  return isDarkMode ? DARK_COLORS : COLORS;
};

// Color aliases for easier usage
export const PRIMARY_COLOR = COLORS.PRIMARY;
export const SECONDARY_COLOR = COLORS.SECONDARY;
export const ACCENT_COLOR = COLORS.ACCENT;
export const WHITE = COLORS.SECONDARY;
export const BLACK = COLORS.PRIMARY;

export default COLORS;
