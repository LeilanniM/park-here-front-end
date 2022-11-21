import React from "react";
import UserItem from "./UserItem";
import "./UsersList.css";

const UsersList = (props) => {
  let usersList;
  if (props.users.length === 0) {
    usersList = (
      <div>
        <h2>No users found...</h2>
      </div>
    );
  } else
    usersList = props.users.map((user) => {
      return <UserItem key={user.id} {...user} />;
    });
  return <ul>{usersList}</ul>;
};

export default UsersList;
