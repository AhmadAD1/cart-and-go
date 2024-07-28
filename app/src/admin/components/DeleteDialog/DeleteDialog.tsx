import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps } from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onYesClick: () => void;
  type: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, setOpen, onYesClick, type }) => {
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="sm"
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogContent dividers>
        <DialogContentText>Are you sure you want to delete this {type}?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" autoFocus onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button color="warning" variant="contained" onClick={onYesClick}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
