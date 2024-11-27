"use client";

import { fetchCars } from "@/utils";
import type { HomeProps, ResponseCar } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import {
  CarCard,
  ShowMore,
  SearchBar,
  CustomFilter,
  Hero,
  CustomButton,
} from "@/components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  // const handleUpdateSearchParams = (model: string, value: string) => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   searchParams.set(model, value);
  //   const newPathname = `${
  //     window.location.pathname
  //   }?${searchParams.toString()}`;
  //   router.push(newPathname);
  // }

  const resetSearchParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("model");
    searchParams.delete("manufacturer");
    searchParams.delete("fuel");
    searchParams.delete("year");
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname);
  };
  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar resetSearchParams={resetSearchParams}/>
         
          <div className="home__filter-container">
            <p>{allCars?.items?.length}</p>
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {loading ? (
          <div className="home__loading-container flex-center py-16">
            <Image
              src="/car-logo.svg"
              alt="loader"
              width={50}
              height={50}
              className="object-contain animate-bounce "
            ></Image>
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
              {allCars &&
                allCars?.items?.length < 1 &&
                "No cars found. Please adjust your filters."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
