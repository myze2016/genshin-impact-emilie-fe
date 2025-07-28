const addImageDialog = ({ isOpen, handleClose }) => {
  const [page, setPage] = useState(0);
  const [payload, setPayload] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(9);

  const { data: charactersData, total: charactersTotal } = getCharactersName(
    addImageDialog,
    payload,
    refetch,
    search,
    page + 1,
    rowsPerPage
  );

  const selectImage = async (character) => {
    setApiLoading(true);
    let response = await addPartyImage({
      character_id: character.id,
      party_id: partyId,
    });
    if (response?.data?.success) {
      setRefetchParties((prev) => !prev);
      setAddImageDialog(false);
    }
    setApiLoading(false);
  };

  return (
    <CustomTableDialog
      open={isOpen}
      size="lg"
      handleClose={handleClose}
      handleConfirm={handleClose}
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
    />
  );
};
export default AddArtifactsForm;
