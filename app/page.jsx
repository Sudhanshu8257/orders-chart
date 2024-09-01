import PriceAnanlysis from "@/components/PriceAnalysis";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 lg:gap-8 p-4 lg:p-12">
      <h1 className=" text-xl lg:text-3xl font-bold mb-6">
        Commodity Price Analysis
      </h1>
      <PriceAnanlysis />
    </main>
  );
}
