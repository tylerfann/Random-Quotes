import axios from 'axios';

export const getQuote = async () => {
  try {
    const res = await axios.get(`https://api.quotable.io/random`);
    return res.data;
  } catch (error) {
    console.error(error);
    return {
      errorText: 'Sorry there was error fetching Quotes'
    };
  }
};
