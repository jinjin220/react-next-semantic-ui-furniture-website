import { useState, useEffect } from "react";
import { Header, Segment, Checkbox, Table, Icon } from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";

const AccountPermissions = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const url = `${baseUrl}/api/users`;
    const token = cookie.get("token");
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    setUsers(response.data);
  }

  return (
    <div style={{ margin: "4em 0" }}>
      <Segment color="teal">
        <Header as="h3">User Permissions</Header>
      </Segment>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <UserPermission key={user._id} user={user} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const UserPermission = ({ user }) => (
  <Table.Row>
    <Table.Cell>
      <Checkbox toggle />
    </Table.Cell>
    <Table.Cell>{user.name}</Table.Cell>
    <Table.Cell>{user.email}</Table.Cell>
    <Table.Cell>{user.createdAt}</Table.Cell>
    <Table.Cell>{user.updatedAt}</Table.Cell>
    <Table.Cell>{user.role}</Table.Cell>
  </Table.Row>
);

export default AccountPermissions;
