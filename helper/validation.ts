import { ERROR_MESSAGE } from "constants/validation";

export const isValidPhoneNumber = (value: string) => {
  const regexPhoneNumber = /(\+84|0[3|5|7|8|9])+([0-9]{8,9})\b/g;

  return regexPhoneNumber.test(value);
};

export const isValidEmail = (value: string) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Regex pattern cho định dạng email

  return emailRegex.test(value);
};
export const checkEmailPhoneNumber = (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error(ERROR_MESSAGE.USERNAME_NOT_EMPTY)); // Chưa nhập thông tin
  }
  if (isValidPhoneNumber(value)) {
    return Promise.resolve();
  }
  if (isValidEmail(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error(ERROR_MESSAGE.INVALID_USERNAME));
};

export const checkPassword = (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error(ERROR_MESSAGE.PASSWORD_NOT_EMPTY));
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/; // Dành cho account người dùng
  // const passwordRegex = /^(?=.*[a-z])(?=.*[0-9]).{8,}$/; // Dành cho account test
  if (passwordRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(
    new Error('Mật khẩu phải có ít nhất 8 kí tự gồm chữ cái in hoa và số!'),
  );
};