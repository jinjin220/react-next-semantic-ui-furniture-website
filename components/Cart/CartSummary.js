import { useState, useEffect } from "react";
import { Divider, Segment, Button } from "semantic-ui-react";
import calculateCartTotal from "../../utils/calculateCartTotal";

const CartSummary = ({ products }) => {
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
        <Button
          disabled={isCartEmpty}
          icon="cart"
          color="black"
          floated="right"
          content="Checkout"
        />
      </Segment>
    </>
  );
};

export default CartSummary;
