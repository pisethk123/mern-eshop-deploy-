import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
    const {fetchProductByCategory, products} = useProductStore()
    const {category} = useParams()

    useEffect(() => {
        fetchProductByCategory(category)
    }, [fetchProductByCategory, category])

    console.log(products)
  return <div className="min-h-screen">
    <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-semibold">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        {products?.length == 0 && <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full"></h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product) => <ProductCard key={product._id} product={product}/>)}
        </div>
        
    </div>
  </div>;
};

export default CategoryPage;
