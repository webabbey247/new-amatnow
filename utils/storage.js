import AsyncSorage from "@react-native-async-storage/async-storage";
import { AUTHTOKEN, AUTHSOCIALMEDIATOKEN, ISFIRSTTIME } from "./helper";

const storeData = async (key, value) => {
  try {
    await AsyncSorage.setItem(key, value);
  } catch (err) {
    console.log("store item error:", err);
  }
};

const getStoreData = async (key) => {
  try {
    const value = AsyncSorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (err) {
    console.log("get stored item error:", err);
  }
};

const authToken = async () => {
  return await getStoreData(AUTHTOKEN);
};

const setAuthToken = async (token) => {
  return await storeData(AUTHTOKEN, token);
};

const authSocialMedia = async () => {
  return await getStoreData(AUTHSOCIALMEDIATOKEN);
};

const setAuthSocialMedia = async (data) => {
  return await storeData(AUTHSOCIALMEDIATOKEN, data);
};

const firstTimeUser = async () => {
  return await getStoreData(ISFIRSTTIME);
};

const setFirstTimeUser = async (data) => {
  return await storeData(ISFIRSTTIME, data);
};

export {
  setAuthToken,
  authToken,
  authSocialMedia,
  setAuthSocialMedia,
  firstTimeUser,
  setFirstTimeUser,
};
