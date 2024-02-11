import Navbar from "../../components/admin/Navbar";
import { DoughnutChart, LineChart } from "../../components/admin/Charts";
import moment from "moment";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";

import "../../styles/admin/admin.scss";
import "../../styles/admin/dashboard.scss";
import { useEffect } from "react";
import {
  fetchAdminDashboardStats,
  fetchDashboardProducts,
} from "../../app/actions/admin-dashboard";
import { useSelector, useDispatch } from "react-redux";
import SkeletonLoader from "../../components/SkeletonLoader.jsx";

const Dashboard = () => {
  const { loading, dashboardStats } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  const getLastMonths = () => {
    const currentDate = moment();

    currentDate.date(1);

    const last6Months = [];
    const last12Months = [];

    for (let i = 0; i < 6; i++) {
      const monthDate = currentDate.clone().subtract(i, "months");
      const monthName = monthDate.format("MMMM");
      last6Months.unshift(monthName);
    }

    for (let i = 0; i < 12; i++) {
      const monthDate = currentDate.clone().subtract(i, "months");
      const monthName = monthDate.format("MMMM");
      last12Months.unshift(monthName);
    }

    return {
      last12Months,
      last6Months,
    };
  };

  const { last12Months: months } = getLastMonths();

  return (
    <div className="admin-dashboard-page">
      <Navbar />
      {dashboardStats ? (
        <>
          <section className="widget-container">
            <WidgetItem
              percent={dashboardStats.stats.changePercent.user}
              value={dashboardStats.stats.count.user}
              heading="Users"
              color="rgb(0, 115, 255)"
            />
            <WidgetItem
              percent={dashboardStats.stats.changePercent.product}
              value={dashboardStats.stats.count.product}
              heading="Products"
              color="rgb(76 0 255)"
            />
          </section>
          <section className="graph-container">
            <div className="dashboard-categories">
              <h2>Inventory</h2>
              <div>
                {dashboardStats.stats.categoryCount.map((i) => {
                  const [heading, value] = Object.entries(i)[0];
                  return (
                    <CategoryItem
                      key={heading}
                      value={value}
                      heading={heading}
                      color={`hsl(${value * 4}, ${value}%, 50%)`}
                    />
                  );
                })}
              </div>
            </div>
          </section>
          <div className="chart-container">
            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[
                    dashboardStats.stats.stockAvailability.available,
                    dashboardStats.stats.stockAvailability.unavailable,
                  ]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  cutout={"70%"}
                />
              </div>
              <h2> Stock Availability</h2>
            </section>
            <section>
              <LineChart
                data={dashboardStats.chart.users}
                label="Users"
                borderColor="rgb(53, 162, 255)"
                labels={months}
                backgroundColor="rgba(53, 162, 255, 0.5)"
              />
              <h2>Active Users</h2>
            </section>

            <section>
              <LineChart
                data={dashboardStats.chart.products}
                backgroundColor={"hsla(269,80%,40%,0.4)"}
                borderColor={"hsl(269,80%,40%)"}
                labels={months}
                label="Products"
              />
              <h2>Total Products (SKU)</h2>
            </section>
          </div>
        </>
      ) : (
        <SkeletonLoader length={15} />
      )}
    </div>
  );
};

const WidgetItem = ({ heading, value, percent, color }) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{`${percent > 10000 ? 9999 : percent}%`}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {`${percent < -10000 ? -9999 : percent}%`}
        </span>
      )}
    </div>
    <div
      className="widget-circle"
      style={{
        background: `conic-gradient(${color} ${
          (Math.abs(percent) / 100) * 360
        }deg, rgb(255,255,255) 0 )`,
      }}
    >
      <span style={{ color }}>
        {percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
        {percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
      </span>
    </div>
  </article>
);

const CategoryItem = ({ color, value, heading }) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default Dashboard;
