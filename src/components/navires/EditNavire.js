import React from 'react';
import {
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';
import { Cancel, Edit } from '@mui/icons-material';
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Global from '../../config/global';
import {useMyRefresh} from '../../context/refreshContext/Refresh';

const EditNavire = ({ open, handleClose, value, idUpdate }) => {
    const {handleRefresh} = useMyRefresh();
    const confHead = Global()

    // DEBUT OBTENIR LES PAYS
    const [pays, setPays] = React.useState([])

    React.useEffect(() => {
        axios.get('/api/pays/all', confHead)
                .then(resp => {
                    setPays(resp.data)
                })
                .catch(err => {
                    console.log(err);
                })
    }, [])

    // FIN OBTENIR LES PAYS

    // DEBUT CONFIGURATION FORMIK ----------------------------------------------------------------------------

    const initialValues = value;

    const validationSchema = yup.object({
        nom_navire: yup.string().required('Le nom du navire est obligatoire'),
        type_navire: yup.string().required('Veuillez selectionner un type de navire'),
        id_pays_navire: yup.number().required('Veuillez selectionner le pavillon du navire'),
        immatricule_navire: yup.string().required('L\'immatricule du navire est obligatoire'),
        observation_navire: yup.string().required('L\'observation du navire est obligatoire')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            await axios.put(`/api/navire/edit/${idUpdate}`, values, confHead)
                    .then(resp => {
                        console.log(resp);
                        handleRefresh()
                    })
                    .catch(err => {
                        console.log(err);
                    })

            handleClose();
        },
        enableReinitialize: true
    })

    // FIN CONFIGURATION FORMIK ----------------------------------------------------------------------------

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth='xl'
        >
            <DialogTitle>Nouveau navire</DialogTitle>
            <form>
                <DialogContent>
                    <Box component={'div'} display={"grid"} gridTemplateColumns={'1fr 1fr'} gap={2} width={'100%'}>
                        <TextField variant='standard' label='Nom du navire' fullWidth size='small' 
                            value={formik.values.nom_navire}
                            name='nom_navire'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nom_navire && Boolean(formik.errors.nom_navire)}
                            helperText={formik.touched.nom_navire && formik.errors.nom_navire}
                        />
                        <TextField variant='standard' label='Immatricule du navire' fullWidth size='small' 
                            value={formik.values.immatricule_navire}
                            name='immatricule_navire'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.immatricule_navire && Boolean(formik.errors.immatricule_navire)}
                            helperText={formik.touched.immatricule_navire && formik.errors.immatricule_navire}
                        />
                        <FormControl variant='standard' size='small'>
                            <InputLabel id='navire-type'>Type du navire</InputLabel>
                            <Select label='Type du navire' labelId='navire-type'
                                value={formik.values.type_navire}
                                name='type_navire'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.type_navire && Boolean(formik.errors.type_navire)}
                            >
                                <MenuItem value={'BG'}>BG</MenuItem>
                                <MenuItem value={'BP'}>BP</MenuItem>
                                <MenuItem value={'CA'}>CA</MenuItem>
                                <MenuItem value={'CH'}>CH</MenuItem>
                                <MenuItem value={'GZ'}>GZ</MenuItem>
                                <MenuItem value={'PET'}>PET</MenuItem>
                                <MenuItem value={'NS'}>NS</MenuItem>
                                <MenuItem value={'RS'}>RS</MenuItem>
                                <MenuItem value={'NM'}>NM</MenuItem>
                                <MenuItem value={'NP'}>NP</MenuItem>
                                <MenuItem value={'PQ'}>PQ</MenuItem>
                            </Select>
                            {formik.touched.type_navire && <FormHelperText sx={{ color: 'error.main' }}>{ formik.errors.type_navire
                             }</FormHelperText>}
                        </FormControl>
                        <TextField variant='standard' label='Observation' fullWidth size='small' 
                            value={formik.values.observation_navire}
                            name='observation_navire'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.observation_navire && Boolean(formik.errors.observation_navire)}
                            helperText={formik.touched.observation_navire && formik.errors.observation_navire}
                        />
                        <FormControl fullWidth size='small' variant='standard'>
                            <InputLabel id='navire-pays'>Pavillon du navire</InputLabel>
                            <Select label='Pavillon du navire' labelId='navire-pays'
                                value={formik.values.id_pays_navire}
                                name='id_pays_navire'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.id_pays_navire && Boolean(formik.errors.id_pays_navire)}
                            >
                             {
                                pays.map(elem => (
                                    <MenuItem key={elem.id_pays} value={elem.id_pays}> {elem.nom_pays} </MenuItem>
                                ))
                             }
                            </Select>
                            {formik.touched.id_pays_navire && <FormHelperText sx={{ color: 'error.main' }}>{ formik.errors.id_pays_navire
                             }</FormHelperText>}
                        </FormControl>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button size='small' onClick={handleClose} startIcon={<Cancel />} variant='contained' color='error'>Fermer</Button>
                    <Button size='small' onClick={formik.handleSubmit} startIcon={<Edit />} variant='contained' >modifier</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default EditNavire;
