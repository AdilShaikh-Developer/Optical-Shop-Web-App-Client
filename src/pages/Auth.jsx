import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateUser, fetchUser } from "../app/actions/user";
import { auth } from "../firebase-auth";

// Importing Components
import { Link } from "react-router-dom";

// Importing Icons
import { FcGoogle } from "react-icons/fc";

// Importing Stylesheet's
import "../styles/auth.scss";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      await authenticateUser(user);
      await fetchUser(dispatch, user.uid);
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
