import { useState, useEffect } from "react";
import { authToken } from "../utils/storage";

const useSession = () => {
  const [isToken, setIsToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateEntry = async () => {
    try {
      const tokenized = await authToken();
      tokenized || tokenized !== null || tokenized !== ""
        ? (setIsAuthenticated(true), setIsToken(tokenized))
        : setIsAuthenticated(false);
    } catch (err) {
      console.log("err response", err);
    }
  };

  useEffect(() => {
    authenticateEntry();
  }, []);
  return { isAuthenticated, isToken };
};

export default useSession;
