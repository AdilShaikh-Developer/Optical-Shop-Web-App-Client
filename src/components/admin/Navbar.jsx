// Importing Modules
import { useState } from "react";
import { Link } from "react-router-dom";

// Importing React Icons
import { CiUser } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import { MdAnalytics, MdDashboard } from "react-icons/md";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [profileMenu, setProfileMenu] = useState(false);

  return (
    <>
      <nav className="navbar">
        <span>Welcome Mr.{user ? user.name : ""}!</span>

        <ul>
          <li onClick={() => setProfileMenu(!profileMenu)}>
            <Link>
              {user && user.photo ? (
                <img src={user.photo} alt="" />
              ) : (
                <CiUser />
              )}
            </Link>
          </li>
        </ul>
      </nav>
      {profileMenu ? (
        <div className="profile-menu">
          <ul>
            <li>
              <Link
                to={"/admin/dashboard"}
                onClick={() => setProfileMenu(false)}
              >
                <MdDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/products-dashboard"}
                onClick={() => setProfileMenu(false)}
              >
                <RiShoppingBag3Fill /> Product
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/customer-dashboard"}
                onClick={() => setProfileMenu(false)}
              >
                <IoIosPeople /> Customer
              </Link>
            </li>
            <li>
              <Link
                // to={"/admin/analytics-dashboard"}
                onClick={() => setProfileMenu(false)}
              >
                <MdAnalytics /> Analytics
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="exit-button"
                onClick={() => setProfileMenu(false)}
              >
                Exit
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
