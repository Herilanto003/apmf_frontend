import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Button,
} from '@mui/material';
import axios from 'axios';
import { useMyRefresh } from '../context/refreshContext/Refresh';
import Global from '../config/global';
import {toast} from 'react-toastify';

const DialogDelete = ({ title, content, open, handleClose, linkDelete }) => {
    // refresh variable
    const { handleRefresh } = useMyRefresh();

    const conf = Global()
    // supprimer le port
    const handleAccept =async () => {
        await axios.delete(
            linkDelete,
            conf
        )
            .then(resp => {
                console.log(resp);
                toast.success(`Suppression avec succès`, {theme: 'colored'})
            })
            .catch(err => {
                console.log(err);
            })
        
        handleClose()
        handleRefresh();
    }

    return (
        <Dialog
            open={open}
            onClose= {handleClose}
            maxWidth='md'
        >
            <DialogTitle>{ title }</DialogTitle>

            <DialogContent>
                { content }
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color='error' autoFocus>non</Button>
                <Button onClick={handleAccept} autoFocus>OUI</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogDelete;
