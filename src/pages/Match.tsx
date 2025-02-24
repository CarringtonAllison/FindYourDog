import { Link, useLocation } from "react-router";

const Match = () => {
  const location = useLocation();
  const match = location.state?.match;

  return (
    <div>
      <h1 className="font-doggy text-8xl p-20 justify-self-center">You Found a Match!</h1>
      <div className="m-2 custom-card justify-self-center" key={match.id}>
        <div>
          <img
            className="w-75 h-75 rounded-2xl shadow-2xl"
            src={match.img}
            alt="Picture of Dog"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="font-bold p-3 text-black">
            <div>Name: {match.name}</div>
            <div>Breed: {match.breed}</div>
            <div>Age: {match.age}</div>
            <div>Zip Code: {match.zip_code}</div>
          </div>
        </div>
      </div>
      <div className="justify-self-center pt-20">
        <Link className="btn" to="/dogs">Back to search</Link>
      </div>
    </div>
  );
};

export default Match;
