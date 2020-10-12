import 'dotenv/config';

export default {
  secret: process.env.AUTH_SECRETE,
  expiresIn: process.env.TOKEN_EXPIRATION,
};
