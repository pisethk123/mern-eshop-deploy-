import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import React, { useEffect, useState } from "react";
import CreateProductForm from "../components/CreateProductForm";
import ProductList from "../components/ProductList";
import AnalyticTab from "../components/AnalyticTab";
import { useProductStore } from "../store/useProductStore";

const tabs = [
    {id: "create", label: "Create Product", icon: <PlusCircle/>},
    {id: "products", label: "Products", icon: <ShoppingBasket/>},
    {id: "analytics", label: "Analytics", icon: <BarChart/>},
]

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("create")
    const {fetchAllProducts, products} = useProductStore()

    useEffect(() => {
        fetchAllProducts()
    }, [fetchAllProducts])

    console.log(products)

    return <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-16">
            <div className="flex justify-center mb-8">
                {
                    tabs.map((tab) => <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-4 py-2 mx-2 rounded-md ${activeTab === tab.id ? "bg-emerald-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                            {tab.icon}
                            {tab.label}
                    </button>)
                }
            </div>
            {activeTab === "create" && <CreateProductForm/>}
            {activeTab === "products" && <ProductList/>}
            {activeTab === "analytics" && <AnalyticTab/>}
        </div>
    </div>;
};

export default AdminPage;
