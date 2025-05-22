import { translate } from "@translations/translate";

export interface IContactUsFormValidationErrors {
  name: string;
  email: string;
  description: string;
}

export const validateContactUsForm = (formData: {
  name?: string;
  email?: string;
  description?: string;
}) => {
  let validation_errors: IContactUsFormValidationErrors = {
    name: "",
    email: "",
    description: "",
  };
  // First Name
  if (!formData.name || typeof formData.name !== "string") {
    validation_errors.name = translate("enterName");
  }
  var regex = /^[a-zA-Z ]*$/;
  if (
    formData?.name &&
    formData?.name?.length > 0 &&
    !regex.test(formData?.name)
  ) {
    validation_errors.name = translate("enterName");
  }
  // Description
  if (!formData.description || typeof formData.description !== "string") {
    validation_errors.description = translate("enterDescription");
  }
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

  return validation_errors;
};
