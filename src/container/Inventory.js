import { useEffect, useState } from "react";
import AddCategory from "../component/AddCategory";
import AddProduct from "../component/AddProduct";
import NavBar from "../component/NavBar";
import { getCategories, postCategory } from "../Services/CategoryServices";
import {
  deleteProduct,
  getProducts,
  postProduct,
  putProduct,
} from "../Services/ProductsServices";
import ProductList from "../component/ProductList/ProductList";
import Filter from "../component/Filter";
const Inventory = () => {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [filteredOption, setFilteredOption] = useState({
    selectValue: "Newest",
    searchValue: "",
    selectCategoryId: "",
  });

  useEffect(() => {
    getAllCategory();
    getAllProduct();
  }, []);

  useEffect(() => {
    if (products) {
      let result = products;
      result = searchHandler(result);
      result = filterCategoryHandler(result);
      result = sortHandler(result);
      setAllProducts(result);
    }
  }, [products, filteredOption]);

  const getAllCategory = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProduct = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data);
      setAllProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postCategoryHandler = async (data) => {
    try {
      await postCategory(data);
      getAllCategory();
    } catch (error) {
      console.log(error);
    }
  };

  const postProductHandler = async (product) => {
    try {
      await postProduct(product);
      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProductHandler = async (id) => {
    try {
      await deleteProduct(id);
      getAllProduct();
      // console.log("delete", data)
    } catch (error) {
      console.log(error);
    }
  };

  const putProductHandler = async (id, product) => {
    try {
      await putProduct(id, product);
      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = (array) => {
    return array.filter((product) =>
      [product.title, product.selectCategory.title]
        .join(" ")
        .trim()
        .toLowerCase()
        .includes(filteredOption.searchValue.trim().toLowerCase())
    );
  };

  const sortHandler = (array) => {
    let sortProducts = [...array];
    return sortProducts.sort((a, b) => {
      if (filteredOption.selectValue === "Newest") {
        return new Date(b.AtCreate) - new Date(a.AtCreate);
      } else {
        return new Date(a.AtCreate) - new Date(b.AtCreate);
      }
    });
  };

  const filterCategoryHandler = (array) => {
    return !filteredOption.selectCategoryId
      ? array
      : array.filter(
          (product) =>
            product.selectCategory.id ===
            parseInt(filteredOption.selectCategoryId)
        );
  };

  return (
    <div className="min-h-screen">
      <NavBar products={products} />
      <div className="w-[300px] sm:w-[500px] my-0 mx-auto space-y-6 py-8">
        <AddCategory postCategoryHandler={postCategoryHandler} />
        <AddProduct
          categories={categories}
          postProductHandler={postProductHandler}
        />
        {products && products.length > 0 && (
          <Filter
            categories={categories}
            setFilteredOption={setFilteredOption}
            filteredOption={filteredOption}
          />
        )}
        {products && products.length > 0 && (
          <ProductList
            products={allProducts}
            deleteProductHandler={deleteProductHandler}
            putProductHandler={putProductHandler}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default Inventory;
