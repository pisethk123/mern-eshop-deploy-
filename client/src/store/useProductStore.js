import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../libs/axios";

export const useProductStore = create((set) => ({
    products: [],
    loading: false,

    setProducts: products => set({products}),

    createProduct: async (productData) => {
        set({loading: true})
        try {
            const res = await axios.post("/products", productData)
            set((prevState) => ({
                products: [...prevState.products, res.data],
                loading: false,
            }))
            toast.success("product is created successfully")
        } catch (error) {
            toast.error(error.response.data.error)
            set({loading: false})
        }
    },

    fetchAllProducts: async () => {
        set({loading: true})
        try {
            const response  = await axios.get("/products")
            set({products: response.data, loading: false})
            toast.success("fetched all products")
        } catch (error) {
            set({error: "failed to fetch products", loading: false})
            toast.error(error.response.data.error || "failded to fetch products")
        }
    },

    fetchProductByCategory: async (category) => {
        set({loading: true})
        try {
            const response = await axios.get(`/products/category/${category}`)
            set({products: response.data, loading: false})
        } catch (error) {
            set({error: "failded to fetch products", loading: false})
            toast.error(error.response.data.error || "failded to fetch products")
        }
    },

    deleteProduct: async (productId) => {
        set({loading: true})

        try {
            await axios.delete(`/products/${productId}`)
            set((prevProducts) => ({
                products: prevProducts.products.filter((product) => product._id !== productId),
                loading: false
            }))
        } catch (error) {
            toast.error(error.response.data.error || "failded to delete products")
        }
    },

    toggleFeatureProduct: async (productId) => {
        try {
            const response = await axios.patch(`/products/${productId}`)

            set((prevState) => ({
                products: prevState.products.map((product) => 
                product._id === productId ?  {...product, isFeatured: response.data.isFeatured}: product)
            }))
        } catch (error) {
            toast.error(error.response.data.error || "failded to toggle products")
        }
    },

    fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},
}))