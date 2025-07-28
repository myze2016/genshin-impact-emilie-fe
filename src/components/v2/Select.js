import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
const CustomSelectV2 = ({
  options = [],
  id = "select",
  name = "select",
  value = options[0]?.value || "",
  label = "Select",
  variant = "outlined",
  size = "small",
  placeholder = "Select Option",
  handleChange = (e) => {},
  fullWidth = false,
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        value={value}
        label={label}
        variant={variant}
        size={size}
        onChange={(e) => handleChange(e)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default CustomSelectV2;
