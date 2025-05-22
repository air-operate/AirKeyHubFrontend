import { translate } from "@translations/translate";

export interface ISignUpFormValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  country?: string;
}

export const validateSignUpForm = (formData: {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  country_code?: string;
  country?: string | any;
}) => {
  let validation_errors: ISignUpFormValidationErrors = {};
  
  // First Name
  if (!formData.name || typeof formData.name !== "string") {
    validation_errors.name = translate("enterName");
  }

  // Remove phone number validation

  // if (!formData.country) {
  //   validation_errors.country = translate("enter_country");
  // }

  // Validate email
  if (!formData.email || typeof formData.email !== "string") {
    validation_errors.email = translate("enterEmail");
  }
  var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (
    formData?.email &&
    formData?.email?.length > 0 &&
    !regex.test(formData?.email)
  ) {
    validation_errors.email = translate("enterValidEmail");
  }

  // Validate password
  if (!formData.password || typeof formData.password !== "string") {
    validation_errors.password = translate("passwordError");
  } else if (formData.password.length < 8) {
    validation_errors.password = translate("pass_min_length");
  }

  // Confirm Password
  if (
    !formData.confirmPassword ||
    typeof formData.confirmPassword !== "string"
  ) {
    validation_errors.confirmPassword = translate("confirmPasswordError");
  }

  // Validate password match
  if (formData.password !== formData.confirmPassword) {
    validation_errors.confirmPassword = translate("confirmORPasswordError");
  }

  return validation_errors;
};
