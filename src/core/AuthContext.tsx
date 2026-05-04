/* eslint-disable react-refresh/only-export-components */

import { type FC, useState, createContext, useContext , type ReactNode} from "react";
import * as authHelper from "./AuthHelpers";
import type { AuthModel } from "./models";

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  logout: () => void;
};

type WithChildren = {
  children?: ReactNode;
};


const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const saveAuth = (auth: AuthModel | undefined) => {
    console.log("auth auth : " , auth)
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
  };

  return (
    <AuthContext.Provider value={{ auth, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };