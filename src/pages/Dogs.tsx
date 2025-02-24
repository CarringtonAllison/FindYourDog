import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDogs, getBreeds, getDogSearch } from "../apis/DogsAPI";
import "react-input-range/lib/css/index.css";
import { getMatch } from "../apis/MatchAPI";
import { Dog, InputChangeEvent, SelectChangeEvent } from "../types/types";
import DogCard from "../components/DogCard";
import Pagination from "../components/Pagination";
import LimitSelect from "../components/LimitSelect";
import ZipCodeInput from "../components/ZipCodeInput";
import BreedSelect from "../components/BreedSelect";
import MatchButton from "../components/MatchButton";
import AgeRangeSlider from "../components/AgeRangeSlider";
import SortSelect from "../components/SortSelect";
import { FaSpinner } from "react-icons/fa";

const Dogs = () => {
  const navigate = useNavigate();

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>("breed");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [size, setSize] = useState<number>(25);
  const [total, setTotal] = useState<number>(0);
  const [nextQuery, setNextQuery] = useState<string | null>(null);
  const [prevQuery, setPrevQuery] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<number>(1);
  const [zipCodes, setZipCodes] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 30,
  });
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    fetchDogs();
  }, [sortField, sortOrder, selectedBreeds, size, zipCodes]);

  const fetchBreeds = async () => {
    try {
      const response = await getBreeds();
      setBreeds(response?.data ?? []);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  };

  const fetchDogs = async (query?: string) => {
    setLoading(true);
    let fromValue = 0;
    if (query) {
      const params = new URLSearchParams(query);
      const fromParam = params.get("from");
      fromValue = fromParam ? parseInt(fromParam, 10) : 0;
    }

    try {
      const response = await getDogSearch(
        selectedBreeds,
        zipCodes,
        `${sortField}:${sortOrder}`,
        null,
        null,
        size,
        fromValue,
        ageRange.min,
        ageRange.max
      );
      setTotal(response?.data.total ?? 0);
      setNextQuery(response?.data.next ?? null);
      setPrevQuery(response?.data.prev ?? null);
      const dogIds = response?.data.resultIds ?? [];
      const dogsResponse = await getDogs(dogIds);
      setDogs(dogsResponse?.data ?? []);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const applySortDirection = (value: string) => {
    setSortOrder(value)
  }

  const handleSortChange = (event: SelectChangeEvent) => {
    const field = event.target.value.toLowerCase();
    setSortField(field);
  };

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && nextQuery) {
      fetchDogs(nextQuery);
      setPageCount(pageCount + 1);
    } else if (direction === "prev" && prevQuery) {
      fetchDogs(prevQuery);
      setPageCount(pageCount - 1);
    }
  };

  const handleBreedChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    console.log("Breed changed to:", value);
    setSelectedBreeds(value ? [value] : []);
    setPageCount(1);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    const value = parseInt(event.target.value, 10);
    setSize(value);
    setPageCount(1);
  };

  const handleAgeRangeChange = (
    value: number | { min: number; max: number }
  ) => {
    if (typeof value === "number") {
      setAgeRange({ min: value, max: value });
    } else {
      setAgeRange(value);
    }
  };

  const handleFilterClick = () => {
    fetchDogs();
  };

  const toggleFavorite = (dogId: string) => {
    setFavorites((favorites) => {
      if (favorites.includes(dogId)) {
        return favorites.filter((id) => id !== dogId);
      } else {
        return [...favorites, dogId];
      }
    });
  };

  const findMatch = async () => {
    try {
      const response = await getMatch(favorites);
      const matchId = response.data.match;

      if (matchId) {
        const dogsResponse = await getDogs([matchId]);
        const matchedDog: Dog = dogsResponse.data[0];

        navigate("/match", { state: { match: matchedDog } });
      }
    } catch (error) {
      console.error("Error finding match:", error);
    }
  };

  const handleZipCodeChange = (event: InputChangeEvent) => {
    const value = event.target.value;
    console.log("first value: " + value);
    const zipCode = parseInt(value, 10);

    if (value.length === 5) {
      setZipCodes([zipCode]);
    } else if (isNaN(zipCode)) {
      setZipCodes([]);
    }
  };

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          {/* <div className="text-4xl text-gray-500">Loading...</div> */}
          <FaSpinner className="text-7xl" />
        </div>
      ) : (
        <>
          <h1 className="font-doggy text-8xl justify-self-center my-10">
            Find Your Dog!
          </h1>
          <div className="justify-self-end pt-4 pr-20">
            <SortSelect
              sorts={["Breed", "Name", "Age"]}
              sortField={sortField}
              handleSortChange={handleSortChange}
            />
            <a onClick={() => applySortDirection("asc")} className="ml-2 cursor-pointer">
              ASC
            </a>
            <a onClick={() => applySortDirection("desc")} className="ml-2 pl-2 border-l-2 cursor-pointer">
              DESC
            </a>
            <LimitSelect size={size} handleLimitChange={handleLimitChange} />
          </div>
          <div className="flex">
            <div className="pr-6 w-min">
              <h1 className="text-3xl py-2 text-black text-center">Filters</h1>
              <hr className="pt-2" />
              <div className="py-6">
                <AgeRangeSlider
                  ageRange={ageRange}
                  handleAgeRangeChange={handleAgeRangeChange}
                  handleFilterClick={handleFilterClick}
                />
                <BreedSelect
                  selectedBreeds={selectedBreeds}
                  breeds={breeds}
                  handleBreedChange={handleBreedChange}
                />
                <ZipCodeInput handleZipCodeChange={handleZipCodeChange} />
              </div>
              <div className="justify-items-center pt-20">
                <h2 className="text-black italic text-center">
                  Select your favorite dogs and try to find a match!
                </h2>
                <MatchButton favorites={favorites} findMatch={findMatch} />
              </div>
            </div>
            {dogs.length === 0 ? (
              <div className="flex-grow self-center justify-items-center">
                <div className="content-center">
                  <h2 className="text-4xl text-red-600 text-center">
                    No results found.
                    <br /> Please adjust your search criteria and try again.
                  </h2>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap">
                <DogCard
                  dogs={dogs}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </div>
            )}
          </div>
          <div>
            <Pagination
              prevQuery={prevQuery}
              nextQuery={nextQuery}
              pageCount={pageCount}
              total={total}
              size={size}
              handlePageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dogs;
