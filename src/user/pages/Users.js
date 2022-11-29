import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState(() => null);
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

  useEffect(() => {
    fetch(`http://localhost:8080/users/`).then((res) => {
      if (!res.ok) {
        console.error("could not fetch users. :O");
        return;
      }
      return res.json().then((users) => {
        console.log(users);
        setLoadedUsers(users);
      });
    });
  }, []);

  return (
    <div>
      {loadedUsers ? <UsersList users={loadedUsers} /> : <h2>Loading...</h2>}
    </div>
  );
};

export default Users;
