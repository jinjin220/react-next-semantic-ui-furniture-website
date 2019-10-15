import { useState } from "react";
import {
  Header,
  Icon,
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message
} from "semantic-ui-react";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
};

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState();
  const [message, setMessage] = useState(false);

  const { name, price, description } = product;

  const handleChange = event => {
    const { name, value, files } = event.target;
    if (name === "media") {
      setProduct(prevState => ({
        ...prevState,
        media: files[0]
      }));

      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(product);
    setProduct(INITIAL_PRODUCT);
    setMessage(true);
    setTimeout(() => setMessage(false), 3000);
  };

  return (
    <>
      <Header as="h3" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form success={message} onSubmit={handleSubmit}>
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been created!"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            value={name}
            placeholder="Name"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            value={price}
            placeholder="Price"
            type="number"
            min="0.00"
            step="0.01"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            label="Media"
            content="Select Image"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rouded centered size="medium" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          value={description}
          placeholder="Description"
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateProduct;
