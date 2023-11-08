import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Button, FormControl, FormControlLabel, Switch } from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {useMyRefresh} from '../../context/refreshContext/Refresh';

const EditAct = ({ open, handleClose, idUpdate, values }) => {
    const { handleRefresh } = useMyRefresh();
    // DEBUT DE CONFIGURATION FORMIK
    const validationSchema = yup.object({
        nom_act: yup.string().required('Le nom d actionnaire est obligatoire'),
        adresse_act: yup.string().required('Le domicile de l actionnaire est obligatoire'),
        tel_act: yup.string().required('Le numéro téléphone est obligatoire'),
        email_act: yup.string().required('L adresse email est obligatoire'),
        personne: yup.boolean(),
        role: yup.string(),
    })
    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: async (val) => {
            console.log('val', val);
            await axios.put(`/api/marchandise/edit/one-act/${idUpdate}`, val)
                        .then(response => {
                            console.log(response);
                            handleClose();
                            handleRefresh();
                        })
                        .catch(error => {
                            console.log(error);
                        }) 
        },
        onReset: () => {
            console.log('RESET');
        },
        enableReinitialize: true
    })
    console.log(formik.values);

    // FIN DE CONFIGURATION FORMIK
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
        
            <DialogTitle>Modification du marchandise</DialogTitle>

            <DialogContent>
                <form>
                    <Box>
                        <TextField label='Nom' type='text' fullWidth sx={{ marginTop: '20px' }} 
                            value={formik.values.nom_act}
                            name='nom_act'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nom_act && Boolean(formik.errors.nom_act)}
                            helperText={formik.touched.nom_act && formik.errors.nom_act} 
                        />
                        <TextField label='Contact' type='text' fullWidth sx={{ marginTop: '20px' }} 
                            value={formik.values.tel_act}
                            name='tel_act'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.tel_act && Boolean(formik.errors.tel_act)}
                            helperText={formik.touched.tel_act && formik.errors.tel_act} 
                        />
                        <TextField label='Domicile' type='text' fullWidth sx={{ marginTop: '20px' }}  
                            value={formik.values.adresse_act}
                            name='adresse_act'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.adresse_act && Boolean(formik.errors.adresse_act)}
                            helperText={formik.touched.adresse_act && formik.errors.adresse_act} 
                        />
                        <TextField label='Email' type='text' fullWidth sx={{ marginTop: '20px' }} 
                            value={formik.values.email_act}
                            name='email_act'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_act && Boolean(formik.errors.email_act)}
                            helperText={formik.touched.email_act && formik.errors.email_act} 
                        />
                        <TextField label='Role' type='text' fullWidth sx={{ marginTop: '20px' }} 
                            value={formik.values.role}
                            name='role'
                            contentEditable={false}
                        />
                        <FormControl fullWidth sx={{ marginTop: '20px' }}>
                            <FormControlLabel control={<Switch name='personne' checked={formik.values.personne} onChange={formik.handleChange} />} label='Personne' />
                        </FormControl>
                    </Box>
                </form>                                    
            </DialogContent>

            <DialogActions>
                <Button startIcon={<Cancel />} variant='contained' color='error' onClick={handleClose}>Annuler</Button>
                <Button startIcon={<Save />} variant='contained' onClick={formik.handleSubmit} >modifier</Button>
            </DialogActions>
        
        </Dialog>
    );
}

export default EditAct;
