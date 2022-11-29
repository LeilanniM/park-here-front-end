import React from "react";
import { Link } from "react-router-dom";

const User = (props) => {
  console.log(props);
  const { firstName, lastName, image, bookings, parkings, id } = props.user;

  let userPage = props.user ? (
    <div className="user-page">
      <h1>Dashboard</h1>
      <h2>
        {firstName} {lastName}
      </h2>
      <img src={image} />
      <h3>My Bookings</h3>
      {bookings.length > 0
        ? bookings.map((bk) => (
            <li key={bk}>
              <Link to={`/bookings/${bk}`}>{bk}</Link>
            </li>
          ))
        : "No Bookings found"}

      <h3>My Parking Spots</h3>
      {parkings.length > 0
        ? parkings.map((prk) => (
            <li className="user-page-parking-item" key={prk}>
              <Link to={`/parkings/${prk}`}>{prk}</Link>
            </li>
          ))
        : "No parkings found"}
    </div>
  ) : (
    <h1>Loading...</h1>
  );

  return userPage;
};

export default User;

{
  /* {
    "id": "63855dd33507ba88c98d5bb5",
    "firstName": "Lany",
    "lastName": "Levelup",
    "email": "landu@gmail.com",
    "image": "https://i.ibb.co/mS5PVmX/d7587471c7ce.png",
    "parkings": [
        "63855e453507ba88c98d5bbe",
        "63855f983507ba88c98d5bcf",
        "63863d75aaf446b63ddb61ba",
        "638640d8aaf446b63ddb61c6"
    ],
    "bookings": [],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg1NWRkMzM1MDdiYTg4Yzk4ZDViYjUiLCJlbWFpbCI6ImxhbmR1QGdtYWlsLmNvbSIsImlhdCI6MTY2OTc0NzMwNH0.RJaZynt32u2sYWiBvXBWcWUkHCiIoFhcHaAU7atskk8"
} */
}
