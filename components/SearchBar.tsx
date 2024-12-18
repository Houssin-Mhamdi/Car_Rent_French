"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchManufacturer from "./SearchManufacturer";
import { CustomButton } from ".";

const SEARCH_BAR_ID = "searchbar-id";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button
    type="submit"
    className={`-ml-3 z-10 ${otherClasses} border border-gray-300 rounded-full`}
  >
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className="object-contain "
    />
  </button>
);

const SearchBar = ({
  resetSearchParams,
}: {
  resetSearchParams: () => void;
}) => {
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer.trim() === "" && model.trim() === "") {
      return alert("Please provide some input");
    }

    window.scrollTo({ top: 1000 });
    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());

    // To temporary fix Next JS 13 scroll to top issue.
    // const searchBar = document.getElementById(SEARCH_BAR_ID);
    // searchBar.scrollIntoView()
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'model' search parameter based on the 'model' value
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form id="searchbar-id" className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManuFacturer={setManuFacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model..."
          className="searchbar__input border border-gray-300 "
        />

        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item flex items-center gap-3">
        <SearchButton otherClasses="max-sm:hidden" />
        <CustomButton
          handleClick={resetSearchParams}
          title="Reset"
          containerStyles="bg-primary-blue text-white rounded-full hover:bg-[#2b36ff]"
        />
      </div>
    </form>
  );
};

export default SearchBar;
