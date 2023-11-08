import { Cancel, Save } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, TextField, FormControlLabel, Select, MenuItem, FormHelperText, Radio, RadioGroup, FormLabel } from '@mui/material';
import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Global from '../../config/global';
import {useMyRefresh} from '../../context/refreshContext/Refresh';

const EditMerch = ({ open, handleClose, values, idUpdate }) => {
    const {handleRefresh} = useMyRefresh();
    const config = Global();
    // obtenir les toucher navires et ports
    const [accost, setAccost] = React.useState([])
    const [port, setPort] = React.useState([])
    React.useEffect(() => {
        axios.get('/api/accostage/all')
                .then(resp => {
                    setAccost(resp.data)
                })
                .catch(err => {
                    console.log(err);
                })

        axios.get('/api/port/all', config)
                .then(resp => {
                    console.log(resp);
                    setPort(resp.data)
                })
                .catch(err => {
                    console.log(err);
                })
    }, []);

    // DEBUT DE CONFIGURATION DE FORMIK    
    const initialValues = values;
    const validationSchema = yup.object({
        nature_marchandise: yup.string().required('La <natur className="369"></natur>e du marchandise est obligatoire'),
        tonnage: yup.number().required('Veuillez entrer le tonnage'),
        type_marchandise: yup.string().required('Selectionner le type du marchandise'),
        caractere: yup.string(),
        conditionnement: yup.string().required('Selectionner le condiitionnement du marchandise'),
        nombre: yup.number().required('Entrer le nombre du marchandise'),
        observation_marchandise: yup.string().required('L\'observation du marchandise est obligatoire'),
        id_accostage_marchandise: yup.number().required('Selectionner le toucher navire correspondant'),
        nom_operation: yup.string().required('Le nom d opération est obligatoire'),
        type_operation: yup.string().required('Le type d opération est obligatoire'),
        id_port_march: yup.number().required('Selection le port'),
        id_act_marchandise: yup.number()
    })
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (val) => {
            let data = val
            if(val.conditionnement !== 'CONTENEUR'){
                data.caractere = ''
            }
            console.log('data', data)

            axios.put(`/api/marchandise/edit/one/${idUpdate}`, data)
                    .then(response => {
                        console.log('success', response);
                        handleRefresh();
                    })
                    .catch(error => {
                        console.log('error', error);
                    })

            handleClose();
        },
        enableReinitialize: true
    })

    const [sortieType, setSortieType] = React.useState(['Embarquement local', 'Exportation']);
    const [entrerType, setEntrerType] = React.useState(['Débarquement local', 'Importation', 'Transbordement']);

    // FIN DE CONFIGURATION DE FORMIK

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
        
            <DialogTitle>Modification du marchandise</DialogTitle>

            <DialogContent>
                <form>
                    <Box>
                
                        {/** Le navire responsable */}
                        <FormControl fullWidth sx={{ marginTop: '20px' }}>
                            <InputLabel id='navire-merch'>Le toucher navire</InputLabel>
                            <Select label='Le toucher navire' labelId='navire-merch' 
                                name='id_accostage_marchandise'
                                value={formik.values.id_accostage_marchandise}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.id_accostage_marchandise && Boolean(formik.errors.id_accostage_marchandise)}
                            >
                                {
                                    accost.map(elem => (
                                        <MenuItem key={elem.id_accostage} value={elem.id_accostage} > Toucher navire N° {elem.id_accostage} </MenuItem>
                                    ))
                                }
                            </Select>
                            {formik.touched.id_accostage_marchandise && (
                                <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.id_accostage_marchandise} </FormHelperText>
                            )}
                        </FormControl>

                        {/** nature du marchandise */}
                        <TextField label="Numero actionaire" type='text' fullWidth sx={{ marginTop: '20px' }}
                            value={formik.values.id_act_marchandise}
                            name='id_act_marchandise'
                        />

                        {/** nature du marchandise */}
                        <TextField label="Nature du marchandise" type='text' fullWidth sx={{ marginTop: '20px' }}
                            value={formik.values.nature_marchandise}
                            name='nature_marchandise'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nature_marchandise && Boolean(formik.errors.nature_marchandise)}
                            helperText={formik.touched.nature_marchandise && formik.errors.nature_marchandise}
                        />

                        {/** type du marchandise */}
                        <FormControl fullWidth sx={{ marginTop: '20px' }} >
                            <InputLabel id='type-merch'>Type du marchandise</InputLabel>
                            <Select label='Type du marchandise' labelId='type-merch' name='type_marchandise'
                                value={formik.values.type_marchandise}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.type_marchandise && Boolean(formik.errors.type_marchandise)}
                            >
                                <MenuItem value={'SECHE'}>SECHE</MenuItem>
                                <MenuItem value={'HYDRO'}>HYDRO</MenuItem>
                            </Select>
                            {formik.touched.type_marchandise && (
                                <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.type_marchandise} </FormHelperText>
                            )}
                        </FormControl>

                        {/** Conditionnement du marchandise */}
                        <FormControl fullWidth sx={{ marginTop: '20px' }}>
                            <InputLabel id='cond-merch'>Conditionnement du marchandise</InputLabel>
                            <Select label='Conditionnement du marchandise' name='conditionnement' labelId='cond-merch'
                                value={formik.values.conditionnement}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.conditionnement && Boolean(formik.errors.conditionnement)}
                            >
                                <MenuItem value={'BOUTEILLE'}>BOUTEILLE</MenuItem>
                                <MenuItem value={'CONTENEUR'}>CONTENEUR</MenuItem>
                                <MenuItem value={'CAISSE'}>CAISSE</MenuItem>
                                <MenuItem value={'CARTON'}>conditionnement 4</MenuItem>
                                <MenuItem value={'FARDEAU'}>FARDEAU</MenuItem>
                                <MenuItem value={'FUT / BIDION'}>FUT / BIDION</MenuItem>
                                <MenuItem value={'SAC'}>SAC</MenuItem>
                                <MenuItem value={'VRAC LIQUIDE'}>VRAC LIQUIDE</MenuItem>
                                <MenuItem value={'VRAC SOLID'}>VRAC SOLID</MenuItem>
                                <MenuItem value={'BALL'}>BALL</MenuItem>
                            </Select>
                            {formik.touched.conditionnement && (
                                <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.conditionnement} </FormHelperText>
                            )}
                        </FormControl>

                        {/** Caractère du marchandise */}
                        {
                            formik.values.conditionnement === "CONTENEUR" && (
                                <FormControl fullWidth sx={{ marginTop: '20px' }} >
                                    <InputLabel id='character-merch'>Caractère du conteneur</InputLabel>
                                    <Select label='Caractère du marchandise' labelId='character-merch' name='caractere' value={formik.values.caractere} onChange={formik.handleChange}>
                                        <MenuItem value={'20 pieds'}>20 pieds</MenuItem>
                                        <MenuItem value={'40 pieds'}>40 pieds</MenuItem>
                                    </Select>
                                </FormControl>
                            )
                        }

                        {/** nombre du marchandise */}
                        <TextField label='Nombre' type='number' fullWidth sx={{ marginTop: '20px' }} 
                            InputProps={{
                                inputMode: 'numeric'
                            }}
                            value={formik.values.nombre}
                            name='nombre'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                            helperText={formik.touched.nombre && formik.errors.nombre}
                        />

                        {/** tonnnage du marchandise */}
                        <TextField label='Tonnage du marchandise' type='number' fullWidth sx={{ marginTop: '20px' }}
                            InputProps={{
                                inputMode: 'numeric'
                            }}
                            value={formik.values.tonnage}
                            name='tonnage'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.tonnage && Boolean(formik.errors.tonnage)}
                            helperText={formik.touched.tonnage && formik.errors.tonnage}
                        />

                        {/** nom d'operation */}
                        <FormControl fullWidth sx={{ marginTop: '20px' }}>
                            <FormLabel>Nom d' opération</FormLabel>
                            <RadioGroup row name='nom_operation' value={formik.values.nom_operation} onChange={formik.handleChange} >
                                <FormControlLabel label='ENTREE' control={<Radio value={"ENTREE"} />} />
                                <FormControlLabel label='SORTIE' control={<Radio value={"SORTIE"} />} />
                            </RadioGroup>
                        </FormControl>

                        {/** type d'opération */}
                        <FormControl fullWidth sx={{ marginTop: '20px' }}>
                            <InputLabel id='type-operation'>Type d'opération</InputLabel>
                            <Select label={'Type d\'opération'} labelId='type-operation'
                                name='type_operation'
                                value={formik.values.type_operation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.type_operation && Boolean(formik.errors.type_operation)}
                            >
                                {
                                    formik.values.nom_operation === "ENTREE" && (
                                        entrerType.map(elem => (
                                            <MenuItem value={elem} key={elem}> {elem} </MenuItem>
                                        ))
                                    )
                                }

                                {
                                    formik.values.nom_operation === "SORTIE" && (
                                        sortieType.map(elem => (
                                            <MenuItem value={elem} key={elem}> {elem} </MenuItem>
                                        ))
                                    )
                                }
                            </Select>
                            {formik.touched.type_operation && (
                                <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.type_operation} </FormHelperText>
                            )}
                        </FormControl>

                        {/** type d'opération */}
                        <FormControl fullWidth sx={{ marginTop: '20px' }}>
                            <InputLabel id='id_port'>Port de {
                                    formik.values.nom_operation === 'SORTIE' ? 'destination' : 'provenance'
                            }</InputLabel>
                            <Select label={'Port de destination'} labelId='id_port'
                                name='id_port_march'
                                value={formik.values.id_port_march}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.id_port_march && Boolean(formik.errors.id_port_march)}
                            >
                                {
                                    port.map(elem => (
                                        <MenuItem key={elem.id_port} value={elem.id_port} > { elem.nom_port } </MenuItem>
                                    ))
                                }
                            </Select>
                            {formik.touched.id_port_march && (
                                <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.id_port_march} </FormHelperText>
                            )}
                        </FormControl>

                        {/** observation du marchandise */}
                        <TextField label='Observation du marchandise' type='text' fullWidth sx={{ marginTop: '20px' }}
                            value={formik.values.observation_marchandise}
                            name='observation_marchandise'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.observation_marchandise && Boolean(formik.errors.observation_marchandise)}
                            helperText={formik.touched.observation_marchandise && formik.errors.observation_marchandise}
                        />
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

export default EditMerch;
