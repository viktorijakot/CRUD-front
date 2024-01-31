import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext({
  email: "",
  user: {},
  token: "",
  login(email, token) {},
  logout() {},
  isUserLoggedIn: false,
  isUserAdmin: false,
});

export default function AuthCtxProvider({ children }) {
  const [authState, setAuthState] = useState({
    email: "",
    user: {},
    token: "",
  });

  function login(email, token) {
    const tokenData = jwtDecode(token);
    setAuthState({
      email: email,
      user: tokenData.user,
      token: token,
    });
    console.log("authstate ===", authState);
  }

  function logout() {
    setAuthState({
      email: "",
      user: {},
      token: "",
    });
  }

  const isUserLoggedIn = !!authState.token;

  let isUserAdmin = false;
  if (isUserLoggedIn) {
    const tokenData = jwtDecode(authState.token);
    isUserAdmin = !!(
      tokenData.hasOwnProperty("scope") && tokenData.scope === "admin"
    );
  }

  const ctxValue = {
    isUserLoggedIn,
    isUserAdmin,
    token: authState.token,
    email: authState.email,
    user: authState.user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
