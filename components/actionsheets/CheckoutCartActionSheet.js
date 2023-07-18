import { Fragment, useState } from "react";
import { Actionsheet } from "native-base";
import { setHeight } from "../../utils/helper";
import {
  CheckoutNotesForm,
  CheckoutPromoCodeForm,
  CheckoutRiderTipsForm,
} from "../forms";
import { ToastAlert } from "../alerts";

const CheckoutCartActionSheet = ({
  isOpen,
  onClose,
  delivery,
  formType,
  restuarantID,
}) => {
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  return (
    <Fragment>
      {showAlert ? (
        <ToastAlert
          message={message}
          status={alertStatus}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      ) : null}
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator={false}>
        <Actionsheet.Content
          h={setHeight(80)}
          bg="white.500"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {formType === "notes" ? (
            <CheckoutNotesForm
              delivery={delivery}
              onClose={onClose}
              setMessage={setMessage}
              setShowAlert={setShowAlert}
              setAlertStatus={setAlertStatus}
            />
          ) : formType === "promo" ? (
            <CheckoutPromoCodeForm
              restuarantID={restuarantID}
              onClose={onClose}
              setMessage={setMessage}
              setShowAlert={setShowAlert}
              setAlertStatus={setAlertStatus}
            />
          ) : formType === "tips" ? (
            <CheckoutRiderTipsForm
              onClose={onClose}
              setMessage={setMessage}
              setShowAlert={setShowAlert}
              setAlertStatus={setAlertStatus}
            />
          ) : null}
        </Actionsheet.Content>
      </Actionsheet>
    </Fragment>
  );
};

export default CheckoutCartActionSheet;
