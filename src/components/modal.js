const Modal = ({ open, handleClose, content = "" }) => {
    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
           {
            content
           }
        </Box>
        </Modal>
    )
}
export default Modal