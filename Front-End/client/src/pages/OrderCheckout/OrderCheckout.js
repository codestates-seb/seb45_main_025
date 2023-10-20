import { useRef, useEffect } from "react";
import {
  loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { OrderCheckoutContainer } from './OrderCheckout.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import snackImg from '../../common/image/main-image.png';
import { ReactComponent as AlertIcon } from '../../common/image/Icons/alert.svg';
import { useCartStore } from '../../stores/cartStore';
import { useOrderStore } from '../../stores/orderStore';

const selector = "#payment-widget";
const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
const customerKey = "YbX2HuSlsC9uVJW6NMRMj";

export default function OrderCheckout() {
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const { selected, subtotalPrice } = useCartStore();
  const selectedId = selected.map(el => el.product.id);
  const { inputName, inputAddress, inputPhone, inputRequest } = useOrderStore();
  let params = `name=${inputName}&address=${inputAddress}&phone=${inputPhone}&request=${inputRequest}`;
  for (const id of selectedId) {
    params += `&productId=${id}`;
  }

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: subtotalPrice }
      );
      paymentWidget.renderAgreement("#agreement");
      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget == null) {
      return;
    }
  }, [subtotalPrice]);

  return (
    <>
      <BackgroundImage imgSrc={snackImg} title='PAYMENT' />
      <OrderCheckoutContainer>
        <div className='amount'>Payment Amount</div>
        <h1>&#8361; {`${subtotalPrice.toLocaleString()}`}</h1>
        <div className='alert'>
          <AlertIcon />
          This is a test payment. No actual payment will be processed.
        </div>
        <div id="payment-widget" />
        <div id="agreement" />
        <button
          onClick={async () => {
            const paymentWidget = paymentWidgetRef.current;

            try {
              await paymentWidget?.requestPayment({
                orderId: nanoid(),
                orderName: "Korean snacks",
                customerName: "",
                customerEmail: "",
                failUrl: `${window.location.origin}/order/fail`,
                successUrl: `${window.location.origin}/order/success?${params}`,
              });
            } catch (error) {
              console.error('Failed to payment', error);
            }
          }}
        >
          MAKE A PAYMENT
        </button>
      </OrderCheckoutContainer>
    </>
  );
}
