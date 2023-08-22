"use client"

import { useAuth0 } from "@auth0/auth0-react";

function SignInButton() {
    const {loginWithRedirect} = useAuth0();

    const signIn = () => {
        loginWithRedirect();
    }
    return ( 
        <button className="btn btn-primary btn-wide" onClick={signIn}>SIGN IN</button>
     );
}

export default SignInButton;