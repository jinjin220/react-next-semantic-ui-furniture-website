import { useState } from "react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

const Cart = ({ products, user }) => {
  const [cartProducts, setCartProducts] = useState(products);

  const handleRemoveFromCart = async productId => {
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get("token");
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    };
    const response = await axios.delete(url, payload);
    console.log("RESPONSE from handleRemoveFromCart:", response);
    setCartProducts(response.data);
  };

  return (
    <Segment>
      <CartItemList
        handleRemoveFromCart={handleRemoveFromCart}
        user={user}
        products={cartProducts}
      />
      <CartSummary products={cartProducts} />
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
