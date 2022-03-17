const Button = ({ onClick, text, styles }) => {
  return (
    <button onClick={onClick} style={styles}>
      {text}
    </button>
  );
};

export default Button;
