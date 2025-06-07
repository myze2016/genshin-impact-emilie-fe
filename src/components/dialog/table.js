import { Dialog,DialogActions,DialogContent,DialogTitle,Button, CircularProgress } from "@mui/material"
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
                <Button onClick={handleClose} color="error" variant="contained" size="small">{cancelText}</Button>
                <Button onClick={handleConfirm} color="primary" variant="contained" size="small">{confirmText}</Button>
            </DialogActions>
      </Dialog>
    )
}
export default CustomTableDialog