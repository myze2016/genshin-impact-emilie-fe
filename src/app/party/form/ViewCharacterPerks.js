import { FormControl, InputLabel, Input, FormHelperText, Grid } from "@mui/material";
const ViewCharacterPerks = ({ formData, setFormData, handleChangeForm }) => {
    return (
        <Grid container spacing={2}>
            <form>
                <Grid size="12">
                    <FormControl>
                        <InputLabel htmlFor="my-input">Name</InputLabel>
                        <Input name="name" value={formData?.name} onChange={handleChangeForm} id="my-input" aria-describedby="my-helper-text" />
                        <FormHelperText hidden id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid size="12">
                    <FormControl>
                        <InputLabel htmlFor="my-input">Description</InputLabel>
                        <Input name="description" value={formData?.description} onChange={handleChangeForm} id="my-input" aria-describedby="my-helper-text" />
                        <FormHelperText hidden id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid size="12">
                    <FormControl>
                        <InputLabel htmlFor="my-input">Element</InputLabel>
                        <Input name="element" value={formData?.element} onChange={handleChangeForm} id="my-input" aria-describedby="my-helper-text" />
                        <FormHelperText hidden id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid size="12">
                    <FormControl>
                        <InputLabel htmlFor="my-input">Value</InputLabel>
                        <Input name="value" value={formData?.value} onChange={handleChangeForm} id="my-input" aria-describedby="my-helper-text" />
                        <FormHelperText hidden id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                </Grid>
            </form>
        </Grid>
    );
}
export default ViewCharacterPerks