import { Dimensions } from "react-native";
import * as Device from "expo-device";

const { height, width } = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;

const setWidth = (w) => (width / 100) * w;

const brandID = Device.manufacturer;
const buildID = Device.osInternalBuildId;

const randomID = Math.floor(Math.random() * Date.now())
  .toString(36)
  .substring(2, 15);

const Currencyformatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const userDeviceID = `${randomID}-${buildID}-${brandID}`;

const FLUTTERWAVEPUBLICKEY = "FLWPUBK_TEST-6f015f850a6623e9161e342c424e5e99-X";
const PAYSTACKPUBLICKEY = "pk_test_21f13d496410daba58fa477b669eaed24ce5add3";
const GOOGLE_API_KEY = "AIzaSyBJLRoEgulUxvcnTeUYCXJwQCEfv8LvfGg";
const WEB_CLIENT_ID =
  "770802446177-12d4qfumb7k1120f8ruehss094kp8src.apps.googleusercontent.com";
const IOS_CLIENT_ID =
  "770802446177-b953r8umlm82rl2qlp1ngipakqcjo2ul.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "770802446177-tqdcfhkni7ih2evrp80vovsti2ftmpi8.apps.googleusercontent.com";
const GOOGLE_TOKEN_URL = "https://www.googleapis.com/userinfo/v2/me";
// const GOOGLE_TOKEN_URL = "https://www.googleapis.com/oauth2/v1/userinfo";

const AUTHTOKEN = "@token";
const AUTHSOCIALMEDIATOKEN = "@social_media_user";
const ISFIRSTTIME = "@is_first_time";

export {
  FLUTTERWAVEPUBLICKEY,
  PAYSTACKPUBLICKEY,
  setHeight,
  setWidth,
  userDeviceID,
  GOOGLE_API_KEY,
  WEB_CLIENT_ID,
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
  GOOGLE_TOKEN_URL,
  AUTHTOKEN,
  AUTHSOCIALMEDIATOKEN,
  ISFIRSTTIME,
};
