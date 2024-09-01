"use client";
import React, { useState, useMemo, useEffect } from "react";
import CommodityChart from "./CommodityChart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import Cards from "./Cards";
import { Plus, Trash2 } from "lucide-react";

const PriceAnalysis = () => {
  const [chartData, setChartData] = useState([]);
  const [newPrice, setNewPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [noData, setNoData] = useState(true);

  const filteredData = useMemo(() => {
    if (filter === "all") return chartData;
    const now = new Date();
    const filterTime = new Date(now - parseInt(filter) * 60 * 1000);
    return chartData.filter((point) => new Date(point.time) > filterTime);
  }, [chartData, filter]);

  useEffect(() => {
    setNoData(filteredData.length === 0);
  }, [filteredData]);

  useEffect(() => {
    const storedData = localStorage.getItem("commodityPriceData");
    if (storedData) {
      setChartData(JSON.parse(storedData));
      setNoData(false);
    }
  }, []);

  const addNewDataPoint = () => {
    if (newPrice) {
      const newPoint = {
        time: new Date().toISOString(),
        price: parseFloat(newPrice),
      };
      const updatedData = [...chartData, newPoint];
      setChartData(updatedData);
      localStorage.setItem("commodityPriceData", JSON.stringify(updatedData));
      setNewPrice("");
      setOpen(false);
      setNoData(false);
    }
  };

  const clearAllData = () => {
    setChartData([]);
    localStorage.removeItem('commodityPriceData');
    setNoData(true);
  };

  const calculatePriceChanges = useMemo(() => {
    if (chartData.length === 0) {
      return {
        latestPrice: 0,
        overallChange: 0,
        overallChangePercentage: 0,
        recentChange: 0,
        recentChangePercentage: 0,
      };
    }

    const latestPrice = chartData[chartData.length - 1].price;
    const startingPrice = chartData[0].price;
    const previousPrice =
      chartData.length > 1
        ? chartData[chartData.length - 2].price
        : startingPrice;

    const overallChange = latestPrice - startingPrice;
    const recentChange = latestPrice - previousPrice;

    // Handle division by zero
    const overallChangePercentage =
      startingPrice !== 0 ? (overallChange / startingPrice) * 100 : 0;

    const recentChangePercentage =
      previousPrice !== 0 ? (recentChange / previousPrice) * 100 : 0;

    return {
      latestPrice,
      overallChange,
      overallChangePercentage,
      recentChange,
      recentChangePercentage,
    };
  }, [chartData]);

  const {
    latestPrice,
    overallChange,
    overallChangePercentage,
    recentChange,
    recentChangePercentage,
  } = calculatePriceChanges;

  
  return (
    <>
      <div className="w-full h-full bg-slate-50 lg:py-4 py-2 rounded-xl">
        <div className="mb-4 flex lg:px-4 px-1 items-center justify-between w-full">
          <div className="flex ml-auto space-x-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button> <Plus className="mr-2 h-4 w-4" color="#fff" /> Add New Price</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter New Price</DialogTitle>
                </DialogHeader>
                <Input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="Enter price"
                />
                <Button onClick={addNewDataPoint}>Add</Button>
              </DialogContent>
            </Dialog>
            <Select defaultValue="all" onValueChange={setFilter}>
              <SelectTrigger className="w-[128px] lg:w-[180px]">
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="10">Last 10 minutes</SelectItem>
                <SelectItem value="60">Last 1 hour</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="destructive" onClick={clearAllData}>
              <Trash2 className="lg:mr-2 h-4 w-4" /> <span className="max-lg:hidden">Clear All Data</span>
            </Button>
          </div>
        </div>
        <CommodityChart overallChange={overallChange} chartData={filteredData} noData={noData} />
      </div>
      <Cards latestPrice={latestPrice} overallChange={overallChange} overallChangePercentage={overallChangePercentage} recentChange={recentChange} recentChangePercentage={recentChangePercentage} />
    </>
  );
};

export default PriceAnalysis;
