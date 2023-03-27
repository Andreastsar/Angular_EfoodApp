const BASE_URL = 'http://localhost:5000';

// All food products
export const FOODS_URL = BASE_URL + '/api/products';

// Single food product by id
export const FOODS_URL_BY_ID = FOODS_URL + '/';

// Login (email, password)
export const LOGIN_BY_EMAIL_PASSWORD = BASE_URL + '/api/users/login';

// Register (user info)
export const USER_REGISTRATION = BASE_URL + '/api/users/register';

// New order
export const USER_NEW_ORDER = BASE_URL + '/api/users/newOrder';
