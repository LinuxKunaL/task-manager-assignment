import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  publicComponent?: boolean;
};

function ProtectRoute({ children, publicComponent }: Props) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!publicComponent && !token) {
      navigate("/login");
    }
  }, [publicComponent, token, navigate]);

  if (publicComponent || token) {
    return <>{children}</>;
  }

  return null;
}

export default ProtectRoute;
