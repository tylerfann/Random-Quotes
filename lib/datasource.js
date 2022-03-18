import axios from 'axios';

export const getQuote = async (page) => {
  try {
    const res = await axios.get(`https://api.quotable.io/quotes?page=${page}&limit=2`);
    return res.data;
  } catch (error) {
    console.error(error);
    return {
      errorText: 'Sorry there was error fetching Quotes'
    };
  }
};
