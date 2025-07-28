import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
const CustomSearchV2 = ({
  fullWidth = false,
  label = "Search",
  setSearch,
  defaultSearch = "",
  variant = "outlined",
  size = "small",
  placeholder = "Search...",
}) => {
  const [searchInput, setSearchInput] = useState(defaultSearch);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const handleSearch = (search) => {
    setSearchInput(search);
  };

  return (
    <TextField
      label={label}
      variant={variant}
      size={size}
      placeholder={placeholder}
      fullWidth={fullWidth}
      value={searchInput}
      onChange={(e) => handleSearch(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 18, color: "#a9cbb3" }} />
            </InputAdornment>
          ),
          endAdornment: searchInput && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleSearch("")}
                size="small"
                edge="end"
              >
                <CloseIcon sx={{ fontSize: 18, color: "#a9cbb3" }} />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
export default CustomSearchV2;
