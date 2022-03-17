import Head from "next/head";
import styles from "../styles/Home.module.css";
import QuoteDisplay from "../components/QuoteDisplay";
import { useState } from 'react';
import { getQuote } from '../lib/datasource';

const Home = (props) => {
  const [data, setData] = useState(props);
  const nextQuote = async () => {
    const newData = await getQuote();
    setData(newData);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Random Quotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QuoteDisplay
        author={data.author}
        quote={data.content}
        id={data._id}
        buttonClick={nextQuote}
      />
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: await getQuote()
  }
};

export default Home;
