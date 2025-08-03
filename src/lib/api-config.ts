// API Configuration with Supabase secrets
// This file centralizes all API tokens and configurations

interface ApiTokens {
  YOOGA_PAYMENT_TOKEN: string;
  YOOGA_API4_TOKEN: string;
}

// For now, we'll use placeholders until Supabase secrets are configured
// In production, these should be stored in Supabase secrets
const getApiTokens = (): ApiTokens => {
  // These tokens will be replaced with Supabase secret references
  return {
    YOOGA_PAYMENT_TOKEN: "YOOGA_PAYMENT_TOKEN_PLACEHOLDER", // Will be replaced with Supabase secret
    YOOGA_API4_TOKEN: "YOOGA_API4_TOKEN_PLACEHOLDER", // Will be replaced with Supabase secret
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