import React from "react";

const AnalyticCard = ({title, value, icon: Icon, color}) => {
  return <div>
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-emerald-300 text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>
    </div>
{/* 
    <div className=" inset-0">
      <div className="absolute bottom-4 right-4">
        <Icon className="h2 w-32"/>
      </div>
    </div> */}
  </div>
;
};

export default AnalyticCard;
