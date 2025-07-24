import {
  TableCell,
  Button,
  Stack,
  Chip,
  Box,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Fragment } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import CompostOutlinedIcon from "@mui/icons-material/CompostOutlined";
import { useState, useEffect } from "react";

const characterTable = ({
  openAddCharacterPerksDialog,
  handleOpenWeaponDialog,
  handlOpenArtifactDialog,
}) => {
  const [stealth, setStealth] = useState("");
  useEffect(() => {
    const isStealth = localStorage.getItem("stealth") === "true";
    setStealth(isStealth);
  }, []);

  const columns = [
    {
      name: " ",
      value: "icon_side_url",
      width: "100px",
      cell: (item, index) => {
        return (
          <TableCell
            sx={{ minWidth: "100px", textAlign: "center" }}
            key={index}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <img
                src={
                  stealth
                    ? "https://genshin.jmp.blue/characters/tighnari/gacha-splash.png"
                    : item?.icon_side_url
                }
                alt={item?.name}
                style={{ width: 50, height: 57 }}
              />{" "}
            </Box>
          </TableCell>
        );
      },
    },
    {
      name: "Name",
      value: "name",
      cell: (item, index) => {
        return (
          <TableCell key={index} align="left">
            {item?.name}
          </TableCell>
        );
      },
    },
    {
      name: "Element",
      value: "element",
      cell: (item, index) => {
        return (
          <TableCell sx={{ width: "10%" }} key={index} align="left">
            {item?.element?.name}
          </TableCell>
        );
      },
    },
    {
      name: "Weapon",
      value: "weapon",
      cell: (item, index) => {
        return (
          <TableCell sx={{ width: "10%" }} key={index} align="left">
            {item?.weapon_type?.name}
          </TableCell>
        );
      },
    },
    {
      name: "Perk",
      value: "perk",
      cell: (item, index) => {
        return (
          <TableCell key={index} sx={{ width: "50%" }} align="left">
            {" "}
            <Stack direction="row" sx={{ flexWrap: "wrap", rowGap: 1 }}>
              {item?.weapons?.map((weapon, index) =>
                weapon.weapon?.perks?.map((perk, index) => (
                  <Chip
                    key={index}
                    icon={<ConstructionOutlinedIcon />}
                    label={perk?.perk?.name}
                    color="secondary"
                    variant={"contained"}
                    sx={{ fontSize: "16px", mr: 1 }}
                  />
                ))
              )}
              {item?.artifacts?.map((artifact, index) =>
                artifact.artifact?.perks?.map((perk, index) => (
                  <Chip
                    icon={<CompostOutlinedIcon />}
                    key={index}
                    label={perk?.perk?.name}
                    color="info"
                    variant={"contained"}
                    sx={{ fontSize: "16px", mr: 1 }}
                  />
                ))
              )}
              {item?.perks?.map((perk, index) => (
                <Chip
                  key={index}
                  label={perk?.perk?.name}
                  color="primary"
                  variant={"contained"}
                  sx={{ fontSize: "16px", mr: 1 }}
                />
              ))}
            </Stack>
          </TableCell>
        );
      },
    },
    {
      name: "Actions",
      value: "",
      cell: (item, index) => {
        return (
          <TableCell key={index} align="left" sx={{ whiteSpace: "nowrap" }}>
            <Tooltip title="Add Perks">
              <IconButton
                onClick={(e) => openAddCharacterPerksDialog(item)}
                color="primary"
                size="small"
                sx={{ m: 0.5 }}
              >
                <ArrowCircleUpIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add Weapons">
              <IconButton
                onClick={(e) => handleOpenWeaponDialog(item)}
                color="error"
                size="small"
                sx={{ m: 0.5 }}
              >
                <ConstructionOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add Artifacts">
              <IconButton
                onClick={(e) => handlOpenArtifactDialog(item)}
                color="info"
                size="small"
                sx={{ m: 0.5 }}
              >
                <CompostOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </TableCell>
        );
      },
    },
  ];

  return {
    columns,
  };
};

export default characterTable;
