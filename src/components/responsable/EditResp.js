import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Box,
    TextField,
    FormControl,
    FormControlLabel,
    Switch,
    Button,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {useMyRefresh} from '../../context/refreshContext/Refresh';

const EditResp = ({ open, handleClose, values, idUpdate }) => {
    const {handleRefresh} = useMyRefresh();
    // obtenir tous les accostages disponibles
    const [accostages, setAccostages] = React.useState([])
    React.useEffect(() => {
        axios.get('/api/accostage/all')
                .then(resp => {
                    setAccostages(resp.data)
                })
                .catch(err => {
                    console.log(err);
                })
    }, [])
    console.log(values);

    const validationSchema = yup.object({
        nom_resp: yup.string().required('Le nom est obligatoire'),
        tel_resp: yup.string().required('Le numero est obligatoire'),
        email_resp: yup.string().required('Email est obligatoire'),
        role_resp: yup.string(),
        personne: yup.boolean(),
        id_accoste_resp: yup.number()
    })
    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (val) => {
            console.log('val', val);
            await axios.put('/api/resp-navire/edit/'+idUpdate, {
                nom_resp: val.nom_resp,
                email_resp: val.email_resp,
                personne: val.personne,
                id_accoste_resp: val.id_accoste_resp,
                tel_resp: val.tel_resp,
                role_resp: val.role_resp
            })
                .then(resp=> {
                    console.log(resp);
                    handleRefresh();
                })
                .catch(err => {
                    console.log(err);
                })

            handleClose()
        }
    })

    console.log(values);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Modification</DialogTitle>

            <DialogContent>
                <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={2} paddingY={2}>
                    <FormControl fullWidth >
                        <InputLabel id='id_acc'>Id accostage</InputLabel>
                        <Select
                            label='Id accostage'
                            labelId='id_acc'
                            value={formik.values.id_accoste_resp}
                            onChange={formik.handleChange}
                            name='id_accoste_resp'
                        >
                            {
                                accostages.map(elem => (
                                    <MenuItem key={elem.id_accostage} value={elem.id_accostage} > {elem.id_accostage} </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField fullWidth label='Nom' name='nom_resp' type='text' 
                        value={formik.values.nom_resp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.nom_resp && Boolean(formik.errors.nom_resp)}
                        helperText={formik.touched.nom_resp && formik.errors.nom_resp}
                    />
                    <TextField fullWidth label='Contact' name='tel_resp' type='text' 
                        value={formik.values.tel_resp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.tel_resp && Boolean(formik.errors.tel_resp)}
                        helperText={formik.touched.tel_resp && formik.errors.tel_resp}
                    />
                    <TextField fullWidth label='Email' name='email_resp' type='text' 
                        value={formik.values.email_resp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email_resp && Boolean(formik.errors.email_resp)}
                        helperText={formik.touched.email_resp && formik.errors.email_resp}
                    />
                    <TextField fullWidth label='Role' name='role_resp' type='text' 
                        value={formik.values.role_resp}
                        onBlur={formik.handleBlur}
                        error={formik.touched.role_resp && Boolean(formik.errors.role_resp)}
                        helperText={formik.touched.role_resp && formik.errors.role_resp}
                    />

                    <FormControl fullWidth>
                        <FormControlLabel label='Personne' control={<Switch name='personne' checked={formik.values.personne} onChange={formik.handleChange} />} />
                    </FormControl>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color='error' variant='contained' startIcon={<Cancel />}>fermer</Button>
                <Button onClick={formik.handleSubmit} color='primary' variant='contained' startIcon={<Save />}>sauvegarder</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditResp;
