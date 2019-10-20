import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

const Cart = ({ products, user }) => {
  console.log({ products });
  return (
    <Segment>
      <CartItemList user={user} products={products} />
      <CartSummary products={products} />
    </Segment>
  );
};

Cart.getInitialProps = async ctx => {
  // make sure that only authenticated users that have a token, can get access to their cart and no one else
  const { token } = parseCookies(ctx);

  if (!token) {
    return { products: [] };
  }

  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get(url, payload);
  console.log("response data:", response.data);
  return { products: response.data };
};

export default Cart;
