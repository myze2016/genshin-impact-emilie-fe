import { Dialog,DialogActions,DialogContent,DialogTitle,Button } from "@mui/material"
const CustomDialog = ({ size = "md", open, handleClose = ((e) => {}), handleConfirm = ((e) => {}), cancelText = "Cancel", confirmText = "Confirm", title, content = "" }) => {
    return (
        <Dialog
        maxWidth={size}
        fullWidth={true}
        open={open}
        onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>{cancelText}</Button>
            <Button onClick={handleConfirm}>{confirmText}</Button>
            </DialogActions>
      </Dialog>
    )
}
export default CustomDialog