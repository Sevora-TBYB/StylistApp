// Test API Configuration and Login Endpoint

import { API_CONFIG, ENDPOINTS } from '../config/endpoints';

export const testApiConfig = () => {
  console.log('API Configuration Test:');
  console.log('Base URL:', API_CONFIG.BASE_URL);
  console.log('Login Endpoint:', ENDPOINTS.AUTH.LOGIN);
  console.log('Full Login URL:', `${API_CONFIG.BASE_URL}${ENDPOINTS.AUTH.LOGIN}`);
  
  // Test with sample data
  const testCredentials = {
    email: "firoj.ali@viaconteam.com",
    password: "123456"
  };
  
  console.log('Test Credentials:', testCredentials);
  console.log('Expected Response Format:', {
    "status": true,
    "message": "Login successful",
    "data": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "phoneVerified": true
    },
    "credentials": true
  });
};

// Email validation test
export const testEmailValidation = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email.trim());
  
  console.log(`Email validation test for "${email}": ${isValid ? 'VALID' : 'INVALID'}`);
  return isValid;
};

// Test various email formats
export const runEmailValidationTests = () => {
  console.log('\n=== Email Validation Tests ===');
  const testEmails = [
    'firoj.ali@viaconteam.com', // Valid
    'test@example.com', // Valid
    'user.name@domain.co.uk', // Valid
    'invalid.email', // Invalid
    '@domain.com', // Invalid
    'user@', // Invalid
    'user name@domain.com', // Invalid
    '', // Invalid
  ];
  
  testEmails.forEach(email => {
    testEmailValidation(email);
  });
};

export default {
  testApiConfig,
  testEmailValidation,
  runEmailValidationTests,
};
