import "../styles/app.scss";

export const SkeletonLoader = ({ width = "unset", length = 3 }) => {
  const skeletions = Array.from({ length }, (_, idx) => (
    <div key={idx} className="skeleton-shape"></div>
  ));

  return (
    <div className="skeleton-loader" style={{ width }}>
      {skeletions}
    </div>
  );
};

export default SkeletonLoader;
