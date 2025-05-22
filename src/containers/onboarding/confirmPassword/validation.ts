import { translate } from "@translations/translate";

export interface ISignUpFormValidationErrors {
  password?: string;
  confirmPassword?: string;
}

const MIN_PASSWORD_LENGTH = 8;
export const validateForm = (formData: {
  password?: string;
  confirmPassword?: string;
}) => {
  let validation_errors: ISignUpFormValidationErrors = {};

  // Validate password
  if (!formData.password || typeof formData.password !== "string") {
    validation_errors.password = translate("passwordError");
  } else if (formData.password.length < MIN_PASSWORD_LENGTH) {
    validation_errors.password = translate("pass_min_length");
  }

  // confirm Password
  if (
    !formData.confirmPassword ||
    typeof formData.confirmPassword !== "string"
  ) {
    validation_errors.confirmPassword = translate("confirmPasswordError");
  }

  // Validate password
  if (formData.password !== formData.confirmPassword) {
    validation_errors.confirmPassword = translate("confirmORPasswordError");
  }

  return validation_errors;
};
