"use client";

import {
  Paper,
  TableContainer,
  Table,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  IconButton,
  CardActions,
  TablePagination,
  Box,
  Select,
  MenuItem,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import { getParties, addParty, addPartyImage } from "../../hooks/useParty";
import AddParty from "./form/AddParty";
import CustomDialog from "@/components/dialog";
import { getCharactersName } from "@/hooks/useCharacter";
import AddPartyImage from "./form/AddPartyImage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Spinner from "@/components/Spinner";
import AddIcon from "@mui/icons-material/Add";
import { Add } from "@mui/icons-material";
import CustomTableDialog from "@/components/dialog/table";
import { getElements } from "@/hooks/useElements";
import CustomSearch from "@/components/Search";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useElementContext } from "@/context/ElementContext";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import CustomSearchV2 from "@/components/v2/Search";
import CustomSelectV2 from "@/components/v2/Select";
import { dashboardViewOptions } from "./helper/constants";
import mapPartyToCard from "./helper/mapper";
import CustomBoard from "@/components/v2/Board";
import CustomPaginationV2 from "@/components/v2/Pagination";

export default function Dashboard() {
  const { user, partyContextId, setPartyContextId } = useUser();
  const router = useRouter();
  const [refetchParties, setRefetchParties] = useState(false);
  const [partiesPayload, setPartiesPayload] = useState("");
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("board");
  const [searchInput, setSearchInput] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    data: partiesData,
    loading: partiesLoading,
    total: partiesTotal,
  } = getParties(partiesPayload, refetchParties, search, page + 1, rowsPerPage);

  const [elementsPayload, setElementsPayload] = useState("");
  const [refetchElements, setRefetchElements] = useState(false);
  // const { data: elementsData, loading: elementsLoading } = getElements(elementsPayload, refetchElements)
  const { data: elementsData, loading: elementsLoading } = useElementContext();

  const [addImageDialog, setAddImageDialog] = useState(false);

  const [apiLoading, setApiLoading] = useState(false);
  const [addPartyDialog, setAddPartyDialog] = useState(false);
  const [partyId, setPartyId] = useState("");
  const [stealth, setStealth] = useState("");

  const [partyFormData, setPartyFormData] = useState({
    name: "",
    element_id: "",
    reaction: "",
  });
  const [imageFormData, setImageFormData] = useState({
    character_id: "",
  });

  useEffect(() => {
    const isStealth = localStorage.getItem("stealth") === "true";
    setStealth(isStealth);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchCharacters(searchCharactersInput);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchCharactersInput]);

  const changeFormData = (e, formData, setFormData) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
  };

  const closeAddPartyDialog = (e) => {
    setAddPartyDialog(false);
  };

  const confirmAddPartyDialog = async (e) => {
    setApiLoading(true);
    let response = await addParty(partyFormData);
    if (response?.data?.success) {
      setRefetchParties((prev) => !prev);
      setPartyFormData({
        name: "",
        element_id: "",
        reaction: "",
      });
      setAddPartyDialog(false);
    }
    setApiLoading(false);
  };

  const handleAddPartyImage = (id) => {
    setPartyId(id);
    setAddImageDialog(true);
  };

  const clickCharactersPage = (e, page) => {
    setCharactersPage(page);
  };

  const selectCharactersRows = (e) => {
    setCharactersRows(parseInt(e.target.value, 10));
    setCharactersPage(0);
  };

  const handleSelectView = (e) => {
    setRowsPerPage(20);
    setType(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchCharacters(searchCharactersInput);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchCharactersInput]);

  const handleRedirectParty = (id) => {
    setPartyContextId(id);
    router.push("/party");
  };

  const cards = mapPartyToCard(
    partiesData,
    handleRedirectParty,
    handleAddPartyImage
  );

  return (
    <>
      {apiLoading && <Spinner />}
      <CustomDialog
        open={addPartyDialog}
        size="sm"
        handleClose={closeAddPartyDialog}
        handleConfirm={confirmAddPartyDialog}
        title="Add Party"
        content={
          <AddParty
            partyFormData={partyFormData}
            setPartyFormData={setPartyFormData}
            changeFormData={changeFormData}
            options={elementsData}
          />
        }
      />
      {/* <CustomTableDialog
        open={addImageDialog}
        size="lg"
        handleClose={closeAddImageDialog}
        handleConfirm={closeAddImageDialog}
        title="Add Party Image"
        content={
          <AddPartyImage
            charactersData={charactersData}
            selectImage={selectImage}
            charactersPage={charactersPage}
            charactersTotal={charactersTotal}
            clickCharactersPage={clickCharactersPage}
            charactersRows={charactersRows}
            selectCharactersRows={selectCharactersRows}
            search={searchCharactersInput}
            setSearch={setSearchCharactersInput}
          />
        }
      /> */}
      <addImageDialog
        isOpen={addImageDialog}
        handleClose={(e) => setAddImageDialog(false)}
      ></addImageDialog>

      <Grid container spacing={2}>
        <Grid item size={6}>
          <Button
            color="secondary"
            startIcon={
              <ReplyOutlinedIcon
                sx={{
                  verticalAlign: "middle",
                  position: "relative",
                  top: "-1px",
                }}
              />
            }
            sx={{ "& .MuiButton-startIcon": { mr: 0.5 }, mr: 1, mb: 1 }}
            onClick={(e) => router.back()}
            variant="contained"
          >
            Back
          </Button>
          <Button
            startIcon={
              <AddCircleOutlineIcon
                sx={{
                  verticalAlign: "middle",
                  position: "relative",
                  top: "-1px",
                }}
              />
            }
            sx={{ "& .MuiButton-startIcon": { mr: 0.5 }, mr: 1, mb: 1 }}
            onClick={(e) => setAddPartyDialog(true)}
            variant="contained"
          >
            Add Party
          </Button>
        </Grid>
        <Grid item size={6}>
          <Grid container justifyContent="flex-end" spacing={2}>
            <CustomSelectV2
              handleChange={(e) => handleSelectView(e)}
              value={type}
              options={dashboardViewOptions}
            ></CustomSelectV2>
            <CustomSearchV2
              placeholder="Search Party..."
              setSearch={setSearch}
            ></CustomSearchV2>
          </Grid>
        </Grid>
        <Grid item size={12}>
          {partiesData && type === "board" ? (
            <CustomBoard data={cards}></CustomBoard>
          ) : (
            <Grid container spacing={2}>
              <Fragment>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      {partiesData?.map((party, index) => (
                        <TableRow
                          onClick={(e) => handleRedirectParty(e, party.id)}
                          key={index}
                          hover
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.04)", // adjust as needed
                            },
                          }}
                        >
                          <TableCell>
                            <Typography variant="h6" color="primary">
                              {party?.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="secondary">
                              {party?.description}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleAddPartyImage(party?.id);
                              }}
                            >
                              <AddCircleOutlineIcon sx={{ fontSize: "28px" }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Fragment>
            </Grid>
          )}
        </Grid>
        <Grid item size={{ xs: 12, md: 12, lg: 12 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
            }}
          >
            <CustomPaginationV2
              total={partiesTotal}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            ></CustomPaginationV2>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
