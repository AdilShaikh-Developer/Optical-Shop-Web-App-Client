import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-auth";

// Importing Components
import { Link } from "react-router-dom";

// Importing Icons
import { FcGoogle } from "react-icons/fc";

// Importing Stylesheet's
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/auth.scss";
import { authenticateUser } from "../app/actions/user";

const Auth = () => {
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      authenticateUser(user);
      navigate("/");
    } catch (error) {
      toast.error("Authentication Failed");
    }
  };

  return (
    <div className="auth-container">
      <FcGoogle />
      <Link className="auth-button-container" onClick={loginHandler}>
        <FcGoogle /> Sign in with Google
      </Link>
    </div>
  );
};

export default Auth;
