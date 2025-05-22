import { translate } from "@translations/translate";

export const validateProfileForm = (formData: {
  name: string;
  // countryCode: string;
  // phoneNumber: string;
  profileImage: string;
}) => {
  let validation_errors = {
    name: "",
    // countryCode: "",
    // phoneNumber: "",
    profileImage: "",
  };

  if (!formData.name) {
    validation_errors.name = translate("nameError"); // Adjust error message key if needed
  }

  // if (!formData.phoneNumber) {
  //   validation_errors.phoneNumber = translate("phoneNumberError"); // Adjust error message key if needed
  // }

  return validation_errors;
};
