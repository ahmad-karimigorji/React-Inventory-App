const NavBar = ({ products }) => {
  return (
    <div className="w-full flex justify-center items-center bg-slate-700">
      <div className="flex items-center text-slate-300 font-bold py-5 text-center mx-3">
        <h2 className="text-lg sm:text-xl">
          Inventory App with React.js & Tailwind
        </h2>
        {products && products.length > 0 && (
          <span className="flex justify-center items-center border-2 border-slate-300 rounded-full w-6 h-6 ml-2">
            {products.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default NavBar;
