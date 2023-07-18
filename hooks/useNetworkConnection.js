import { useState, useEffect } from "react";
import Netinfo from "@react-native-community/netinfo";
import { NoInternetCard } from "../components/general";

const CheckNetwork = ({ isConnected, setIsConnected }) => {
  useEffect(() => {
    const unsubscribe = Netinfo.addEventListener((state) => {
      //   console.log("Connection Type", state.type);
      console.log("Is Connected", state.isConnected);
      setIsConnected(state.isConnected);
    });

    //unSubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NoInternetCard
      screenType="network"
      title="No internet connection"
      subtitle="Make sure you’re connected to the internet."
    />
  );
};

export default CheckNetwork;
