import { translate } from "@translations/translate";

export interface IChangePassFormValidationErrors {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const MIN_PASSWORD_LENGTH = 8;
export const validateForm = (formData: {
  old_password: string;
  new_password: string;
  confirm_password: string;
}) => {
  let validation_errors: IChangePassFormValidationErrors = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  if (!formData.old_password || typeof formData.old_password !== "string") {
    validation_errors.old_password = translate("passwordError");
  }

  // confirm Password
  if (!formData.new_password || typeof formData.new_password !== "string") {
    validation_errors.new_password = translate("passwordError");
  } else if (formData.new_password.length < MIN_PASSWORD_LENGTH) {
    validation_errors.new_password = translate("pass_min_length");
  }

  // Validate password
  if (formData.new_password !== formData.confirm_password) {
    validation_errors.confirm_password = translate("confirmORPasswordError");
  }

  return validation_errors;
};
