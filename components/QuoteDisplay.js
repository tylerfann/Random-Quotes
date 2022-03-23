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
  console.log('favorites' ,favorites)
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div key={id}>
          {favorites[id] !== undefined ? (
            <Button
              text="un-favorite"
              styles={{ color: "pink" }}
              onClick={unfavoriteOnclick}
            />
          ) : (
            <Button
              text="favorite"
              styles={{ color: "yellow" }}
              onClick={favoriteOnclick}
            />
          )}
          <h3>{quote}</h3>
          <p>{author}</p>
          <Button
            text="previous"
            styles={{ color: "blue" }}
            onClick={previousOnclick}
            index={index}
          />
          <Button text="next" styles={{ color: "red" }} onClick={nextOnclick} />
        </div>
      )}
    </>
  );
};

export default QuoteDisplay;
