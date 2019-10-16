import { Divider, Segment, Button } from "semantic-ui-react";

const CartSummary = () => {
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Subtotal:</strong> $0.00
        <Button icon="cart" color="black" floated="right" content="Checkout" />
      </Segment>
    </>
  );
};

export default CartSummary;
