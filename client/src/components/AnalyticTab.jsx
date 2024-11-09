import React, { useEffect, useState } from "react";
import axios from "../libs/axios";
import AnalyticCard from "./AnalyticCard";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts'
const AnalyticTab = () => {
    const [analyticData, setAnalyTicData] = useState({
        users: 0,
        products: 0,
        totalSales: 0,
        totalRevenue: 0
    })

    const [isLoading, setIsLoading] = useState(true)
    const  [dailySalesData, setDailySalesData] = useState([])

    useEffect(() => {
        const fetchAnalyticData = async () => {
            try {
                const response = await axios.get("/analytics")
                setAnalyTicData(response.data.analyticsData)
                setDailySalesData(response.data.dailySalesData)
                setIsLoading(false)
                console.log(response.data)
            } catch (error) {
                console.log("error fetching analytic data:", error)
            }finally{
                setIsLoading(false)
            }
        }
        fetchAnalyticData()
    },  [])

    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnalyticCard
                title={"Total Users"}
                value={analyticData.users.toLocaleString()}
                icon={Users}
                color="from-emerald-500 to-teal-700"/>

            <AnalyticCard
                title={"Total Product"}
                value={analyticData.products.toLocaleString()}
                icon={Package}
                color="from-emerald-500 to-teal-700"/>

            <AnalyticCard
                title={"Total Sales"}
                icon={ShoppingCart}
                value={analyticData.totalSales.toLocaleString()}
                color="from-emerald-500 to-teal-700"/>

            <AnalyticCard
                title={"Total Revenue"}
                value={`$${analyticData.totalRevenue.toLocaleString()}`}
                icon={DollarSign}
                color="from-emerald-500 to-teal-700"/>
        </div>
        <ResponsiveContainer width='100%' height={400}>
					<LineChart data={dailySalesData}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' stroke='#D1D5DB' />
						<YAxis yAxisId='left' stroke='#D1D5DB' />
						<YAxis yAxisId='right' orientation='right' stroke='#D1D5DB' />
						<Tooltip />
						<Legend />
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='sales'
							stroke='#10B981'
							activeDot={{ r: 8 }}
							name='Sales'
						/>
						<Line
							yAxisId='right'
							type='monotone'
							dataKey='revenue'
							stroke='#3B82F6'
							activeDot={{ r: 8 }}
							name='Revenue'
						/>
					</LineChart>
				</ResponsiveContainer>

    </div>;
};

export default AnalyticTab;
