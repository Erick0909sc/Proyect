/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "@/components/card";
import { EStateGeneric, IProduct } from "@/shared/types";
import { useSelector } from "react-redux";
import {
  getAllProducts,
  getAllProductsByCategory,
  selectAllProducts,
  selectAllProductsStatus,
} from "@/states/products/productsSlice";
import {
  calcularDescuentoItemCart,
  calcularPrecioConDescuento,
  itemsPerPage,
} from "@/shared/ultis";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout/Layout";
import {
  selectAllFilters,
  selectAllSorts,
  selectCurrentPage,
  setCurrentPage,
} from "@/states/globalSlice";
import { useAppDispatch } from "@/states/store";
import Pagination from "@/components/pagination";
import FiltersAndSorts from "@/components/Filtros/FiltersAndSorts";
import useProductsSorts from "@/hooks/useProductsSorts";
import useProductsWithFilters from "@/hooks/useProductsWithFilters";

const SearchResult = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { query } = router.query;
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const productsStatus = useSelector(selectAllProductsStatus);
  const searchTerm = query ? query.toString() : ""; // Obtén el término de búsqueda de la URL
  const sorts = useSelector(selectAllSorts);
  const filters = useSelector(selectAllFilters);
  const filteredProducts = useProductsSorts(
    useProductsWithFilters(useSelector(selectAllProducts), filters),
    sorts
  );
  // ↓↓↓↓↓↓↓↓↓↓↓ Paginación ↓↓↓↓↓↓↓↓↓↓↓
  const currentPage = useSelector(selectCurrentPage);
  const minItems = (currentPage - 1) * itemsPerPage;
  const maxItems = currentPage * itemsPerPage;
  const searchFilteredProducts = filteredProducts.filter(
    (product) =>
      (!searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedCategory || product.category.name === selectedCategory)
  );

  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  //pruebaaaas
  useEffect(() => {
    const { query } = router;
    const categoryFromURL = query.category as string;
    if (categoryFromURL) {
      // Si hay una categoría en la URL, seleccionarla
      setSelectedCategory(categoryFromURL);
    }
  }, [router]);

  // Almacenar el filtro de categoría seleccionado en LocalStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  // Restablecer la página actual a 1 al cambiar el término de búsqueda
  useEffect(() => {
    setCurrentPageRedux(1);
  }, [setCurrentPageRedux]);

  //pruebas
  useEffect(() => {
    const fetchData = async () => {
      if (productsStatus === EStateGeneric.IDLE) {
        // Utiliza la acción getAllProducts si selectedCategory no está definida
        if (!selectedCategory) {
          await dispatch(getAllProducts());
        } else {
          // Utiliza la acción getAllProductsByCategory con la categoría seleccionada
          await dispatch(getAllProductsByCategory(selectedCategory));
        }
      }
    };

    fetchData();
  }, [dispatch, productsStatus, session, selectedCategory]);
  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    router.push(`/products?category=${newCategory}`);
  };

  return (
    <Layout title="Productos">
      <div className="flex items-star mt-5">
        {" "}
        <h1 className="font-serif text-2xl">
          Resultados de la búsqueda para: "{searchTerm}"
        </h1>
      </div>
      <div className="flex flex-col items-center mt-8">
        <FiltersAndSorts
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
        />
        {productsStatus === EStateGeneric.SUCCEEDED && (
          <div className="flex flex-col gap-8 py-8">
            {searchFilteredProducts
              .slice(minItems, maxItems)
              .map((product, index) => (
                <Card
                  key={index}
                  session={session}
                  code={product.code}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  brand={product.brand?.name}
                  image={product.image}
                  category={product.category.name}
                  discount={product.discount}
                  discountedPrice={calcularPrecioConDescuento(product)}
                  rating={product.rating}
                  reviews={product.reviews}
                  unitOfMeasure={product.unitOfMeasure}
                />
              ))}
          </div>
        )}
        <Pagination
          items={searchFilteredProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPageRedux}
        />
      </div>
    </Layout>
  );
};

export default SearchResult;
