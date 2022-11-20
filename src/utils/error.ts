const ERROR_CODES = {
    EMAIL_NOT_FOUND: "Пользователь с таким email не был найден",
    INVALID_PASSWORD: "Неверный пароль",
    auth: 'Пожалуйста авторизуйтесь'
};

export function error(code: keyof typeof ERROR_CODES) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : "Неизвестная ошибка";
}
