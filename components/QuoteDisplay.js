import Button from "./Button";

const QuoteDisplay = ({
  quote,
  author,
  id,
  nextOnclick,
  previousOnclick,
  favoriteOnclick,
  favorites,
  index,
  isLoading,
  unfavoriteOnclick,
}) => {
  const isFavorited = favorites[id] !== undefined;
  return (
    <div className="flex justify-center">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div
          key={id}
          className="rounded border-2	border-black p-6 m-7 w-1/2 flex flex-col"
        >
          <Button
            text={isFavorited ? "un-favorite" : "favorite"}
            className={"self-end"}
            onClick={isFavorited ? unfavoriteOnclick : favoriteOnclick}
          />
          <div className="flex justify-center p-3 m-3">
            <div className="w-3/4 flex flex-col">
              <h3 className="text-center">{quote}</h3>
              <p className="text-right">
                {"-"} {author}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              text="previous"
              className={"p-1 m-1"}
              onClick={previousOnclick}
              index={index}
            />
            <Button text="next" className={"p-1 m-1"} onClick={nextOnclick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteDisplay;
