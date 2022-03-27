import { useState, useEffect } from "react";
import Button from "./Button";
import arrow from "../public/arrow.png";
import arrowHoverIcon from "../public/arrow-hover.png";
import heartThin from "../public/heart-thin.png";
import heartThinHover from "../public/heart-thin-hover.png";
import heartFull from "../public/heart-full.png";
import heartFullHover from "../public/heart-full-hover.png";
import Loading from "../components/Loading";

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
  const [heartHovered, setHeartHover] = useState(false);
  const [nextArrowHovered, setNextArrowHover] = useState(false);
  const [prevArrowHovered, setPrevArrowHover] = useState(false);

  useEffect(() => {
    setNextArrowHover(false);
    setPrevArrowHover(false);
  }, [id]);
  const isFavorited = favorites[id] !== undefined;

  const heartHover = (isHovered) => () => {
    setHeartHover(isHovered);
  };

  let heartIcon;
  if (heartHovered) {
    heartIcon = isFavorited ? heartFullHover : heartThinHover;
  } else {
    heartIcon = isFavorited ? heartFull : heartThin;
  }

  const nextArrowHover = (isHovered) => () => {
    setNextArrowHover(isHovered);
  };

  const prevArrowHover = (isHovered) => () => {
    setPrevArrowHover(isHovered);
  };

  const nextArrowIcon = nextArrowHovered ? arrowHoverIcon : arrow;
  const prevArrowIcon = prevArrowHovered ? arrowHoverIcon : arrow;

  return (
    <div className="flex justify-center">
      <div
        key={id}
        style={{ backgroundColor: "white" }}
        className="rounded border-2	border-black p-6 m-10 w-[700px] flex flex-col"
      >
        {!isLoading && (
          <Button
            text={isFavorited ? "un-favorite" : "favorite"}
            className={"self-end"}
            onClick={isFavorited ? unfavoriteOnclick : favoriteOnclick}
            image={heartIcon}
            imageSize={{ height: 40, width: 40 }}
            onMouseEnter={heartHover(true)}
            onMouseLeave={heartHover(false)}
          />
        )}
        <div className="flex justify-center p-3 m-3">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-col">
              <h3 className="text-center font-serif text-2xl m-2 p-2">
                {quote}
              </h3>
              <p className="text-right font-serif text-lg">
                {"-"} {author}
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          {isLoading || index === 0 ? (
            <div className="p-1 m-1 w-8	h-8"></div>
          ) : (
            <Button
              text="previous"
              className={"p-1 m-1"}
              imageStyle={"rotate-180"}
              onClick={previousOnclick}
              index={index}
              image={prevArrowIcon}
              imageSize={{ width: 40, height: 40 }}
              onMouseEnter={prevArrowHover(true)}
              onMouseLeave={prevArrowHover(false)}
            />
          )}
          {!isLoading && (
            <Button
              image={nextArrowIcon}
              imageSize={{ width: 40, height: 40 }}
              text="next"
              className={"p-1 m-1"}
              onClick={nextOnclick}
              onMouseEnter={nextArrowHover(true)}
              onMouseLeave={nextArrowHover(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteDisplay;
