// Importing Modules
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-auth";
import { useDispatch, useSelector } from "react-redux";

// Importing React Icons
import { CiLogin, CiShop } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { CiUser, CiLogout, CiSettings, CiShoppingCart } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { userLogout } from "../app/reducers/user";

const Navbar = ({ user }) => {
  const [profileMenu, setProfileMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      setProfileMenu(false);
      dispatch(userLogout());
      navigate("/");
      toast.success("loged out successfullly");
    } catch (error) {
      setProfileMenu(false);
      toast.error("logout failed");
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          {/* this logo can be updated by admin  */}
          <img
            src={`${import.meta.env.VITE_SERVER}/uploads/logo.png`}
            alt="shop logo"
          />
        </Link>

        <ul>
          <li>
            <Link to="/shop">
              <CiShop />
            </Link>
          </li>
          {user ? (
            <li onClick={() => setProfileMenu(!profileMenu)}>
              {user.photo ? <img src={user.photo} /> : <CgProfile />}
              {/* <CgProfile /> */}
            </li>
          ) : (
            <li>
              <Link to="/auth">
                <CiLogin />
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {user && profileMenu ? (
        <div className="profile-menu">
          <div className="profile">
            <Link>
              {user && user.photo ? (
                <img src={user.photo} alt="" />
              ) : (
                <CiUser />
              )}
            </Link>
            <div className="profile-details">
              <h3>{user.name}</h3>
              <span>{user.email}</span>
            </div>
          </div>
          <ul>
            {user.role === "admin" ? (
              <li>
                <Link
                  to={"/admin/dashboard"}
                  onClick={() => setProfileMenu(!profileMenu)}
                >
                  <MdDashboard /> Admin Dashboard
                </Link>
              </li>
            ) : (
              ""
            )}

            <li>
              <Link
                to={`/user/${user._id}`}
                onClick={() => setProfileMenu(!profileMenu)}
              >
                <IoAnalyticsOutline /> Profile Activity
              </Link>
            </li>
            <li>
              <Link
                to={"/user/cart-items"}
                onClick={() => setProfileMenu(!profileMenu)}
              >
                <CiShoppingCart /> Manage Cart
              </Link>
            </li>
            <li>
              <Link
                to={"/help-center"}
                onClick={() => setProfileMenu(!profileMenu)}
              >
                <IoIosHelpCircleOutline /> Help Center
              </Link>
            </li>
            <li>
              <Link
                // onClick={logoutHandler}
                onClick={logoutHandler}
              >
                <CiLogout /> Logout
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
