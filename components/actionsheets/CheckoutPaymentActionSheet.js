import { Actionsheet } from "native-base";
import { setHeight } from "../../utils/helper";
import { useSelector } from "react-redux";
import { CheckoutBankInfoCard, CheckoutThirdPartyCard } from "../general";

const CheckoutPaymentActionSheet = ({ isOpen, onClose }) => {
  const {
    cartTotalAmount,
    isThirdParty,
    isBankTransfer,
    bankDetails,
    thirdPartyDetails,
  } = useSelector((state) => state.cart);
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content
        py={3}
        px={0}
        m={0}
        bg="white.500"
        h={setHeight(45)}
        maxHeight="100%"
      >
        {isThirdParty ? (
          <CheckoutThirdPartyCard
            cartTotalAmount={cartTotalAmount}
            thirdPartyDetail={thirdPartyDetails}
          />
        ) : null}
        {isBankTransfer ? (
          <CheckoutBankInfoCard
            cartTotalAmount={cartTotalAmount}
            bankDetails={bankDetails}
          />
        ) : null}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default CheckoutPaymentActionSheet;
