import express from "express"
import env from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"
import analytictRoutes from "./routes/analytic.route.js"
import path from 'path'
import { fileURLToPath } from "url"

import { connectDB } from "./libs/db.js"

env.config()
connectDB()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const PORT = process.env.PORT || 8000

// app.use(cors({
//     credentials: true,
//     origin: ["http://localhost:5173"]

// }))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/coupons", couponRoutes)
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analytictRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get("*", (req, res) => res.sendFile(path.join(__dirname, '/client/dist/index.html')))

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))