import { useState } from "react";
import { postCategory } from "../Services/CategoryServices";

const AddCategory = () => {
  const [category, setCategory] = useState({ title: "", description: "" });

  const changeHandler = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    for (const key in category) {
      console.log(category[key]);
      if (!category[key]) {
        alert("error");
        return;
      }
    }

    postCategory({ ...category, id: new Date().getTime() })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-3 bg-slate-500 rounded-md">
      {/* <h2>Category</h2> */}
      <form className="space-y-3" onSubmit={submitHandler}>
        <div className="flex flex-col space-y-1">
          <label className="text-slate-300 font-semibold">Category Title</label>
          <input
            name="title"
            value={category.title}
            onChange={changeHandler}
            className="w-52 px-3 py-1.5 outline-none border-2 border-slate-400 rounded-md bg-transparent text-slate-300"
            placeholder="Category Title..."
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-slate-300 font-semibold">Description</label>
          <textarea
            name="description"
            value={category.description}
            onChange={changeHandler}
            className="w-full px-3 py-1.5 outline-none border-2 border-slate-400 rounded-md bg-transparent text-slate-300 resize-none"
            placeholder="Description..."
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-2 space-x-0 sm:flex-row sm:space-y-0">
          <button
            className="border border-slate-300 rounded-md py-1 bg-slate-300 text-black font-semibold sm:w-1/2 sm:order-1 sm:ml-2"
            type="submit"
          >
            Add Category
          </button>
          <button className="border border-slate-300 text-slate-300 rounded-md py-1 font-semibold sm:w-1/2">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
