import { useState, useEffect } from "react";
import { authSocialMedia } from "../utils/storage";

const useSocialMediaSession = () => {
  const [isUserData, setIsUserData] = useState(null);

  const verifySocialMediaAuth = async () => {
    try {
      const data = await authSocialMedia();
      !data || data === null || data === ""
        ? setIsUserData("")
        : setIsUserData(data);
    } catch (err) {
      console.log("err response", err);
    }
  };

  useEffect(() => {
    verifySocialMediaAuth();
  }, []);
  return { isUserData };
};

export default useSocialMediaSession;
