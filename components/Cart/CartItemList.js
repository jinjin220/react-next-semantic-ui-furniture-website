import { Header, Segment, Button, Icon } from "semantic-ui-react";

const CartItemList = () => {
  const user = true;

  return (
    <Segment textAlign="center">
      <Header icon as="h3">
        <Icon inverted color="grey" name="shopping basket" />
        Nothing in your basket yet.
      </Header>
      <div>
        {user ? (
          <Button color="orange">View Products</Button>
        ) : (
          <Button color="blue">Login to Add Products</Button>
        )}
      </div>
    </Segment>
  );
};

export default CartItemList;
