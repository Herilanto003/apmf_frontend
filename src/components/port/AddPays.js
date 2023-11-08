import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    TextField,
    Button
} from '@mui/material';
import { Cancel } from '@mui/icons-material';

const AddPays = () => {
    return (
        <Dialog>
            <DialogTitle>
                Nouveau pays
            </DialogTitle>

            <DialogContent>
                <Box>
                    <TextField />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button startIcon={<Cancel />} >Fermer</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddPays;
