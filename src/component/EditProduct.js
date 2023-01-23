import { useEffect, useRef, useState } from "react";

const EditProduct = ({
  categories,
  selectedProduct,
  putProductHandler,
  setIsShow,
}) => {
  const [product, setProduct] = useState({
    title: "",
    quantity: "",
    selectCategory: "",
  });
  const titleError = useRef();
  const quantityError = useRef();
  const selectError = useRef();

  useEffect(() => {
    setProduct({
      ...selectedProduct,
      selectCategory: selectedProduct.selectCategory.id,
    });
  }, []);

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    for (const key in product) {
      switch (key) {
        case "title":
          !product[key] && (titleError.current.innerText = "Title is Require");
          break;
        case "quantity":
          !product[key] &&
            (quantityError.current.innerText = "Quantity is Require");
          break;
        case "selectCategory":
          !product[key] &&
            (selectError.current.innerText = "Select Category is Require");
          break;

        default:
          break;
      }
    }
    for (const key in product) {
      if (!product[key]) return;
    }
    const filteredCategory = categories.find(
      (item) => item.id === parseInt(product.selectCategory)
    );

    const data = {
      ...product,
      AtCreate: new Date().toISOString(),
      selectCategory: filteredCategory,
    };

    putProductHandler(data.id, data);
    setIsShow(false);
  };

  return (
    <div className="p-3 bg-slate-500 rounded-md">
      <form className="space-y-3" onSubmit={submitHandler}>
        <div className="flex flex-col space-y-1">
          <label className="text-slate-300 font-semibold" htmlFor="editTitle">
            Product Title
          </label>
          <input
            name="title"
            id="editTitle"
            value={product.title}
            onChange={changeHandler}
            className="w-52 px-3 py-1.5 outline-none border-2 border-slate-400 rounded-md bg-transparent text-slate-300"
            placeholder="Product Title..."
            type="text"
          />
          <p ref={titleError} className="text-red-300 text-sm"></p>
        </div>
        <div className="flex flex-col space-y-1">
          <label
            className="text-slate-300 font-semibold"
            htmlFor="editQuantity"
          >
            Quantity
          </label>
          <input
            name="quantity"
            id="editQuantity"
            value={product.quantity}
            onChange={changeHandler}
            className="w-full px-3 py-1.5 outline-none border-2 border-slate-400 rounded-md bg-transparent text-slate-300 resize-none"
            placeholder="Quantity..."
            type="number"
            min="1"
          />
          <p ref={quantityError} className="text-red-300 text-sm"></p>
        </div>
        <div className="flex flex-col space-y-1">
          <label
            className="text-slate-300 font-semibold"
            htmlFor="editSelectCategory"
          >
            Quantity
          </label>
          <select
            name="selectCategory"
            id="editSelectCategory"
            value={product.selectCategory}
            onChange={changeHandler}
            className="w-full px-3 py-1.5 outline-none border-2 border-slate-400 rounded-md bg-transparent text-slate-300 resize-none"
          >
            <option className="text-black" value="">
              Select Category...
            </option>
            {categories &&
              categories.map((item) => (
                <option className="text-black" key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
          </select>
          <p ref={selectError} className="text-red-300 text-sm"></p>
        </div>
        <div
          className={`flex flex-col space-y-2 space-x-0 sm:flex-row sm:space-y-0`}
        >
          <button
            className={`sm:w-1/2 sm:order-1 sm:ml-2 w-full border border-slate-300 rounded-md py-1 bg-slate-300 text-black font-semibold`}
            type="submit"
          >
            Update Product
          </button>
          <button
            className="border border-slate-300 text-slate-300 rounded-md py-1 font-semibold sm:w-1/2"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
