const BASE_URL = import.meta.env.VITE_BASE_URL; // this is how import base URL from VITE Project .env file 

export const endpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
};
