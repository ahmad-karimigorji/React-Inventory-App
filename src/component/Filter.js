const Filter = ({ setFilteredOption, filteredOption, categories }) => {
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFilteredOption({ ...filteredOption, [name]: value });
  };

  return (
    <div className="flex flex-col space-y-2">
      <input
        type="text"
        name="searchValue"
        value={filteredOption.searchValue}
        onChange={changeHandler}
        className="w-full px-2 py-1 outline-none border-2 border-slate-400 rounded-md bg-transparent text-slate-300"
        placeholder="Search"
      />
      <div className="sm:flex space-y-2 sm:space-y-0 sm:space-x-2">
        <select
          name="selectValue"
          value={filteredOption.selectValue}
          onChange={changeHandler}
          className="w-full px-2 py-1 outline-none border-2 border-slate-400 rounded-md bg-transparent text-slate-300 resize-none"
        >
          <option className="text-black">Newest</option>
          <option className="text-black">Oldest</option>
        </select>

        <select
          name="selectCategoryId"
          value={filteredOption.selectCategoryId}
          onChange={changeHandler}
          className="w-full px-2 py-1 outline-none border-2 border-slate-400 rounded-md bg-transparent text-slate-300 resize-none"
        >
          <option className="text-black" value="">
            Sort by Category...
          </option>
          {categories &&
            categories.map((item) => (
              <option className="text-black " key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
