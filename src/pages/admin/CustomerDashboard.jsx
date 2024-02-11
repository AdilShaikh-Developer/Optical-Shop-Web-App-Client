import { useEffect, useState } from "react";
import TableHOC from "../../components/admin/TableHOC";
import Navbar from "../../components/admin/Navbar";

import "../../styles/admin/admin.scss";
import "../../styles/admin/products.scss";
import { useSelector } from "react-redux";

const columns = [
  {
    Header: "Profile",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "User Tenure",
    accessor: "userTenure",
  },
];

const CustomerDashboard = () => {
  const data = useSelector((state) => state.admin.dashboardCustomers);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data)
      setRows(
        data.map((i) => ({
          photo: <img src={i.photo} style={{ borderRadius: "50%" }} />,
          name: i.name,
          email: i.email,
          role: i.role,
          userTenure:
            Math.ceil(
              Math.abs(new Date() - new Date(i.createdAt)) /
                (1000 * 60 * 60 * 24)
            ) -
            1 +
            " Days",
        }))
      );
  }, [data]);

  const Table = TableHOC(
    columns,
    rows,
    "dashboard-product-box",
    rows.length > 5
  )();

  return (
    <div className="admin-dashboard-page">
      <Navbar />
      <h2 className="heading">Customer Management</h2>

      <main className="products-table-container">{Table}</main>
    </div>
  );
};

export default CustomerDashboard;
