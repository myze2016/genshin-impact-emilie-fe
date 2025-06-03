import { Dialog,DialogActions,DialogContent,DialogTitle,Button } from "@mui/material"
const CustomDialog = ({ size = "md", open, handleClose = ((e) => {}), handleConfirm = ((e) => {}), cancelText = "Cancel", confirmText = "Confirm", title, content = "" }) => {
    return (
        <Dialog
        maxWidth={size}
        fullWidth={true}
        open={open}
        onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <hr></hr>
            <DialogContent sx={{ py: 3 }}>
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
export default CustomDialog