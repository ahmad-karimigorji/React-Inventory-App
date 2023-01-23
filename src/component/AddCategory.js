import { useRef, useState } from "react";

const AddCategory = ({ postCategoryHandler }) => {
  const [category, setCategory] = useState({ title: "", description: "" });
  const [isShow, setIsShow] = useState(false);
  const titleError = useRef();
  const descriptionError = useRef();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    for (const key in category) {
      switch (key) {
        case "title":
          !category[key] && (titleError.current.innerText = "Title is Require");
          break;
        case "description":
          !category[key] &&
            (descriptionError.current.innerText = "Description is Require");
          break;

        default:
          break;
      }
    }
    for (const key in category) {
      if (!category[key]) return;
    }
    postCategoryHandler({ ...category, id: new Date().getTime() });

    cancelBtnHandler();
  };

  const cancelBtnHandler = () => {
    setCategory({
      title: "",
      description: "",
    });

    titleError.current.innerText = "";
    descriptionError.current.innerText = "";

    setIsShow(false);
  };
  return (
    <div>
      <h2
        className={`${
          isShow ? "hidden" : ""
        } font-bold text-xl text-slate-300 mb-2 hover:cursor-pointer`}
        onClick={() => setIsShow(true)}
      >
        Add New Category ?
      </h2>
      <div className={`${isShow ? "" : "hidden"} p-3 bg-slate-500 rounded-md`}>
        <form className="space-y-3" onSubmit={submitHandler}>
          <div className="flex flex-col space-y-1">
            <label className="text-slate-300 font-semibold" htmlFor="title">
              Category Title
            </label>
            <input
              name="title"
              id="title"
              value={category.title}
              onChange={changeHandler}
              className="w-52 px-3 py-1.5 outline-none border-2 border-slate-400 rounded-md bg-transparent text-slate-300"
              placeholder="Category Title..."
              type="text"
            />
            <p ref={titleError} className="text-red-300 text-sm"></p>
          </div>
          <div className="flex flex-col space-y-1">
            <label
              className="text-slate-300 font-semibold"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={category.description}
              onChange={changeHandler}
              className="w-full px-3 py-1.5 outline-none border-2 border-slate-400 rounded-md bg-transparent text-slate-300 resize-none"
              placeholder="Description..."
              type="text"
            ></textarea>
            <p ref={descriptionError} className="text-red-300 text-sm"></p>
          </div>
          <div className="flex flex-col space-y-2 space-x-0 sm:flex-row sm:space-y-0">
            <button
              className="border border-slate-300 rounded-md py-1 bg-slate-300 text-black font-semibold sm:w-1/2 sm:order-1 sm:ml-2"
              type="submit"
            >
              Add Category
            </button>
            <button
              className="border border-slate-300 text-slate-300 rounded-md py-1 font-semibold sm:w-1/2"
              type="button"
              onClick={cancelBtnHandler}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
