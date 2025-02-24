import { Dog } from "../types/types";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

interface DogCardProps {
  dogs: Dog[];
  favorites: string[];
  toggleFavorite: (dogId: string) => void;
}

const DogCard = ({ dogs, favorites, toggleFavorite }: DogCardProps) => {
  return (
    <>
      {dogs.map((dog) => (
        <div className="m-2 custom-card" key={dog.id}>
          <div>
            <img
              className="w-75 h-75 rounded-2xl shadow-2xl"
              src={dog.img}
              alt="Picture of Dog"
            />
          </div>
          <div  className="flex justify-between items-center">
            <div className="font-bold p-3 text-black">
              <div>Name: {dog.name}</div>
              <div>Breed: {dog.breed}</div>
              <div>Age: {dog.age}</div>
              <div>Zip Code: {dog.zip_code}</div>
            </div>
            <div>
              <button className="hover:scale-110" onClick={() => toggleFavorite(dog.id)}>
                {favorites.includes(dog.id) ? (
                  <MdFavorite className="text-red-600" />
                ) : (
                  <MdFavoriteBorder />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DogCard;
