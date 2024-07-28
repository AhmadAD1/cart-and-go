import React, { useEffect, useState } from 'react';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { useApiProvider } from '../../providers/apiProvider';
import { MdClose } from 'react-icons/md';

const ErrorSnackBar = () => {
    const { error } = useApiProvider();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [error]);
    return (
        <Snackbar
            open={open}
            autoHideDuration={10000}
            onClose={e => { setOpen(false) }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            action={<IconButton onClick={e => setOpen(false)}><MdClose /></IconButton>}
        >
            <Alert
                onClose={e=>setOpen(false)}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {error}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackBar;