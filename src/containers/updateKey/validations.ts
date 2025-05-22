import { translate } from "@translations/translate";
import { Alert } from "react-native";

export interface IAddKeyValidationErrors {
  name?: string;
  description?: string;
}

export const validateAddKey = (formData: {
  name?: string;
  description?: string;
}) => {
  let validation_errors: IAddKeyValidationErrors = {};
  // Validate email
  if (!formData.name || typeof formData.name !== "string") {
    validation_errors.name = translate("addKeyName");
  }

  // Validate Name
  if (!formData.description || typeof formData.description !== "string") {
    validation_errors.description = translate("addKeyDesc");
  }

  return validation_errors;
};
