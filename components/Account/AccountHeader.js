import { Header, Icon, Segment, Label } from "semantic-ui-react";
import formatDate from "../../utils/formatDate";

const AccountHeader = ({ role, email, name, createdAt }) => {
  return (
    <Segment secondary inverted color="black">
      <Label
        color="teal"
        size="large"
        ribbon
        icon="privacy"
        style={{ textTransform: "capitalize" }}
        content={role}
      />
      <Header inverted textAlign="center" icon>
        <Icon name="user" />
        {name}
        <Header.Subheader style={{ padding: "1em" }}>{email}</Header.Subheader>
        <Header.Subheader>Joined {formatDate(createdAt)}</Header.Subheader>
      </Header>
    </Segment>
  );
};

export default AccountHeader;
