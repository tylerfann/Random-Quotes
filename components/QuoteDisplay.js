import Button from "./Button";

const QuoteDisplay = ({ quote, author, id, buttonClick }) => {
  return (
    <div key={id}>
      <h3>{quote}</h3>
      <p>{author}</p>
      <Button
        text="next"
        styles={{ color: "red" }}
        onClick={buttonClick}
      />
    </div>
  );
};

export default QuoteDisplay;
