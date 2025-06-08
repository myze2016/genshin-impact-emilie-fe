import { Dialog,DialogActions,DialogContent,DialogTitle,Button, CircularProgress, Typography } from "@mui/material"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const CustomConfirmDialog = ({ size = "xs", open, handleClose = ((e) => {}), handleConfirm = ((e) => {}), cancelText = "Cancel", confirmText = "Confirm", title, content = "", loading=false, message }) => {
    return (
        <Dialog
        maxWidth={size}
        fullWidth={true}
        open={open}
        onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <hr></hr>
            <DialogContent sx={{ py: 3 }}>
                <Typography variant="subtitle1"> {message} </Typography>
            </DialogContent>
            <hr></hr>
            <DialogActions sx={{ py: 2 }}>
                <Button startIcon={<HighlightOffIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                                  sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}} onClick={handleClose} color="error" variant="contained" size="small">{cancelText}</Button>
                <Button startIcon={<CheckCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                                  sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}} onClick={handleConfirm} color="primary" variant="contained" size="small">{confirmText}</Button>
            </DialogActions>
      </Dialog>
    )
}
export default CustomConfirmDialog