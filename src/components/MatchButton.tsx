interface MatchButtonProps {
  favorites: string[];
  findMatch: () => void;
}

const MatchButton = ({ favorites, findMatch }: MatchButtonProps) => {
  return (
    <>
      <button className="mt-2" onClick={() => findMatch()} disabled={favorites.length === 0}>
        Find a Match!
      </button>
    </>
  );
};

export default MatchButton;
