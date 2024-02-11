import { GoAlertFill } from "react-icons/go";

const ConfirmDialog = () => {
  const deleteProduct = async (e) => {};
  return (
    <div className="confirmation-dailog-box">
      <GoAlertFill />
      <p>Are you sure you want to delete this product?</p>
      <section>
        <button onClick={deleteProduct}>Yes</button>
        <button>No</button>
      </section>
    </div>
  );
};

export default ConfirmDialog;
