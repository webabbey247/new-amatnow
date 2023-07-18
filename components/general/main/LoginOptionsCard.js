import { useEffect, useState } from "react";
import { Center, Image, Text, Pressable } from "native-base";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthSocialMedia } from "../../../utils/storage";
import icons from "../../../constants/icons";
import {
  WEB_CLIENT_ID,
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
  GOOGLE_TOKEN_URL,
} from "../../../utils/helper";
import { useSocialMediaSession } from "../../../hooks";
import { useSocialMediaLoginMutation } from "../../../redux/auth/authApiSlice";

WebBrowser.maybeCompleteAuthSession();

const LoginOptionsCard = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    // *responseType: "id_token",*
    // responseType: "id_token",
    expoClientId: WEB_CLIENT_ID,
    // webClientId: WEB_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
  });

  const [
    socialMediaLogin,
    { data: isSocialMediaData, isLoading, isSuccess, isError, error },
  ] = useSocialMediaLoginMutation();

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  // useEffect(() => {
  //   handleInitGoogleSignIn();
  // }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  console.log("hangle google sign user token:", token);
  console.log("hangle google sign user details:", userInfo);

  // const handleInitGoogleSignIn = async () => {
  //   const user = await AsyncStorage.getItem("@social_media_user");
  //   console.log("hangle google login user:", user);
  //   if (!user) {
  //     console.log("hangle google prompt login:", response)
  //     // if (response?.type === "success") {
  //     //   setToken(response.authentication.accessToken);
  //     //   getUserInfo(response.authentication.accessToken);
  //     //   console.log("hangle google sign user token:", response.authentication.accessToken);
  //     // }
  //   } else {
  //     setUserInfo(user);
  //     console.log("loaded locally");
  //   }
  // };

  // const getUserInfo = async (token) => {
  //   if (!token) return;
  //   try {
  //     const response = await fetch(
  //       "https://www.googleapis.com/userinfo/v2/me",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     const userData = await response.json();
  //     await AsyncStorage.setItem("@social_media_user", JSON.stringify(userData));
  //     setUserInfo(userData);
  //   } catch (err) {
  //     console.log("err response:", err);
  //   }
  // };

  // const { isUserData } = useSocialMediaSession();
  // const [googletoken, setGoogleToken] = useState(null);
  // const [userData, setUserData] = useState(null);
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId: WEB_CLIENT_ID,
  //   // webClientId: WEB_CLIENT_ID,
  //   androidClientId: ANDROID_CLIENT_ID,
  //   iosClientId: IOS_CLIENT_ID,
  // });

  // useEffect(() => {
  //   handleGoogleSignIn();
  // }, [response]);

  // const handleGoogleSignIn = async () => {
  //   console.log("prompted response:", response);
  //       //   if (response?.type === "success") {
  //       // console.log("hello token:", response?.authentication.accessToken);
  //       // setGoogleToken(response?.authentication.accessToken);
  //       // await handleGetUserInfo(response.authentication.accessToken);
  //     // }
  //   // if (!isUserData) {
  //   //   console.log("prompted response:", response);
  //     // if (response?.type === "success") {
  //     //   console.log("hello token:", googletoken);
  //     //   setGoogleToken(response?.authentication.accessToken);
  //     //   await handleGetUserInfo(response.authentication.accessToken);
  //     // }
  //   // } else {
  //   //   // setUserData(JSON.parse(isUserData));
  //   //   console.log("loaded locally");
  //   // }
  // };

  // const handleGetUserInfo = async (googletoken) => {
  //   if (!googletoken) return;
  //   try {
  //     const response = await fetch(GOOGLE_TOKEN_URL, {
  //       headers: { Authorization: `Bearer ${googletoken}` },
  //     });
  //     const userInfo = await response.json();
  //     console.log("user Info:", userInfo);
  //     // setAuthSocialMedia(JSON.stringify(userInfo));
  //     // setUserData(userInfo);
  //     return response;
  //   } catch (err) {
  //     console.log("err response:", err);
  //   }
  // };

  // console.log("hello token:", googletoken);
  // console.log("hello userData:", userData);

  // useEffect(() => {
  //   if (!isUserData) {
  //     if (response?.type === "success") {
  //       const { authentication } = response;
  //       console.log("hello token:", authentication?.accessToken);
  //       setGoogleToken(authentication?.accessToken);
  //     }
  //   }
  // }, [response]);

  //   const handleGoogleSignIn = async () => {
  //     if (response?.type === "success") {
  //         console.log("hello token:", response.authentication.accessToken);
  //     //   setGoogleToken(response.authentication.accessToken);
  //     //   setAuthSocialMedia(response.authentication.accessToken);
  //     }
  //   };

  // //   const handleSGoogleAuth = async (googletoken) => {
  // //     try {
  // //       const googpleRes = await socialMediaLogin(googletoken);
  // //       console.log("hello Auth:", googpleRes);
  // //       //   return response;
  // //     } catch (err) {
  // //       console.log("err response:", err);
  // //     }
  // //   };

  //   useEffect(() => {
  //     handleGoogleSignIn();
  //     // if (googletoken) {
  //     //   handleSGoogleAuth();
  //     // }
  //   }, [response]);
  return (
    <Center flex={1} my={4}>
      <Text
        color="grey.700"
        fontSize="16"
        lineHeight="24"
        letterSpacing="-0.17"
        borderBottomColor="grey.700"
        borderBottomWidth="1"
        fontWeight="400"
      >
        or
      </Text>

      {isLoading ? (
        <Button
          width="100%"
          rounded="full"
          bg="grey.500"
          py="4"
          isLoading
          _loading={{
            bg: "grey.500",
          }}
          _spinner={{
            color: "red",
          }}
          isLoadingText="Please wait"
        >
          Log In
        </Button>
      ) : (
        <Pressable
          // onPress={() => (googletoken ? handleGetUserInfo() : promptAsync())}
          // onPress={() => promptAsync()}
          onPress={() => promptAsync({ useProxy: false, showInRecents: true })}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          w="100%"
          rounded="full"
          bg="grey.500"
          mt="4"
          p="4"
        >
          <Image
            mr={5}
            h="8"
            w="8"
            source={icons.GOOGLEICON}
            alt="Continue With Google"
          />
          <Text
            mt={0.5}
            fontWeight="500"
            color="black.500"
            fontSize="14"
            lineHeight="22"
            letterSpacing="-0.165"
          >
            Continue With Google
          </Text>
        </Pressable>
      )}

      {/* <Pressable
        onPress={() => (token ? getUserInfo() : promptAsync())}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        w="100%"
        rounded="full"
        bg="grey.500"
        mt="4"
        p="4"
      >
        <Image
          mr={5}
          h="8"
          w="8"
          source={icons.GOOGLEICON}
          alt="Continue With Google"
        />
        <Text
          mt={0.5}
          fontWeight="500"
          color="black.500"
          fontSize="14"
          lineHeight="22"
          letterSpacing="-0.165"
        >
          Continue With Google
        </Text>
      </Pressable> */}

      <Pressable
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        w="100%"
        rounded="full"
        bg="grey.500"
        mt="3"
        p="4"
      >
        <Image
          mr={5}
          h="7"
          w="7"
          source={icons.APPLEICON}
          alt="Continue With Apple"
        />
        <Text
          mt={0.5}
          fontWeight="500"
          color="black.500"
          fontSize="14"
          lineHeight="22"
          letterSpacing="-0.165"
        >
          Continue With Apple
        </Text>
      </Pressable>
    </Center>
  );
};

export default LoginOptionsCard;
