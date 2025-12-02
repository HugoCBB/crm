import Cookies from 'js-cookie';

const TOKEN_KEY = 'authToken';

export const getToken = () => {
    return Cookies.get(TOKEN_KEY);
};

export const setToken = (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
        expires: 7,
        secure: window.location.protocol === 'https:',
        sameSite: 'Lax'
    });
};

export const removeToken = () => {
    Cookies.remove(TOKEN_KEY);
};
