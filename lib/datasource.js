import axios from 'axios';

const url = "https://api.quotable.io/random";

export const getQuote = async () => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
