import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";

export default function ResolveAuthScreen() {
  const { checkLocalAuthToken } = useContext(AuthContext);

  useEffect(() => {
    checkLocalAuthToken();
  }, []);

  return null;
}
