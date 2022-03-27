import Head from "next/head";
import QuoteDisplay from "../components/QuoteDisplay";
import { useEffect, useState } from "react";
import { getQuote } from "../lib/datasource";
import { getFavoritesFromStorage, setFavoritesInStorage } from "../lib/helpers";
import { getRandomColor } from "../lib/colors";

const Home = (props) => {
  const [data, setData] = useState([props]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({ errorText: "" });
  const [index, setIndex] = useState(0);
  const [favorites, setFavorites] = useState({});
  const [backgroundColor, setBgColor] = useState("");

  useEffect(() => {
    const favs = getFavoritesFromStorage();
    setFavorites(favs);
    setBgColor(getRandomColor());
  }, []);

  useEffect(() => {
    setBgColor(getRandomColor());
  }, [index]);

  const loadingDelay = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const nextQuote = async () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
    } else {
      setLoading(true);
      const newData = await getQuote();
      if (newData.errorText) {
        setError(newData);
        loadingDelay();
      } else if (newData) {
        setData([...data, newData]);
        setIndex(index + 1);
        setError({ errorText: "" });
        loadingDelay();
      }
    }
  };

  const previousQuote = () => {
    const previousIndex = index - 1;
    if (data[previousIndex]) {
      setIndex(previousIndex);
    }
  };

  const unfavoriteQuote = () => {
    const currentQuoteId = data[index]._id;
    const newFavs = { ...favorites, [currentQuoteId]: undefined };
    setBothFavorites(newFavs);
  };

  const setBothFavorites = (favs) => {
    setFavorites(favs);
    setFavoritesInStorage(favs);
  };

  const favoriteQuote = () => {
    const currentQuoteId = data[index]._id;
    if (!favorites[currentQuoteId]) {
      const favs = {
        ...favorites,
        [currentQuoteId]: {
          ...data[index],
          favoritedAt: Date.now(),
        },
      };
      setBothFavorites(favs);
    } else {
      const favs = {
        [currentQuoteId]: {
          ...data[index],
          favoritedAt: Date.now(),
        },
      };
      setBothFavorites(favs);
    }
  };

  return (
    <div
      className="h-screen transition duration-700 ease-in-out"
      style={{ backgroundColor }}
    >
      <Head>
        <title>Random Quotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {error.errorText ? (
        <h2>{error.errorText}</h2>
      ) : (
        <QuoteDisplay
          isLoading={isLoading}
          index={index}
          author={data[index].author}
          quote={data[index].content}
          id={data[index]._id}
          nextOnclick={nextQuote}
          previousOnclick={previousQuote}
          favoriteOnclick={favoriteQuote}
          unfavoriteOnclick={unfavoriteQuote}
          favorites={favorites}
        />
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: await getQuote(),
  };
};

export default Home;
