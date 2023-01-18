import AddCategory from "../component/AddCategory";
import NavBar from "../component/NavBar"
const Inventory = () => {
  return (
    <div className="space-y-6">
      <NavBar/>
      <div className="w-[300px] sm:w-[500px] my-0 mx-auto">
        <AddCategory/>
      </div>
    </div>
  );
};

export default Inventory;
