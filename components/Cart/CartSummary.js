import { useState, useEffect } from "react";
import { Divider, Segment, Button } from "semantic-ui-react";

const CartSummary = ({ products }) => {
  const [isCartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    setCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Subtotal:</strong> $0.00
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
