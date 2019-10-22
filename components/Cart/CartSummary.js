import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Divider, Segment, Button } from "semantic-ui-react";
import calculateCartTotal from "../../utils/calculateCartTotal";

const CartSummary = ({ products, handleCheckout, success }) => {
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [isCartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Subtotal:</strong> ￡{cartAmount}
        <StripeCheckout
          name="Muebler"
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="GBP"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          stripeKey="pk_test_EucVl5u9w5aYbkzlnKSqRPTh00YTvZMMNV"
          token={handleCheckout}
          triggerEvent="onClick"
        >
          <Button
            disabled={isCartEmpty || success}
            icon="cart"
            color="black"
            floated="right"
            content="Checkout"
          />
        </StripeCheckout>
      </Segment>
    </>
  );
};

export default CartSummary;
