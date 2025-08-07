// API Configuration with secure token management
// Tokens should be stored in Supabase secrets for production

interface ApiTokens {
  YOOGA_PAYMENT_TOKEN: string;
  YOOGA_API4_TOKEN: string;
}

// For now, using the original tokens until Supabase secrets are configured
// TODO: Replace with Supabase Edge Function calls to access secrets securely
const getApiTokens = (): ApiTokens => {
  return {
    // Original payment API token - should be moved to Supabase secrets
    YOOGA_PAYMENT_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJ5b29nYS5jb20uYnIiLCJ1cG4iOiIxIiwiZ3JvdXBzIjpbIk9SR0FOSVpBVElPTiJdLCJpYXQiOjE2ODI0NDc1ODcsImV4cCI6MTk5NzgwNzU4NywianRpIjoiZjkwNDVjOWItZjEyMy00YjliLTk2M2QtOGUxMDVmYzk2OGYwIn0.jmlvmxJd0PSrkXyPtDMi8zkbmEWzroqPhIDDyamyBXmcJUvLilh_CFTqskPTv9Sj4zhP-wQXXJ7GshL8OcT7gPZSHXPkVL3heUGE3zE59fP6WjTgLTpv6Y5lXpRXKBHt4JT0fB8LvA9qPltRftgK3Q_8yjqtdMVWIjRWpXn-VOVFL8y7YOGkSAe_U5ix8shKarrBFbzDc9hufSr5Iu_Q4TrzEdwORyhTerInBCZjYwmjuvfmdjM3ejTH0X8C6Maeh_Tj-7STxWPPIF3VPLmU0lvvr7TZI5Am0WvToDAdU3ETmZgUp8FSf7H5ZDmwKFk95z1ocGanRvLdfyp2XxgKkA",
    
    // Original API4 token - should be moved to Supabase secrets  
    YOOGA_API4_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjU3NywiaWF0IjoxNjk4MTcyMzcxfQ.iT2HFaUdL2A603PA1pHRAglUyEmsJyhxbDo05TxcyO8",
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