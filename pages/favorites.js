import Head from "next/head";
import { useState, useEffect } from "react";
import { getFavoritesFromStorage } from "../lib/helpers";
import NavBar from "../components/NavBar";
import QuoteDisplay from "../components/QuoteDisplay";
import Pagination from "../components/Pagination";

const Favorites = () => {
  const [allFavorites, setAllFavorites] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [storageFavs, setStorageFavs] = useState({});
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState([]);

  const quotesPerPage = 2;

  useEffect(() => {
    const favs = getFavoritesFromStorage();
    setStorageFavs(favs);
    const fasvArr = Object.keys(favs).map((el) => favs[el]);
    setFavorites(fasvArr.slice(0,2));
    setAllFavorites(fasvArr);
    const pages = Math.ceil(fasvArr.length / quotesPerPage);
    const numArr = [];
    for (let i = 1; i <= pages; i++) {
      numArr.push(i);
    }
    setNumOfPages(numArr);
  }, []);

  useEffect(() => {
    const endSlice = page * quotesPerPage;
    const startSlice = endSlice - quotesPerPage;
    const newFavs = allFavorites.slice(startSlice, endSlice);
    if (newFavs.length) {
      setFavorites(newFavs);
    }
  }, [page]);

  const paginationClick = (page) => () => {
    setPage(page);
  };

  return (
    <>
      <Head>
        <title>Favorite Quotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <h1>favorites</h1>
      <Pagination
        currentPage={page}
        numOfPages={numOfPages}
        onClick={paginationClick}
      />
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
