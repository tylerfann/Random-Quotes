const Button = ({ onClick, text, className, index }) => {
  return (
    <button disabled={index === 0} onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default Button;
