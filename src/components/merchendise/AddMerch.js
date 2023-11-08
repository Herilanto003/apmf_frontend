import React from 'react';
import {
    Box,
    Typography,
    FormControl,
    Select,
    FormControlLabel,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    TextField,
    InputLabel,
    MenuItem,
    RadioGroup,
    Radio,
    Button,
    Switch,
    FormHelperText,
    FormLabel
} from '@mui/material'
import { Cancel, Save } from '@mui/icons-material';
import axios from 'axios';
import Global from '../../config/global';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useMyRefresh} from '../../context/refreshContext/Refresh';

const AddMerch = ({ open, handleClose }) => {
    const { handleRefresh } = useMyRefresh();
    const config = Global();
    // DEBUT TOUT STATE UTILISE
    // FIN TOUT STATE UTILISE

    // obtenir tous les touchers navires et les ports
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

    // DEBUT DE CONFIGURATION FORMIK
    const initialValues = {
        nature_marchandise: '', tonnage: '', type_marchandise: '', caractere: '', conditionnement: '', nombre: '', observation_marchandise: '', id_accostage_marchandise: '', nom_operation: 'SORTIE', type_operation: '', id_port_march: '', nom_act: '', adresse_act: '', tel_act: '', email_act: '', personne: false, nom_manu: '', tel_manu: '', email_mau: '', peronne_manu: false
    };
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
        nom_act: yup.string().required('Le nom d actionnaire est obligatoire'),
        adresse_act: yup.string().required('Le domicile de l actionnaire est obligatoire'),
        tel_act: yup.string().required('Le numéro téléphone est obligatoire'),
        email_act: yup.string().required('L adresse email est obligatoire'),
        personne: yup.boolean(),
        nom_manu: yup.string().required('Le nom de manutantionaire est obligatoire'),
        tel_manu: yup.string().required('Le numero téléphone est obligatoire'),
        email_mau: yup.string().required('L adresse email est obligatoire'),
        peronne_manu: yup.boolean(),
    })
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (val) => {
            console.log('val', val);
            let data = val
            if(val.nom_operation === "SORTIE"){
                data = {...data, role_act: "EXPORTATEUR"}
            }
            if(val.nom_operation === "ENTREE"){
                data = {...data, role_act: "DESTINATAIRE"}
            }
            data = {...data, role_manu: "MANUTANTIONAIRE"}

            axios.post('/api/marchandise/new', data)
                    .then(resp => {
                        console.log('====================================');
                        console.log(resp);
                        console.log('====================================');
                        handleRefresh();
                    })
                    .catch(err => {
                        console.log('====================================');
                        console.log(err);
                        console.log('====================================');
                    })
        },
        onReset: () => {
            console.log('RESET');
            handleClose();
        }
    })

    const [sortieType, setSortieType] = React.useState(['Embarquement local', 'Exportation']);
    const [entrerType, setEntrerType] = React.useState(['Débarquement local', 'Importation', 'Transbordement']);

    // FIN DE CONFIGURATION FORMIK

    return (
        <Dialog  
            open={open}
            onClose={handleClose}
            maxWidth='md'
        >
            <DialogTitle>
                Nouveau Marchandise
            </DialogTitle>

                <DialogContent>
                    <Box>

                        {/** Le navire responsable */}
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
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
                        <TextField label="Nature du marchandise" type='text' fullWidth sx={{ marginTop: 2 }} 
                            value={formik.values.nature_marchandise}
                            name='nature_marchandise'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nature_marchandise && Boolean(formik.errors.nature_marchandise)}
                            helperText={formik.touched.nature_marchandise && formik.errors.nature_marchandise}
                        />

                        {/** type du marchandise */}
                        <FormControl fullWidth sx={{ marginTop: 2 }} >
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
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
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
                                <FormControl fullWidth sx={{ marginTop: 2 }} >
                                    <InputLabel id='character-merch'>Caractère du conteneur</InputLabel>
                                    <Select label='Caractère du marchandise' labelId='character-merch' name='caractere' value={formik.values.caractere} onChange={formik.handleChange}>
                                        <MenuItem value={'20 pieds'}>20 pieds</MenuItem>
                                        <MenuItem value={'40 pieds'}>40 pieds</MenuItem>
                                    </Select>
                                </FormControl>
                            )
                        }

                        {/** nombre du marchandise */}
                        <TextField label='Nombre' type='number' fullWidth sx={{ marginTop: 2 }} 
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
                        <TextField label='Tonnage du marchandise' type='number' fullWidth sx={{ marginTop: 2 }}
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
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <FormLabel>Nom d' opération</FormLabel>
                            <RadioGroup row name='nom_operation' value={formik.values.nom_operation} onChange={formik.handleChange} >
                                <FormControlLabel label='ENTREE' control={<Radio value={"ENTREE"} />} />
                                <FormControlLabel label='SORTIE' control={<Radio value={"SORTIE"} />} />
                            </RadioGroup>
                        </FormControl>

                        {/** type d'opération */}
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
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
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
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
                        <TextField label='Observation du marchandise' type='text' fullWidth sx={{ marginTop: 2 }}
                            value={formik.values.observation_marchandise}
                            name='observation_marchandise'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.observation_marchandise && Boolean(formik.errors.observation_marchandise)}
                            helperText={formik.touched.observation_marchandise && formik.errors.observation_marchandise}
                        />


                    </Box>

                    <Typography paddingTop={2} paddingBottom={1} color={'info.main'} fontStyle={'italic'} variant='body2' sx={{ marginTop: 2 }} >
                        {
                            formik.values.nom_operation === 'SORTIE' && 'EXPORTATEUR'
                        }
                        {
                            formik.values.nom_operation === 'ENTREE' && 'DESTINATAIRE'
                        }
                    </Typography>
                    <Box display={'grid'} maxWidth={'100%'} gap={2} gridTemplateColumns={'1fr 1fr 1fr'}>
                        <TextField label='Nom' type='text' fullWidth 
                            value={formik.values.nom_act}
                            name='nom_act'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nom_act && Boolean(formik.errors.nom_act)}
                            helperText={formik.touched.nom_act && formik.errors.nom_act} 
                        />
                        <TextField label='Contact' type='text' fullWidth 
                            value={formik.values.tel_act}
                            name='tel_act'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.tel_act && Boolean(formik.errors.tel_act)}
                            helperText={formik.touched.tel_act && formik.errors.tel_act} 
                        />
                        <TextField label='Domicile' type='text' fullWidth  
                            value={formik.values.adresse_act}
                            name='adresse_act'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.adresse_act && Boolean(formik.errors.adresse_act)}
                            helperText={formik.touched.adresse_act && formik.errors.adresse_act} 
                        />
                        <TextField label='Email' type='text' fullWidth 
                            value={formik.values.email_act}
                            name='email_act'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_act && Boolean(formik.errors.email_act)}
                            helperText={formik.touched.email_act && formik.errors.email_act} 
                        />
                        <FormControl fullWidth>
                            <FormControlLabel control={<Switch name='personne' value={formik.values.personne} onChange={formik.handleChange} />} label='Personne' />
                        </FormControl>
                    </Box>

                    <Typography paddingTop={2} paddingBottom={1} color={'info.main'} fontStyle={'italic'} variant='body2'> MANUTANTIONAIRE</Typography>
                    <Box display={'grid'} maxWidth={'100%'} gap={2} gridTemplateColumns={'1fr 1fr 1fr'}>
                        <TextField type='text' label='Nom manutantionaire' fullWidth 
                            value={formik.values.nom_manu}
                            name='nom_manu'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nom_manu && Boolean(formik.errors.nom_manu)}
                            helperText={formik.touched.nom_manu && formik.errors.nom_manu} 
                        />
                        <TextField type='text' label='Contact manutantionaire' fullWidth 
                            value={formik.values.tel_manu}
                            name='tel_manu'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.tel_manu && Boolean(formik.errors.tel_manu)}
                            helperText={formik.touched.tel_manu && formik.errors.tel_manu} 
                        />
                        <TextField type='text' label='Email manutantionaire' fullWidth 
                            value={formik.values.email_mau}
                            name='email_mau'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email_mau && Boolean(formik.errors.email_mau)}
                            helperText={formik.touched.email_mau && formik.errors.email_mau} 
                        />
                        <FormControl fullWidth>
                            <FormControlLabel control={<Switch name='peronne_manu' value={formik.values.peronne_manu} onChange={formik.handleChange} />} label='Personne ' />
                        </FormControl>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button color='error' startIcon={<Cancel />} variant='contained' onClick={formik.handleReset}>Annuler</Button>
                    <Button startIcon={<Save />} variant='contained' onClick={formik.handleSubmit}>Enregistrer</Button>
                </DialogActions>
        </Dialog>
    );
}

export default AddMerch;
