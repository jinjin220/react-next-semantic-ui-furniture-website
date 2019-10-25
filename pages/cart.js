import { useState } from "react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import catchErrors from "../utils/catchErrors";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

const Cart = ({ products, user }) => {
  const [cartProducts, setCartProducts] = useState(products);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemoveFromCart = async productId => {
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get("token");
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    };
    const response = await axios.delete(url, payload);
    setCartProducts(response.data);
  };

  const handleCheckout = async paymentData => {
    try {
      setLoading(true);

      const url = `${baseUrl}/api/checkout`;
      const token = cookie.get("token");
      const payload = { paymentData };
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);

      setSuccess(true);
    } catch (error) {
      catchErrors(error, window.allert);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Segment loading={loading}>
      <CartItemList
        handleRemoveFromCart={handleRemoveFromCart}
        user={user}
        products={cartProducts}
        success={success}
      />
      <CartSummary
        handleCheckout={handleCheckout}
        products={cartProducts}
        success={success}
      />
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
  return { products: response.data };
};

export default Cart;
