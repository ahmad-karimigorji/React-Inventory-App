import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi";
import EditProduct from "../EditProduct";
import Loading from "../Loading/Loading";

const ProductList = ({
  products,
  deleteProductHandler,
  categories,
  putProductHandler,
  loading,
  isShowModal,
  setIsShowModal,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [clickProductId, setClickProductId] = useState(null);

  const modalHandler = (product) => {
    setIsShowModal(true);
    setSelectedProduct(product);
  };

  return (
    <div>
      <h2 className="font-bold text-xl text-slate-300 mb-2">Products List</h2>
      <div className="space-y-1.5 px-3">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            categories={categories}
            deleteProductHandler={() => {
              deleteProductHandler(product._id);
              setClickProductId(product._id);
            }}
            modalHandler={() => modalHandler(product)}
            loading={loading}
            clickProductId={clickProductId}
          />
        ))}
      </div>
      {isShowModal && (
        <Modal
          setIsShowModal={setIsShowModal}
          selectedProduct={selectedProduct}
          categories={categories}
          putProductHandler={putProductHandler}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ProductList;

const Product = ({
  product,
  categories,
  modalHandler,
  deleteProductHandler,
  loading,
  clickProductId,
}) => {
  const category = categories.find((item) => item._id === product.categoryId);
  return (
    <div className="overflow-x-auto pb-1">
      <div className="min-w-max flex justify-between items-center text-slate-300">
        <div className="flex items-center">
          <span className="font-semibold">{product.title}</span>
          <span className="flex justify-center items-center border border-slate-300 rounded-full w-5 h-5 ml-2 text-sm mr-1">
            {product.quantity}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm space-x-2 sm:space-x-5">
          <span>{`${new Date(product.createdAt).toLocaleString("fa", {
            year: "numeric",
            month: "long",
          })}`}</span>
          <span className="border rounded-xl px-2 py-0.5">
            {category.title}
          </span>
          <div className="flex space-x-1.5">
            <button
              className="flex text-blue-300"
              onClick={modalHandler}
              disabled={loading.deleteProductLoading ? true : false}
            >
              <CiEdit />
            </button>
            {loading.deleteProductLoading && product._id === clickProductId ? (
              <Loading classStyle={"text-red-300"} />
            ) : (
              <button
                className="flex text-red-300"
                onClick={deleteProductHandler}
              >
                <HiOutlineTrash />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = ({
  setIsShowModal,
  selectedProduct,
  categories,
  putProductHandler,
  loading,
}) => {
  return (
    <>
      <div className="w-full max-w-[380px] fixed top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 px-6">
        <EditProduct
          selectedProduct={selectedProduct}
          categories={categories}
          putProductHandler={putProductHandler}
          setIsShowModal={setIsShowModal}
          loading={loading}
        />
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-slate-400/50 z-10"
        onClick={() => {
          !loading.editLoading && setIsShowModal(false);
        }}
      ></div>
    </>
  );
};
