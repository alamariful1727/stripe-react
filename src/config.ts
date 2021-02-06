export const config = {
  stripe: {
    PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!,
    SECRET_KEY: process.env.REACT_APP_STRIPE_SECRET_KEY!,
  },
};
