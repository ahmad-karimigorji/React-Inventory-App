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
import Loading from "../component/Loading/Loading";

const Inventory = () => {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [filteredOption, setFilteredOption] = useState({
    selectValue: "Newest",
    searchValue: "",
    selectCategoryId: "",
  });
  const [isShowCategory, setIsShowCategory] = useState(false);
  const [isShowProduct, setIsShowProduct] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [loading, setLoading] = useState({
    addCategoryLoading: false,
    addProductLoading: false,
    editLoading: false,
    displayProductsLoading: false,
    deleteProductLoading: false,
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProduct = async () => {
    setLoading({ ...loading, displayProductsLoading: true });

    try {
      const { data } = await getProducts();
      setProducts(data);
      setAllProducts(data);
      setLoading({ ...loading, displayProductsLoading: false });
    } catch (error) {
      console.log(error);
      setLoading({ ...loading, displayProductsLoading: false });
    }
  };

  const postCategoryHandler = async (data) => {
    setLoading({ ...loading, addCategoryLoading: true });
    try {
      await postCategory(data);
      getAllCategory();
      setIsShowCategory(false);
      setLoading({ ...loading, addCategoryLoading: false });
    } catch (error) {
      console.log(error);
      setLoading({ ...loading, addCategoryLoading: false });
    }
  };

  const postProductHandler = async (product) => {
    setLoading({ ...loading, addProductLoading: true });
    try {
      await postProduct(product);
      getAllProduct();
      setLoading({ ...loading, addProductLoading: false });
      setIsShowProduct(true);
    } catch (error) {
      console.log(error);
      setLoading({ ...loading, addProductLoading: false });
    }
  };

  const deleteProductHandler = async (id) => {
    setLoading({ ...loading, deleteProductLoading: true });

    try {
      await deleteProduct(id);
      getAllProduct();
      setLoading({ ...loading, deleteProductLoading: false });
    } catch (error) {
      console.log(error);
      setLoading({ ...loading, deleteProductLoading: false });
    }
  };

  const putProductHandler = async (id, product) => {
    setLoading({ ...loading, editLoading: true });
    try {
      await putProduct(id, product);
      getAllProduct();
      setLoading({ ...loading, editLoading: false });
      setIsShowModal(false);
    } catch (error) {
      console.log(error);
      setLoading({ ...loading, editLoading: false });
    }
  };

  const searchHandler = (array) => {
    return array.filter((product) =>
      product.title
        .trim()
        .toLowerCase()
        .includes(filteredOption.searchValue.trim().toLowerCase())
    );
  };

  const sortHandler = (array) => {
    let sortProducts = [...array];
    return sortProducts.sort((a, b) => {
      if (filteredOption.selectValue === "Newest") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      } else {
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      }
    });
  };

  const filterCategoryHandler = (array) => {
    return !filteredOption.selectCategoryId
      ? array
      : array.filter(
          (product) => product.categoryId === filteredOption.selectCategoryId
        );
  };

  return (
    <div className="min-h-screen">
      <NavBar products={products} />
      <div className="w-full max-w-[500px] my-0 mx-auto space-y-6 py-8 px-4">
        <AddCategory
          postCategoryHandler={postCategoryHandler}
          isShowCategory={isShowCategory}
          setIsShowCategory={setIsShowCategory}
          loading={loading}
        />
        <AddProduct
          categories={categories}
          postProductHandler={postProductHandler}
          loading={loading}
          isShowProduct={isShowProduct}
          setIsShowProduct={setIsShowProduct}
        />
        {products && products.length > 0 && (
          <Filter
            categories={categories}
            setFilteredOption={setFilteredOption}
            filteredOption={filteredOption}
          />
        )}
        {loading.displayProductsLoading ? (
          <Loading classStyle={"mx-auto mt-8 text-slate-300 text-2xl"} />
        ) : (
          products &&
          products.length > 0 && (
            <ProductList
              products={allProducts}
              deleteProductHandler={deleteProductHandler}
              putProductHandler={putProductHandler}
              categories={categories}
              loading={loading}
              isShowModal={isShowModal}
              setIsShowModal={setIsShowModal}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Inventory;
