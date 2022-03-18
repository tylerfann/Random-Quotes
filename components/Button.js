const Button = ({ onClick, text, styles, index }) => {
  return (
    <button disabled={index === 0} onClick={onClick} style={styles}>
      {text}
    </button>
  );
};

export default Button;
