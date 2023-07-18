import { useEffect } from "react";
import { Slide, useSafeArea, Center } from "native-base";

const ToastAlert = ({ message, status, showAlert, setShowAlert }) => {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  });
  return (
    <Slide in={showAlert} placement="top" duration="1000">
      <Center
        p="3"
        _text={{
          color: "white.500",
          fontSize: "14",
          lineHeight: "22",
          letterSpacing: "-0.165",
        }}
        bg={status === "success" ? "green.500" : "red.500"}
        {...safeAreaProps}
      >
        {message}
      </Center>
    </Slide>
  );
};

export default ToastAlert;
