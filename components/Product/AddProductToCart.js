import {
  useState,
  useEffect
} from "react";
import {
  useRouter
} from "next/router";
import {
  Input,
  Modal,
  ModalHeader,
  Button
} from "semantic-ui-react";

import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import cookie from "js-cookie";

const AddProductToCart = ({
  user,
  productId
}) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timeout;

    if (success) {
      timeout = setTimeout(() => setSuccess(false), 2000);
    }

    return () => clearTimeout(timeout);
  }, [success]);

  const handleAddProductToCart = async () => {
    try {
      setLoading(true);

      const url = `${baseUrl}/api/cart`;
      const payload = {
        quantity,
        productId
      };
      const token = cookie.get("token");
      const headers = {
        headers: {
          Authorization: token
        }
      };

      await axios.put(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, () => {
        if (error) setModal(true);
      });
    } finally {
      setLoading(false);
    }
  };

  return ( <
    >
    <
    Input type = "number"
    min = "1"
    value = {
      quantity
    }
    onChange = {
      event => setQuantity(Number(event.target.value))
    }
    placeholder = "Quantity"
    action = {
      user && success ?
      {
        color: "blue",
        content: "Product Added!",
        icon: "plus cart",
        disabled: true
      } :
        user ?
        {
          color: "orange",
          content: "Add to Cart",
          icon: "plus cart",
          loading,
          disabled: loading,
          onClick: handleAddProductToCart
        } :
        {
          color: "blue",
          content: "Login to Add Items",
          icon: "plus cart",
          onClick: () => router.push("/login")
        }
    }
    /> <
    Modal open = {
      modal
    }
    dimmer = "inverted" >
    <
    ModalHeader > Something went wrong! < /ModalHeader> <
    Modal.Content >
    <
    h4 > Please login again < /h4> <
    /Modal.Content> <
    Modal.Actions >
    <
    Button color = "blue"
    onClick = {
      () => setModal(false)
    }
    content = "OK" / >
    <
    /Modal.Actions> <
    /Modal> <
    />
  );
};

export default AddProductToCart;