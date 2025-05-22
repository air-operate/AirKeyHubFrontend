import { translate } from "@translations/translate";
import { Alert } from "react-native";

export interface IAddKeyValidationErrors {
  name?: string;
  description?: string;
  hostData?: string;
}

export const validateAddKey = (formData: {
  name?: string;
  description?: string;
  hostData?: string;
}) => {
  let validation_errors: IAddKeyValidationErrors = {};
  // Validate name
  if (!formData.name || typeof formData.name !== "string") {
    validation_errors.name = translate("addKeyName");
  }

  // Validate description
  if (!formData.description || typeof formData.description !== "string") {
    validation_errors.description = translate("addKeyDesc");
  }

  // Validate host
  if (!formData.hostData) {
    validation_errors.hostData = translate("selectKeyHost");
  }

  return validation_errors;
};
