import React from "react";
import { map, isEmpty } from "lodash";
import UserByUser from "./UserByUser";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { users } = props;

  if (isEmpty(users)) {
    return (
    <div className="list-users">
      <h2>No hay resultados</h2>
    </div>
    );
  }

  return (
    <ul className="list-users">
      {map(users, (user) => (
        <UserByUser key={user.id} user={user} />
      ))}
    </ul>
  );
}
