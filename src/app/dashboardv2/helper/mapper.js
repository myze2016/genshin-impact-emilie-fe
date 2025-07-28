import { Fragment } from "react";
import { Typography, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function mapPartyToCard(
  partiesData,
  handleRedirectParty,
  handleAddPartyImage
) {
  return partiesData?.map((party) => ({
    image: party?.character?.gacha_splash_url,
    handleClick: (e) => handleRedirectParty(party?.id),
    content: (
      <Fragment>
        <Typography gutterBottom variant="h6" component="div">
          {party?.name}
        </Typography>
        <Typography variant="body2">{party?.description}</Typography>
        <IconButton
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleAddPartyImage(party?.id);
          }}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: "28px" }} />
        </IconButton>
      </Fragment>
    ),
  }));
}
