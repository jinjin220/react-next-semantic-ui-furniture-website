import {
  Header,
  Divider,
  Accordion,
  Label,
  Segment,
  Button,
  List,
  Image
} from "semantic-ui-react";
import { useRouter } from "next/router";

const AccountOrders = ({ orders }) => {
  const router = useRouter();

  const mapOrdersToPanels = orders => {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color="brown" basic content={order.createdAt} />
      },
      content: {
        content: (
          <>
            <List.Header as="h4">
              Total: ${order.total}
              <Label
                content={order.email}
                icon="mail"
                basic
                horizontal
                style={{ marginLeft: "1em" }}
              />
            </List.Header>
            <List>
              {order.products.map(p => (
                <List.Item>
                  <Image size="tiny" src={p.product.mediaUrl} />
                  <List.Content>
                    <List.Header href={`/product?_id=${p.product._id}`}>
                      {p.product.name}
                    </List.Header>
                    <List.Description>
                      {p.quantity} . ${p.product.price}
                    </List.Description>
                  </List.Content>
                  <List.Content floated="right">
                    <Label
                      basic
                      color="grey"
                      size="tiny"
                      href={`/product?_id=${p.product._id}`}
                    >
                      Buy it again
                    </Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
            <Divider />
          </>
        )
      }
    }));
  };

  return (
    <>
      <Segment textAlign="center">
        <Header as="h3">Order History</Header>
      </Segment>
      {orders.length === 0 ? (
        <Segment color="white" textAlign="center">
          <Header icon>No past orders.</Header>
          <div>
            <Button onClick={() => router.push("/")} color="orange">
              View Products
            </Button>
          </div>
        </Segment>
      ) : (
        <Accordion
          fluid
          styled
          exclusive={false}
          panels={mapOrdersToPanels(orders)}
        />
      )}
    </>
  );
};

export default AccountOrders;
