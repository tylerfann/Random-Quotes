import Head from "next/head";
import styles from "../styles/Home.module.css";
import QuoteDisplay from "../components/QuoteDisplay";
import { useState } from "react";
import { getQuote } from "../lib/datasource";

const Home = (props) => {
  const [data, setData] = useState(props.results);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({ errorText: "" });

  const nextQuote = async () => {
    const newIndex = index + 1;
    if (data[newIndex]) {
      setIndex(newIndex);
    } else {
      setLoading(true);
      const nextPage = page + 1;
      const newData = await getQuote(nextPage);
      if (newData.errorText) {
        setError(newData);
        setLoading(false);
      } else if (newData) {
        setLoading(false);
        const combinedData = data.concat(newData.results);
        setData(combinedData);
        setIndex(newIndex);
        setPage(nextPage);
      }
    }
  };

  const previousQuote = () => {
    const previousIndex = index - 1;
    if (data[previousIndex]) {
      setIndex(previousIndex);
    }
  };

  const favoriteQuote = () => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const json = JSON.parse(favorites);
      if (json.length > 0) {
        const found = json.find((el) => el._id === data[index]._id);
        if (!found) {
          json.push(data[index]);
          const stringData = JSON.stringify(json);
          localStorage.setItem("favorites", stringData);
        }
      }
    } else {
      const stringData = JSON.stringify([data[index]]);
      localStorage.setItem("favorites", stringData);
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
        />
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: await getQuote(1),
  };
};

export default Home;
