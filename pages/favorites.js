import Head from "next/head";
import { useState, useEffect } from "react";
import { getFavoritesFromStorage } from "../lib/helpers";
import NavBar from "../components/NavBar";
import QuoteDisplay from "../components/QuoteDisplay";

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [storageFavs, setStorageFavs] = useState({});

  useEffect(() => {
    const favs = getFavoritesFromStorage();
    setStorageFavs(favs);
    const fasvArr = Object.keys(favs).map((el) => favs[el]);
    setFavorites(fasvArr);
  }, []);

  return (
    <>
      <Head>
        <title>Favorite Quotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <h1>favorites</h1>
      {favorites.length ? (
        <ul>
          {favorites.map((el) => {
            return (
              <li key={el._id}>
                <QuoteDisplay
                  author={el.author}
                  quote={el.content}
                  id={el._id}
                  hideButtons
                  favorites={storageFavs}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>{"You have no favorites!"}</p>
      )}
    </>
  );
};

export default Favorites;
