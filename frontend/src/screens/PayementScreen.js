import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePayementMethod, saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const PayementScreen = ({history}) => {
    const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if(!shippingAddress){
      history.push('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayementMethod({ paymentMethod }));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
      <h1>Payement Method</h1>
      <Form onSubmit={submitHandler}>
       <Form.Group>
           <Form.Label as='legend'>
Select Payement Method
           </Form.Label>
       </Form.Group>
       <Col>
       <Form.Check type='radio' label='Paypal or credit card' id='Paypal'
       name='paymentMethod' value='Paypal' checked onChange={(e) =>setPaymentMethod(e.target.value)}></Form.Check>
       </Col>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PayementScreen
