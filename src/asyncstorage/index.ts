import { User } from "src/typings/global";
import { storage } from "./storage"; // Assuming `storage` is your MMKV instance

export const getAuthToken = async () => {
  try {
    const token = storage.getString("token");
    if (token) return token;
    return null;
  } catch (error) {
    return null;
  }
};

export const setAuthToken = async (token: string) => {
  try {
    storage.set("token", token);
    return true;
  } catch (error) {
    return false;
  }
};

export const removeAuthToken = async () => {
  try {
    storage.delete("token");
    return true;
  } catch (error) {
    return false;
  }
};

export const getData = async (key: string) => {
  try {
    const value = storage.getString(key);
    return value;
  } catch (e) {
    return null;
  }
};

export const storeData = async (key: string, value: any) => {
  try {
    storage.set(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const removeData = async (key: string) => {
  try {
    storage.delete(key);
    return true;
  } catch (e) {
    return false;
  }
};

const USER_DETAILS_KEY = "user_details";

export const getUserDetails = async (): Promise<User | null> => {
  try {
    const userDetailsString = storage.getString(USER_DETAILS_KEY);
    if (userDetailsString) {
      const userDetails: User = JSON.parse(userDetailsString);
      return userDetails;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const setUserDetails = async (user: User): Promise<boolean> => {
  try {
    const userDetailsString = JSON.stringify(user);
    storage.set(USER_DETAILS_KEY, userDetailsString);
    return true;
  } catch (error) {
    return false;
  }
};

export const removeUserDetails = async (): Promise<boolean> => {
  try {
    storage.delete(USER_DETAILS_KEY);
    return true;
  } catch (error) {
    return false;
  }
};
