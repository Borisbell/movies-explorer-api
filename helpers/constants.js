module.exports.NOT_FOUND = 404;
module.exports.BAD_REQUEST = 400;
module.exports.UNAUTH_ERR = 401;
module.exports.FORBIDDEN_ERR = 403;
module.exports.CONFLICT_ERR = 409;
module.exports.INTERN_SERVER_ERR = 500;

module.exports.NOT_FOUND_MESSAGE = 'Пользователь не найден';
module.exports.PAGE_NOT_FOUND_MESSAGE = 'Страницы не существует';
module.exports.BAD_REQUEST_MESSAGE = 'Некорректные данные';
module.exports.UNAUTH_ERR_MESSAGE = 'Не передан емейл или пароль';
module.exports.FORBIDDEN_ERR_MESSAGE = 'Нет прав на удаление';
module.exports.CONFLICT_ERR_MESSAGE = 'Это емейл уже занят';
module.exports.INTERN_SERVER_ERR_MESSAGE = 'Что-то пошло не так';

module.exports.TEST_LINK = /https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
