import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext({
  email: "",
  user: {},
  userId: "",
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
    userId: "",
    token: "",
  });

  function login(email, token) {
    const tokenData = jwtDecode(token);
    setAuthState({
      email: email,
      user: tokenData.user,
      userId: tokenData.user.id,
      token: token,
    });
  }

  function logout() {
    setAuthState({
      email: "",
      user: {},
      userId: "",
      token: "",
    });
  }

  const isUserLoggedIn = !!authState.token;

  let isUserAdmin = false;
  if (isUserLoggedIn) {
    const tokenData = jwtDecode(authState.token);
    isUserAdmin = !!(
      tokenData.user.hasOwnProperty("scope") && tokenData.user.scope === "admin"
    );
  }

  const ctxValue = {
    isUserLoggedIn,
    isUserAdmin,
    token: authState.token,
    email: authState.email,
    userId: authState.userId,
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
