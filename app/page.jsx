import PriceAnanlysis from "@/components/PriceAnalysis";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 lg:gap-8 p-4 lg:p-12">
      <div className="w-full flex items-center mb-6 justify-between">
        <h1 className=" text-xl lg:text-3xl font-bold ">
          Commodity Price Analysis
        </h1>
        <Link href="https://github.com/Sudhanshu8257/orders-chart/">
          <GitHubLogoIcon width={24} height={24} />
        </Link>
      </div>
      <PriceAnanlysis />
      <Link href="/matching-orders" className="rounded-xl bg-white px-4 py-2 mx-auto text-base  flex gap-2 items-center justify-center">
        Assignment 2 <ArrowRight size={24} color="black" />
      </Link>
    </main>
  );
}
