import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const GoogleAuth = () => {
const clientId = "541430260202-f3e2uf9mse0eqoiq0pamivtf2vrg4pgo.apps.googleusercontent.com";

return (
<GoogleOAuthProvider clientId={clientId}>
<GoogleLogin
onSuccess={credentialResponse => {
console.log(credentialResponse);
}}
onError={() => {
console.log("Login Failed");
}}
/>
</GoogleOAuthProvider>
);
};

export default GoogleAuth;