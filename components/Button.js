import Image from 'next/image';


const Button = ({ onMouseEnter, onMouseLeave, onClick, text, className, index, image, imageSize, imageStyle }) => {
  return (
    <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} disabled={index === 0} onClick={onClick} className={className}>
      {image ? (
        <Image className={imageStyle} src={image} width={imageSize.width} height={imageSize.height} />
      ) : text}
    </button>
  );
};

export default Button;
