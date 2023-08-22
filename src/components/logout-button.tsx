"use client";

import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton() {
    const {logout} = useAuth0();
    const logOutHandler = () => {
        logout();
    }
  return <button onClick={logOutHandler} className="btn btn-secondary">Log Out</button>;
}

export default LogoutButton;
