import { Dialog,DialogActions,DialogContent,DialogTitle,Button, CircularProgress } from "@mui/material"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const CustomTableDialog = ({ size = "md", open, handleClose = ((e) => {}), handleConfirm = ((e) => {}), cancelText = "Cancel", confirmText = "Confirm", title, content = "" }) => {
    return (
        <Dialog
        maxWidth={size}
        fullWidth={true}
        open={open}
        onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <hr></hr>
            <DialogContent sx={{ p: 0 }}>
                {content}
            </DialogContent>
            <hr></hr>
            <DialogActions sx={{ py: 2 }}>
                <Button  startIcon={<HighlightOffIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                                  sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}} onClick={handleClose} color="error" variant="contained" size="small">{cancelText}</Button>
                <Button  startIcon={<CheckCircleOutlineIcon sx={{ verticalAlign: 'middle', position: 'relative', top: '-1px',  }} />} 
                                                  sx={{ '& .MuiButton-startIcon': {  mr: 0.5, }}} onClick={handleConfirm} color="primary" variant="contained" size="small">{confirmText}</Button>
            </DialogActions>
      </Dialog>
    )
}
export default CustomTableDialog