"use client";

import { fetchCars } from "@/utils";
import type { HomeProps, ResponseCar } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@/components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const [allCars, setAllCars] = useState<ResponseCar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cars = await fetchCars({
        manufacturer: searchParams.get("manufacturer") || "",
        year: searchParams.get("year") || "",
        fuel: searchParams.get("fuel") || "",
        limit: Number(searchParams.get("limit")) || 10,
        page: Number(searchParams.get("page")) || 1,
        model: searchParams.get("model") || "",
      });
      setAllCars(cars);
      setLoading(false);
    };

    fetchData();
  }, [searchParams]);

  const isDataEmpty =
    !Array.isArray(allCars?.items) ||
    allCars?.items.length < 1 ||
    !allCars?.items;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <p>{allCars?.items?.length}</p>
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {loading ? (
          <div className="home__loading-container">
            <p>Loading...</p> {/* Replace this with a spinner if needed */}
          </div>
        ) : !isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.items?.map((car: any) => (
                <CarCard car={car} key={car.id} />
              ))}
            </div>

            <ShowMore
              pageNumber={(Number(searchParams.get("limit")) || 10) / 10}
              isNext={
                (Number(searchParams.get("limit")) || 10) >
                (allCars.items?.length || 0)
              }
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>
              {allCars && allCars?.items?.length < 1 && "No cars found. Please adjust your filters."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
