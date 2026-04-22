import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      toast.success("Login successful with Google!");
      navigate("/"); // redirect wherever you want after login
    } else {
      toast.error("No token found!");
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return <div>Authenticating... please wait</div>;
}

export default AuthSuccess;
