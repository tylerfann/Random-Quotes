import Head from "next/head";
import styles from "../styles/Home.module.css";
import QuoteDisplay from "../components/QuoteDisplay";
import { useEffect, useState } from "react";
import { getQuote } from "../lib/datasource";
import { getFavoritesFromStorage, setFavoritesInStorage } from "../lib/helpers";

const Home = (props) => {
  const [data, setData] = useState([props]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({ errorText: "" });
  const [index, setIndex] = useState(0);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const favs = getFavoritesFromStorage();
    setFavorites(favs);
  }, []);

  const nextQuote = async () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
    } else {
      setLoading(true);
      const newData = await getQuote();
      if (newData.errorText) {
        setError(newData);
        setLoading(false);
      } else if (newData) {
        setData([...data, newData]);
        setIndex(index + 1);
        setError({ errorText: "" });
        setLoading(false);
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
    <div className={styles.container}>
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
