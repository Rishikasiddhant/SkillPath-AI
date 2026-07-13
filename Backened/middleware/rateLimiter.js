import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  validate:{ trustProxy: false}
});

export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 500,
  message: { message: 'Too many authentication attempts...' },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false } // <--- Sahi syntax ye hai
});