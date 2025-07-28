import { Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
const CustomCardV2 = ({
  width = 345,
  height = 160,
  backgroundImage = "",
  handleClick = (e) => {},
  content = "",
}) => {
  return (
    <Card
      onClick={(e) => handleClick(e)}
      sx={{
        width: width,
        height: height,
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
        transition: "transform 0.1s ease, box-shadow 0.1s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
        "&:active": {
          transform: "scale(0.98)",
          boxShadow: 2,
        },
        position: "relative", // to display icon button position: absolute
      }}
    >
      <CardContent>{content}</CardContent>
    </Card>
  );
};
export default CustomCardV2;
