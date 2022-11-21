import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "63683ccb3ff57910b60edc36",
      name: "Amy Rose",
      image: "https://i.ibb.co/2dtXpf2/blank-avatar.webp",
    },
    {
      id: "63671d55451168b4869ced70",
      name: "Metal Sonic",
      image: "https://i.ibb.co/2dtXpf2/blank-avatar.webp",
    },
  ];
  return (
    <div>
      Users Page Works!
      <UsersList users={USERS} />
    </div>
  );
};

export default Users;
