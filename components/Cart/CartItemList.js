import { useRouter } from "next/router";
import { Header, Segment, Item, Button, Icon } from "semantic-ui-react";

const CartItemList = ({ products, user, handleRemoveFromCart }) => {
  const router = useRouter();

  const mapCartProductsToItems = products => {
    return products.map(p => ({
      childKey: p.product._id,
      header: (
        <Item.Header
          as="a"
          onClick={() => router.push(`/product?_id=${p.product._id}`)}
        >
          {p.product.name}
        </Item.Header>
      ),
      image: p.product.mediaUrl,
      meta: `${p.quantity} x ￡${p.product.price}`,
      fluid: "true",
      extra: (
        <Button
          basic="true"
          icon="remove"
          floated="right"
          onClick={() => handleRemoveFromCart(p.product._id)}
        />
      )
    }));
  };

  if (products.length === 0) {
    return (
      <Segment textAlign="center">
        <Header icon as="h3">
          <Icon inverted color="grey" name="shopping basket" />
          Nothing in your basket yet.
        </Header>
        <div>
          {user ? (
            <Button color="orange" onClick={() => router.push("/")}>
              View Products
            </Button>
          ) : (
            <Button color="blue" onClick={() => router.push("/login")}>
              Login to Add Products
            </Button>
          )}
        </div>
      </Segment>
    );
  }

  return <Item.Group divided="true" items={mapCartProductsToItems(products)} />;
};

export default CartItemList;
