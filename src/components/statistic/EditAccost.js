import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControl, Select, TextField, Button, FormHelperText, InputLabel, MenuItem, Box } from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Global from '../../config/global';
import {useMyRefresh} from '../../context/refreshContext/Refresh';

const EditAccost = ({ open, handleClose, idUpdate, values }) => {
    const {handleRefresh} = useMyRefresh();
    const config = Global();

    // DEBUT DE CONFIGURATION DE FORMIK

    const validationSchema = yup.object({
        numero_escale: yup.string().required('Le numero escale n est pas être vide'),
        type_desserte: yup.string().required('Veuillez selectionner le type de desserte'),
        passage_embarque: yup.number().required('Veuillez compléter le champ met 0 s il n y a pas'),
        passage_debarque: yup.number().required('Veuillez compléter le champ, met zéro s il n y pas'),
        id_navire_accoste: yup.number().required('Veuillez selectionner le navire'),
        id_port_accoste: yup.number().required('Veuillez selectionner votre port'),
        date_enreg: yup.date(),
        id_port_prov: yup.number().required('Veuillez selectionner le port de provenance'),
        id_port_dest: yup.number().required('Veuillez selectionner le port de destination'),
        date_heure_arrive: yup.date().required('Veuillez selectionner la date s il vous plait'),
        date_heure_depart: yup.date().required('Veuillez selectionner la date s il vous plait'),
    });

    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (val) => {
            console.log('val', val);
            axios.put(`/api/accostage/edit/${idUpdate}`, val)
                    .then(response => {
                        console.log(response.data);
                        handleRefresh();
                        handleClose();
                    })
                    .catch(error => {
                        console.log(error);
                    })
        },
    })

    console.log('formik', formik.values);

    // FIN DE CONFIGURATION DE FORMIK

    // obtenir tous les navires et les ports
    const [port, setPort] = React.useState([]);
    const [navire, setNavire] = React.useState([]);
    React.useEffect(() => {
        axios.get(`/api/port/all`, config)
                .then(response => {
                    console.log('port', response.data);
                    setPort(response.data)
                })
                .catch(error => {
                    console.log(error);
                })

        axios.get(`/api/navire/all`, config)
                .then(response => {
                    console.log('navire', response);
                    setNavire(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
    }, [])    

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >

            <DialogTitle>Modification du touche navire N ° {idUpdate} </DialogTitle>

            <DialogContent>
                <form>
                    <FormControl fullWidth sx={{ marginTop: 2 }}>
                        <InputLabel id='id_port_accoste'> Votre port </InputLabel>
                        <Select label='Votre port' labelId='id_port_accoste'
                            value={formik.values.id_port_accoste}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.id_port_accoste && Boolean(formik.errors.id_port_accoste)}
                        >
                        {
                            port.map(elem => (
                                <MenuItem value={elem.id_port} key={elem.id_port} > {elem.nom_port} </MenuItem>
                            ))
                        }
                        </Select>
                        {
                            formik.touched.id_port_accoste && <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.id_port_accoste} </FormHelperText>
                        }
                    </FormControl>

                    <FormControl fullWidth sx={{ marginTop: 2 }} >
                        <InputLabel id='id_navire'> Le navire </InputLabel>
                        <Select label='Le navire' labelId='id_navire' name='id_navire_accoste'
                            value={formik.values.id_navire_accoste}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.id_navire_accoste && Boolean(formik.errors.id_navire_accoste)}
                        >
                            {
                                navire.map(elem => (
                                    <MenuItem value={elem.id_navire} key={elem.id_navire} > {elem.immatricule_navire} - {elem.nom_navire} </MenuItem>
                                ))
                            }
                        </Select>
                        {
                            formik.touched.id_navire_accoste && <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.id_navire_accoste} </FormHelperText>
                        }
                    </FormControl>

                    <Box width={'100%'} display='grid' gridTemplateColumns={'1fr 1fr'} gap={2} marginTop={2}>
                        <TextField InputLabelProps={{ shrink: true }} label='Date et heure arrivée' name='date_heure_arrive' type='datetime-local' fullWidth 
                            value={formik.values.date_heure_arrive}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.date_heure_arrive && Boolean(formik.errors.date_heure_arrive)}
                            helperText={formik.touched.date_heure_arrive && formik.errors.date_heure_arrive}
                        />
                        <TextField InputLabelProps={{ shrink: true }} label='Date et heure départ' name='date_heure_depart' type='datetime-local' fullWidth 
                            value={formik.values.date_heure_depart}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.date_heure_depart && Boolean(formik.errors.date_heure_depart)}
                            helperText={formik.touched.date_heure_depart && formik.errors.date_heure_depart}
                        />

                        <FormControl fullWidth>
                            <InputLabel id='id_port_prov' > Le port de provenance </InputLabel>
                            <Select label='Port de provenance' labelId='id_port_prov' name='id_port_prov'
                                value={formik.values.id_port_prov}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.id_port_prov && Boolean(formik.errors.id_port_prov)}
                            >
                            {
                                port.map(elem => (
                                    <MenuItem value={elem.id_port} key={elem.id_port} > {elem.nom_port} </MenuItem>
                                ))
                            }
                            </Select>
                            {
                                formik.touched.id_port_prov && <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.id_port_prov} </FormHelperText>
                            }
                        </FormControl>
                        
                        <FormControl fullWidth>
                            <InputLabel id='id_port_dest' > Le port de destination </InputLabel>
                            <Select label='Port de destination' labelId='id_port_dest' name='id_port_dest'
                                value={formik.values.id_port_dest}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.id_port_dest && Boolean(formik.errors.id_port_dest)}
                            >
                            {
                                port.map(elem => (
                                    <MenuItem value={elem.id_port} key={elem.id_port} > {elem.nom_port} </MenuItem>
                                ))
                            }
                            </Select>
                            {
                                formik.touched.id_port_dest && <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.id_port_dest} </FormHelperText>
                            }
                        </FormControl>
                    </Box>

                    <TextField label='Numero escale' type='text' name='numero_escale' fullWidth sx={{ marginTop: 2 }} 
                        value={formik.values.numero_escale}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.numero_escale && Boolean(formik.errors.numero_escale)}
                        helperText={formik.touched.numero_escale && formik.errors.numero_escale}
                    />

                    <FormControl fullWidth sx={{ marginTop: 2 }}>
                        <InputLabel id='id_type_desserte'>Type de desserte</InputLabel>
                        <Select label='Type de desserte' labelId='id_type_desserte' name='type_desserte'
                            value={formik.values.type_desserte}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.type_desserte && Boolean(formik.errors.type_desserte)}
                        >
                            <MenuItem value={'CN'}>CN</MenuItem>
                            <MenuItem value={'CILC'}>CILC</MenuItem>
                            <MenuItem value={'CIR'}>CIR</MenuItem>
                            <MenuItem value={'BO'}>BO</MenuItem>
                        </Select>
                        {
                            formik.touched.type_desserte && <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.type_desserte} </FormHelperText>
                        }
                    </FormControl>

                    <Box marginTop={2} display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={2} width={'100%'}>

                        <TextField type='text' name='passage_embarque' label='Passages embarqués' 
                            value={formik.values.passage_embarque}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.passage_embarque && Boolean(formik.errors.passage_embarque)}
                            helperText={formik.touched.passage_embarque && formik.errors.passage_embarque}
                        />

                        <TextField type='text' label='Passages débarqués' name='passage_debarque' 
                            value={formik.values.passage_debarque}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.passage_debarque && Boolean(formik.errors.passage_debarque)}
                            helperText={formik.touched.passage_debarque && formik.errors.passage_debarque}
                        />

                    </Box>

                    <TextField fullWidth sx={{ marginTop: 2 }} type='date' name='date_enreg' label={'Date d\'enregistrement'} 
                        value={formik.values.date_enreg}
                    />

                </form>
            </DialogContent>

            <DialogActions>
                <Button color='error' startIcon={<Cancel />} onClick={handleClose} >Annuler</Button>
                <Button color='primary' startIcon={<Save />} onClick={formik.handleSubmit} > Sauvegarder </Button>
            </DialogActions>
                
        </Dialog>
    );
}

export default EditAccost;
