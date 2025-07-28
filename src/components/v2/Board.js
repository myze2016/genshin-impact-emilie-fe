import CustomCardV2 from "./Card";
import { Grid } from "@mui/material";
import { Fragment } from "react";
const CustomBoard = ({ data }) => {
  return (
    <Grid container spacing={2}>
      {data?.map((item, index) => (
        <Fragment key={index}>
          <CustomCardV2
            backgroundImage={item.image}
            handleClick={item.handleClick}
            content={item.content}
          ></CustomCardV2>
        </Fragment>
      ))}
    </Grid>
  );
};

export default CustomBoard;
