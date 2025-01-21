const IconSvg = ({ width, height, iconName, className }) => {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`/img/symbol-defs.svg#${iconName}`}></use>
    </svg>
  );
};

export default IconSvg;
