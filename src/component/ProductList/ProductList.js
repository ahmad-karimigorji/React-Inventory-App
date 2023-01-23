import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi";
import EditProduct from "../EditProduct";

const ProductList = ({
  products,
  deleteProductHandler,
  categories,
  putProductHandler,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const modalHandler = (product) => {
    setIsShow(true);
    setSelectedProduct(product);
  };

  return (
    <div>
      <h2 className="font-bold text-xl text-slate-300 mb-2">Products List</h2>
      <div className="space-y-1 px-3">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            deleteProductHandler={() => deleteProductHandler(product.id)}
            modalHandler={() => modalHandler(product)}
          />
        ))}
      </div>
      {isShow && (
        <Modal
          setIsShow={setIsShow}
          selectedProduct={selectedProduct}
          categories={categories}
          putProductHandler={putProductHandler}
        />
      )}
    </div>
  );
};

export default ProductList;

const Product = ({ product, modalHandler, deleteProductHandler }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-max flex justify-between items-center text-slate-300">
        <div className="flex items-center">
          <span className="font-semibold">{product.title}</span>
          <span className="flex justify-center items-center border border-slate-300 rounded-full w-5 h-5 ml-2 text-sm mr-1">
            {product.quantity}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm space-x-2 sm:space-x-5">
          <span>{`${new Date(product.AtCreate).toLocaleString("fa", {
            year: "numeric",
            month: "long",
          })}`}</span>
          <span className="border rounded-xl px-2 py-0.5">
            {product.selectCategory.title}
          </span>
          <div className="flex space-x-1.5">
            <button className="flex text-blue-300" onClick={modalHandler}>
              <CiEdit />
            </button>
            <button
              className="flex text-red-300"
              onClick={deleteProductHandler}
            >
              <HiOutlineTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = ({
  setIsShow,
  selectedProduct,
  categories,
  putProductHandler,
}) => {
  return (
    <>
      <div className="w-64 sm:w-96 fixed top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
        <EditProduct
          selectedProduct={selectedProduct}
          categories={categories}
          putProductHandler={putProductHandler}
          setIsShow={setIsShow}
        />
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-slate-400/50 z-10"
        onClick={() => setIsShow(false)}
      ></div>
    </>
  );
};
