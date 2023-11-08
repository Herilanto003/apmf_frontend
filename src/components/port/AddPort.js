import { Cancel, Save } from '@mui/icons-material';
import { 
    Box, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    FormControl, 
    FormControlLabel, 
    FormHelperText, 
    InputLabel, 
    MenuItem, 
    Select, 
    Switch, 
    TextField
} from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Global from '../../config/global';
import {useMyRefresh} from '../../context/refreshContext/Refresh';
import { toast } from 'react-toastify';

const AddPort = ({ open, handleClose }) => {
    const {handleRefresh} = useMyRefresh();
    const confHead = Global();
    // ****************************////////////////////////***************** */
    // les states
    // state pour pays
    const [pays, setPays] = React.useState([]);

    // *****************************/ ////////////////////// ///* ************/

    // début de configuration de formik *************-------------------------------------------------

    const initialValues = {
        nom_port: '',
        id_pays_port: '',
        apmf: true,
        status: ''
    };

    const validationSchema = yup.object({
        nom_port: yup.string().required('Le ville du port est obligatoire'),
        id_pays_port: yup.number().required('Veuillez selectionner un pays'),
        apmf: yup.boolean(),
        status: yup.string().required('Veuillez selectionner un status')
    });

    console.log({...confHead.headers, 'Content-Type': 'application/json'});

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log('values', values);
            axios.post(
                '/api/port/new',
                values,
                {
                    headers: {...confHead.headers, 'Content-Type': 'application/json'}
                }
            )
                .then(async (resp) => {
                    console.log(resp);
                    await handleRefresh();
                    toast.success('Port ajouté avec succès', { theme: 'colored' })
                    handleClose()
                    formik.handleReset()
                })
                .catch(err => {
                    console.log(err);
                    toast.error('Vérifie les données')
                }) 

            handleRefresh();
        },

        onReset: () => {
            console.log('RESET');
            handleClose()
        }
    })
    // fin de configuration de formik *************---------------------------------------------------

    // inclure les pays
    React.useEffect(() => {
        axios.get('/api/pays/all', confHead)
            .then(resp => {
                console.log(resp.data);
                setPays(resp.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth='md'
        >
            <DialogTitle>
                Nouveau port
            </DialogTitle>

            <form>
                <DialogContent>
                    <Box component={"div"} sx={styles.inputContainer}>
                        <TextField label='Ville du port' type='text' variant='standard' fullWidth size='small' 
                            value={formik.values.nom_port}
                            name='nom_port'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nom_port && Boolean(formik.errors.nom_port)}
                            helperText={formik.touched.nom_port && formik.errors.nom_port}
                        />
                        
                        <FormControl variant='standard' fullWidth size='small'>
                            <InputLabel id='id-pays-port'>Pays où se trouve le port</InputLabel>
                            <Select label='Pays où se trouve le port' labelId='id-pays-port'
                                value={formik.values.id_pays_port}
                                name='id_pays_port'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.id_pays_port && Boolean(formik.errors.id_pays_port)}
                            >   
                                {
                                    pays.map((elem) => (
                                        <MenuItem key={elem.id_pays} value={elem.id_pays}> {elem.nom_pays} </MenuItem>
                                    ))
                                }
                            </Select>
                            {formik.touched.id_pays_port && (<FormHelperText sx={{ color: 'error.main' }}>{ formik.errors.id_pays_port }</FormHelperText>)}
                        </FormControl>
                        
                        <FormControl variant='standard' fullWidth size='small'>
                            <InputLabel id='status-port'>Status du port</InputLabel>
                            <Select label='Status du port' labelId='status-port'
                                value={formik.values.status}
                                name='status'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.status && Boolean(formik.errors.status)}
                            > 
                                <MenuItem value={'PIR'}>PIR</MenuItem>
                                <MenuItem value={'PIN'}>PIN</MenuItem>
                            </Select>
                            {formik.touched.status && (<FormHelperText sx={{ color: 'error.main' }}>{ formik.errors.status }</FormHelperText>)}
                        </FormControl>
                        
                        <FormControl fullWidth size='small'>
                            <FormControlLabel control={<Switch checked={formik.values.apmf} onChange={formik.handleChange} name='apmf' />} label="Présence APMF" />
                        </FormControl>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button startIcon={<Cancel />} color='error' onClick={formik.handleReset}>Annuler</Button>
                    <Button startIcon={<Save />} autoFocus onClick={formik.handleSubmit} type='sumbit'>Enregistrer</Button>
                </DialogActions>
            
            </form>
        </Dialog>
    );
}

/** @type import('@mui/material').SxProps */
const styles = {
    inputContainer: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 2
    }
}

export default AddPort;
