// API Configuration with secure token management
// Tokens are now loaded from environment variables for better security

interface ApiTokens {
  YOOGA_PAYMENT_TOKEN: string;
  YOOGA_API4_TOKEN: string;
}

// Load tokens from environment variables
// Tokens are stored in .env.local and should not be committed to version control
const getApiTokens = (): ApiTokens => {
  const paymentToken = import.meta.env.VITE_YOOGA_PAYMENT_TOKEN;
  const api4Token = import.meta.env.VITE_YOOGA_API4_TOKEN;

  if (!paymentToken || !api4Token) {
    console.error('API tokens not found in environment variables. Please check .env.local file.');
    throw new Error('Missing required API tokens in environment variables');
  }

  return {
    YOOGA_PAYMENT_TOKEN: paymentToken,
    YOOGA_API4_TOKEN: api4Token,
  };
};

export const API_CONFIG = {
  tokens: getApiTokens(),
  endpoints: {
    PAYMENT_API: "https://payment.yooga.com.br",
    API4: "https://api4.yooga.com.br",
  },
  headers: {
    'Content-Type': 'application/json',
  },
};

// Helper function to create authorization headers
export const createAuthHeaders = (tokenType: keyof ApiTokens) => ({
  'Authorization': `Bearer ${API_CONFIG.tokens[tokenType]}`,
  ...API_CONFIG.headers,
});