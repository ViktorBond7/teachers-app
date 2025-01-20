import sprite from "../img/symbol-defs.svg";

const IconSvg = ({ width, height, iconName, className }) => {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`${sprite}#${iconName}`}></use>
    </svg>
  );
};

export default IconSvg;
