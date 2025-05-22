import { translate } from "@translations/translate";

export interface ISigninFormValidationErrors {
  email?: string;
  password?: string;
}

export function isValidHttpUrl(s: string) {
  return /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/.test(
    s
  );
}

export const validateSignInForm = (formData: {
  email?: string;
  password?: string;
}) => {
  let validation_errors: ISigninFormValidationErrors = {};
  // Validate email
  if (!formData.email || typeof formData.email !== "string") {
    validation_errors.email = translate("emailError");
  }
  var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!formData.password || typeof formData.password !== "string") {
    validation_errors.password = translate("passwordError");
  }

  if (formData.password && isValidHttpUrl(formData.password)) {
    validation_errors.password = translate("wrongPassword");
  }

  return validation_errors;
};
