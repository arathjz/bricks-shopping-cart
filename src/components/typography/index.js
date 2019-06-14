import { setTag } from "./functions";

const Typography = ({
  color,
  greyColor,
  variant,
  font,
  children,
  gutterBottom,
  marginT,
  marginB,
  marginL,
  marginR,
  align,
  fontSize,
  className,
  underline
}) => {
  return setTag(
    color,
    greyColor,
    variant,
    font,
    gutterBottom,
    children,
    marginT,
    marginB,
    marginL,
    marginR,
    align,
    fontSize,
    className,
    underline
  );
};

export default Typography;
