"use client";
import OrderTable from "@/components/OrderTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [orderType, setOrderType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    fetchPendingOrders();
    fetchCompletedOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      const response = await fetch(
        "https://matching-orders.onrender.com/api/v1/pending"
      );

      if (!response.ok) {
        console.log(response.statusText);
        throw new Error(
          `Failed to fetch pending orders: ${response.statusText}`
        );
      }

      const data = await response.json();
      setPendingOrders(data?.data);
    } catch (error) {
      toast(`Error: ${error.message}`);
    }
  };

  const fetchCompletedOrders = async () => {
    try {
      const response = await fetch(
        "https://matching-orders.onrender.com/api/v1/completed"
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch completed orders: ${response.statusText}`
        );
      }

      const data = await response.json();
      setCompletedOrders(data?.data);
    } catch (error) {
      toast(`Error: ${error.message}`);
    }
  };
  const deleteOrders = async () => {
    try {
      const response = await fetch(
        "https://matching-orders.onrender.com/api/v1/clear",
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch completed orders: ${response.statusText}`
        );
      }

      const data = await response.json();
      toast(data?.message);
      setPendingOrders([]);
      setCompletedOrders([]);
    } catch (error) {
      toast(`Error: ${error.message}`);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderType || !quantity || !price) {
      toast("Enter valid details");
      return;
    }

    const order = {
      orderType,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };

    try {
      const response = await fetch(
        "https://matching-orders.onrender.com/api/v1/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to submit order: ${response.statusText}`);
      }

      const data = await response.json();
      toast(data?.message);

      // Clear form fields and refetch orders
      setQuantity("");
      setPrice("");
      fetchPendingOrders();
      fetchCompletedOrders();
      setOpen(false);
    } catch (error) {
      toast(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full h-full flex items-center gap-4 p-4 flex-col ">
      <div className="flex items-center justify-center gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              {" "}
              <Plus className="mr-2 h-4 w-4" color="#fff" /> Place order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Place order</DialogTitle>
            </DialogHeader>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter Quantity"
            />
            <Select onValueChange={setOrderType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select order type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogContent>
        </Dialog>
        <Button variant="destructive" onClick={deleteOrders}>
          <Trash2 className="lg:mr-2 h-4 w-4" />
          <span className="max-lg:hidden">Clear Database</span>
        </Button>
      </div>
      <div className="flex gap-4 items-start justify-center">
        <div className="p-4 flex flex-col bg-slate-50 rounded-lg">
          <span className="text-lg font-bold">Pending</span>
          <OrderTable data={pendingOrders} />
        </div>
        <div className="p-4 flex flex-col bg-slate-50 rounded-lg">
          <span className="text-lg font-bold">Completed</span>
          <OrderTable data={completedOrders} completed={true} />
        </div>
      </div>
      <Link
        href="/"
        className="rounded-xl bg-white px-4 py-2 mx-auto text-base  flex gap-2 items-center justify-center"
      >
        {" "}
        <ArrowLeft size={24} color="black" /> Assignment 1{" "}
      </Link>
    </div>
  );
};

export default Page;
