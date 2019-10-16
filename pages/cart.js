import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { Segment } from "semantic-ui-react";

const Cart = () => {
  return (
    <Segment>
      <CartItemList />
      <CartSummary />
    </Segment>
  );
};

export default Cart;
