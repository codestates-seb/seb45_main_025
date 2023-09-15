// TODO: order api 요청
// TODO: user info 받아오기 (이름, 이메일)
import { useRef, useEffect, useState } from "react";
import {
  // PaymentWidgetInstance, 
  loadPaymentWidget,
  // ANONYMOUS 
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { OrderCheckoutContainer } from './OrderCheckout.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import snackImg from '../../common/image/main-image.png';
import { useSelector } from 'react-redux';
import { ReactComponent as AlertIcon } from '../../common/image/Icons/alert.svg';

const selector = "#payment-widget";
const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
const customerKey = "YbX2HuSlsC9uVJW6NMRMj";

export default function OrderCheckout() {
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const subtotalPrice = useSelector((state) => state.cart.subtotalPrice);
  const [price, setPrice] = useState(subtotalPrice);

  useEffect(() => {
    (async () => {
      // ------  결제위젯 초기화 ------
      // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제
      // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 결제

      // ------  결제위젯 렌더링 ------
      // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: price }
      );
      console.log(123, paymentMethodsWidget);

      // ------  이용약관 렌더링 ------
      // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
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

    // ------ 금액 업데이트 ------
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]);

  return (
    <>
      <BackgroundImage imgSrc={snackImg} title='ACCOUNT' />
      <OrderCheckoutContainer>
        <h1>PAYMENT</h1>
        <div className='alert'>
          <AlertIcon />
          This is a test payment. No actual payment will be processed.
        </div>
        <span>&#8361; {`${price.toLocaleString()}`}</span>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={(event) => {
                setPrice(event.target.checked ? price - 5000 : price + 5000);
              }}
            />
            Apply &#8361; 5,000 discount coupon
          </label>
        </div>
        <div id="payment-widget" />
        <div id="agreement" />
        <button
          onClick={async () => {
            const paymentWidget = paymentWidgetRef.current;

            try {
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
              await paymentWidget?.requestPayment({
                orderId: nanoid(),
                orderName: "Korean snacks",
                customerName: "김땡떙",
                failUrl: `${window.location.origin}/order/fail`,
                successUrl: `${window.location.origin}/order/success`,
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          MAKE A PAYMENT
        </button>
      </OrderCheckoutContainer>
    </>
  );
}
