import { useEffect } from "react";
import { usePatchMenuToCartMutation } from "../redux/cart/cartApiSlice";

const useIncrementCart = (formData) => {
  const [
    patchMenuToCart,
    {
      data: patchCartData,
      isLoading: patchCartLoading,
      isSuccess,
      isError,
      error,
    },
  ] = usePatchMenuToCartMutation();

  const increaseMenuCart = async () => {
    try {
      const response = await patchMenuToCart(formData);
      return response;
    } catch (err) {
      console.log("error response", err);
    } finally {
      return increaseMenuCart;
    }
  };

  // useEffect(() => {
  //   increaseMenuCart();
  // }, []);

  return { patchCartData, patchCartLoading, isSuccess, isError, error };
};
export default useIncrementCart;
