import React from 'react';
import MyContainer from '../components/MyContainer';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Chip, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, Menu, MenuItem, RadioGroup, Select, Switch, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import AnchorIcon from '@mui/icons-material/Anchor';
import AttributionIcon from '@mui/icons-material/Attribution';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { Close, Warning } from '@mui/icons-material';
import Global from '../config/global';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddStatistic = () => {
    const confHead = Global();
    const [isExistNavire, setIsExistNavire] = React.useState(false);
    const [allNavires, setAllNavires] = React.useState([]);
    console.log(allNavires);

    // router
    const navigate = useNavigate()

    // obtenir tous les ports et les pays
    const [requestData, setRequestData] = React.useState(null)
    const [pays, setPays] = React.useState([])
    const [ports, setPorts] = React.useState([])
    React.useEffect(() => {
        axios.get('/api/port/all', confHead)
                    .then(resp => {
                        console.log(resp);
                        setPorts(resp.data)
                    })
                    .catch(err => {
                        console.log(err);
                    })
        
        axios.get('/api/pays/all', confHead)
                    .then(resp => {
                        console.log(resp)
                        setPays(resp.data)
                    })
                    .catch(err => {
                        console.log(err);
                    })

        axios.get('/api/navire/all', confHead)
                .then(response => {
                    console.log(response.data);
                    setAllNavires(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
    }, [])

    // DEBUT DE CONFIGURATION FORMIK  ****************-- --------- *********------------

    // config pour le navire
    const [navireData, setNavireData] = React.useState(null);
    const [isValidNavire, setIsValidNavire] = React.useState(false);
    const initialValueNavire = {
        nom_navire: '', type_navire: '', immatricule_navire: '', observation_navire: '', id_pays_navire: '', id_port_prov: '', id_port_dest: '', date_heure_arrive: '', date_heure_depart: '', numero_escale: '', nom_armateur: '', role_armateur: 'ARMATEUR', tel_armateur: '', email_armateur: '', personne_armateur: false
    }
    const initialValueNavireExist = {
        id_navire: '', id_port_prov: '', id_port_dest: '', date_heure_arrive: '', date_heure_depart: '', numero_escale: '', nom_armateur: '', role_armateur: 'ARMATEUR', tel_armateur: '', email_armateur: '', personne_armateur: false
    }
    const validationSchemaNavire = yup.object({
        nom_navire: yup.string().required('Veuillez remplir le nom du navire'),
        immatricule_navire: yup.string().required('Veuillez saisir le numéro matricule'),
        type_navire: yup.string().required('Veuillez selectionner le type du navire'),
        observation_navire: yup.string().required('Indiquer les observation du navire'),
        id_pays_navire: yup.number().required('Le pavillon navire est obligatoire'),
        id_port_prov: yup.number().required('Veuillez selectionner le port de provenance du navire'),
        id_port_dest: yup.number().required('Veuillez selectionner le port de destination du navire'),
        date_heure_arrive: yup.date().required('Saisir la date et heure d\'arrivé du navire').min(new Date(), 'La doit être saisie à partir d\'aujourd\'hui'),
        date_heure_depart: yup.date().required('Saisir la date et heure de départ du navire'),
        numero_escale: yup.string().required('Le numero escale est obligatoire'),
        nom_armateur: yup.string().required('Veuillez saisir le nom de l\'armateur'),
        role_armateur: yup.string(),
        tel_armateur: yup.string().required('Veuillez saisir le numéro téléphone armateur'),
        email_armateur: yup.string().required('Veuillez saisir l\'adresse e-mail de l\'armateur'),
        personne_armateur: yup.boolean()
    });
    // validation pour navire existant
    const validationSchemaNavireExist = yup.object({
        id_navire: yup.number().required('Veuillez selectionner l immatricule du navire correspondant'),
        id_port_prov: yup.number().required('Veuillez selectionner le port de provenance du navire'),
        id_port_dest: yup.number().required('Veuillez selectionner le port de destination du navire'),
        date_heure_arrive: yup.date().required('Saisir la date et heure d\'arrivé du navire').min(new Date(), 'La doit être saisie à partir d\'aujourd\'hui'),
        date_heure_depart: yup.date().required('Saisir la date et heure de départ du navire'),
        numero_escale: yup.string().required('Le numero escale est obligatoire'),
        nom_armateur: yup.string().required('Veuillez saisir le nom de l\'armateur'),
        role_armateur: yup.string(),
        tel_armateur: yup.string().required('Veuillez saisir le numéro téléphone armateur'),
        email_armateur: yup.string().required('Veuillez saisir l\'adresse e-mail de l\'armateur'),
        personne_armateur: yup.boolean()
    });
    const formikNavire = useFormik({
        initialValues: isExistNavire ? initialValueNavireExist : initialValueNavire,
        validationSchema: isExistNavire ? validationSchemaNavireExist : validationSchemaNavire,
        onSubmit: (values) => {
            setNavireData(values);
            setIsValidNavire(true)
        }
    });


    // pour accostage
    const [accostData, setAccostData] = React.useState(null);
    const [isValidAccost, setIsValidAccost] = React.useState(false);
    const initialValueAccost = {
        id_port_accost: '', type_desserte: '', passage_embarque: '', passage_debarque: ''
    }
    const validationSchemaAccost = yup.object({
        id_port_accost: yup.number().required('Entrer ici votre port actuel'),
        type_desserte: yup.string().required('Veuillez selectionner un type de desserte'),
        passage_embarque: yup.number(),
        passage_debarque: yup.number()
    })
    const formikAccost = useFormik({
        initialValues: initialValueAccost,
        validationSchema: validationSchemaAccost,
        onSubmit: (values) => {
            setAccostData(values);
            setIsValidAccost(true)
        }
    })

    // pour consignataire
    const [consData, setConsData] = React.useState(null);
    const [isValidCons, setIsValidCons] = React.useState(false);
    const initialValueCons = {
        nom_cons: '', role_cons: 'CONSIGNATAIRE', tel_cons: '', email_cons: '', personne_cons: false
    }
    const validationSchemaCons = yup.object({
        nom_cons: yup.string().required('Le nom du consignataire est obligatoire'),
        role_cons: yup.string(),
        tel_cons: yup.string().required('Le numéro téléphone est obligatoire'),
        email_cons: yup.string().required('L\'email est obligatoire'),
        personne_cons: yup.boolean()
    })
    const formikCons = useFormik({
        initialValues: initialValueCons,
        validationSchema: validationSchemaCons,
        onSubmit: (values) => {
            setConsData(values);
            setIsValidCons(true)
        }
    })

    // FIN DE CONFIGURATION FORMIK  ****************-- --------- *********------------

    const handleSendData = () => {
        const objectTemp = {...navireData, ...accostData, ...consData}
        
        console.log(objectTemp);

        isExistNavire ? (
            axios.post('/api/statistic/navire-exist/new', objectTemp, confHead)
                    .then(resp => {
                        console.log(resp);
                        toast.success('Nouveau statistique enregistré avec succès')
                        navigate('/apmf/account/statistic')
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error('Vérifier bien les données, peut-être que le navire est déjà enregistré ou autre erreur')
                    })
        ) : (
            axios.post('/api/statistic/new', objectTemp, confHead)
                    .then(resp => {
                        console.log(resp);
                        toast.success('Nouveau statistique enregistré avec succès')
                        navigate('/apmf/account/statistic')
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error('Vérifier bien les données, peut-être que le navire est déjà enregistré ou autre erreur')
                    })
        )

    }

    return (
        <MyContainer>
            <Box component={'div'} sx={styles.addStatisticHeader}>
                <Typography component={'h2'} variant='h3' sx={styles.addStatisticHeaderTitle}>
                    Nouveau Statistique
                </Typography>
                <Link to={'/apmf/account/statistic'}>
                    <Button startIcon={<ArrowBackIcon />} variant='outlined'>Retour</Button>
                </Link>    
                <FormControl>
                    
                </FormControl>
            </Box>

            {/** formulaire d'ajout nouveau statistique */}
            <Box component={'div'} sx={styles.addStatisticBody}>
                <form>
                    <Box>

                        {/** INFORMATION DU NAVIRE */}
                        <Accordion>
                            <AccordionSummary sx={styles.infoTitle} expandIcon={<ExpandMoreIcon sx={styles.expandIcon} />}>
                                <Box display={'flex'} gap={1} alignItems={'center'} component={'div'}>
                                    <DirectionsBoatIcon />
                                    Information du Navire
                                    {  
                                        formikNavire.isValid && isValidNavire ? <Chip label='remplit' icon={<CheckIcon />} color='info' /> : <Chip label='Pas encore remplit' icon={<Warning />} color='warning' />
                                    }
                                </Box>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <Box component={'div'}>
                                    <FormControl>
                                        <FormControlLabel label="Le navire est-il existe ?" control={<Switch checked={isExistNavire} onChange={() => setIsExistNavire(!isExistNavire)} />}   />
                                    </FormControl>
                                    {
                                        isExistNavire ? (
                                            <FormControl fullWidth>
                                                <InputLabel id="id_im_navire">Numero immatricule du navire</InputLabel>
                                                <Select label="Numero immatricule du navire" name='id_navire' labelId='id_im_navire' value={formikNavire.values.id_navire} onChange={formikNavire.handleChange} onBlur={formikNavire.handleBlur} error={formikNavire.touched.id_navire && Boolean(formikNavire.errors.id_navire)}>
                                                    {
                                                        allNavires.map(elem => (
                                                            <MenuItem value={elem.id_navire} key={elem.id_navire}> IM : {elem.immatricule_navire} - {elem.nom_navire} </MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                                {
                                                    formikNavire.touched.id_navire && <FormHelperText sx={{ color:"error.main" }}> {formikNavire.errors.id_navire} </FormHelperText>
                                                }
                                            </FormControl>
                                        ) :  (
                                        <Box sx={styles.infoNavire}>
                                            <TextField name='nom_navire' label='Nom du navire'  type='text' 
                                                value={formikNavire.values.nom_navire}
                                                onChange={formikNavire.handleChange}
                                                onBlur={formikNavire.handleBlur}
                                                error={formikNavire.touched.nom_navire && Boolean(formikNavire.errors.nom_navire)}
                                                helperText={formikNavire.touched.nom_navire && formikNavire.errors.nom_navire}
                                            />
                
                                            {/** numero matricule navire */}
                                            <TextField name='immatricule_navire' label='IM du navire' type='text' 
                                                value={formikNavire.values.immatricule_navire}
                                                onChange={formikNavire.handleChange}
                                                onBlur={formikNavire.handleBlur}
                                                error={formikNavire.touched.immatricule_navire && Boolean(formikNavire.errors.immatricule_navire)}
                                                helperText={formikNavire.touched.immatricule_navire && formikNavire.errors.immatricule_navire}
                                            />
                
                                            {/** observation du navire */}
                                            <TextField name='observation_navire' label='Observation' type='text' 
                                                value={formikNavire.values.observation_navire}
                                                onChange={formikNavire.handleChange}
                                                onBlur={formikNavire.handleBlur}
                                                error={formikNavire.touched.observation_navire && Boolean(formikNavire.errors.observation_navire)}
                                                helperText={formikNavire.touched.observation_navire && formikNavire.errors.observation_navire}
                                            />
        
                                            {/** type du navire */}
                                            <FormControl>
                                                <InputLabel id='id-type-navire'>Type du Navire</InputLabel>
                                                <Select label='Type du Navire' labelId='id-type-navire'
                                                    value={formikNavire.values.type_navire}
                                                    name='type_navire'
                                                    onChange={formikNavire.handleChange}
                                                    onBlur={formikNavire.handleBlur}
                                                    error={formikNavire.touched.type_navire && Boolean(formikNavire.errors.type_navire)}
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
                                                { formikNavire.touched.type_navire && <FormHelperText sx={{color: 'error.main'}}> {formikNavire.errors.type_navire} </FormHelperText> }
                                            </FormControl>
                
                                            {/** pavillon navire */}
                                            <FormControl>
                                                <InputLabel id='id-pavillon'>Pavillon Navire</InputLabel>
                                                <Select label='Pavillon Navire' labelId='id-pavillon'
                                                    value={formikNavire.values.id_pays_navire}
                                                    name='id_pays_navire'
                                                    onChange={formikNavire.handleChange}
                                                    onBlur={formikNavire.handleBlur}
                                                    error={formikNavire.touched.id_pays_navire && Boolean(formikNavire.errors.id_pays_navire)}
                                                >
                                                    {
                                                        pays.map(elem => (
                                                            <MenuItem value={elem.id_pays} key={elem.id_pays}> {elem.nom_pays} </MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                                { formikNavire.touched.id_pays_navire && <FormHelperText sx={{color: 'error.main'}}> {formikNavire.errors.id_pays_navire} </FormHelperText> }
                                            </FormControl>
                                        </Box>
                                        )
                                    }
                                    <Box sx={styles.infoNavire} marginTop={2}>
        
                                        {/** numero escale */}
                                        <TextField name='numero_escale' type='text' label='Numero d escale' 
                                            value={formikNavire.values.numero_escale}
                                            onChange={formikNavire.handleChange}
                                            onBlur={formikNavire.handleBlur}
                                            error={formikNavire.touched.numero_escale && Boolean(formikNavire.errors.numero_escale)}
                                            helperText={formikNavire.touched.numero_escale && formikNavire.errors.numero_escale}
                                        />
            
                                        {/** port provenance */}
                                        <FormControl>
                                            <InputLabel id='id-port-prov'>Port provenance du navire</InputLabel>
                                            <Select label='Port provenance du navire' labelId='id-port-prov'
                                                value={formikNavire.values.id_port_prov}
                                                name='id_port_prov'
                                                onChange={formikNavire.handleChange}
                                                onBlur={formikNavire.handleBlur}
                                                error={formikNavire.touched.id_port_prov && Boolean(formikNavire.errors.id_port_prov)}
                                            >
                                                {
                                                    ports.map(elem => (
                                                        <MenuItem key={elem.id_port} value={elem.id_port} > {elem.nom_port} </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            { formikNavire.touched.id_port_prov && <FormHelperText sx={{color: 'error.main'}}> {formikNavire.errors.id_port_prov} </FormHelperText> }
                                        </FormControl>
            
                                        {/** port destination */}
                                        <FormControl>
                                            <InputLabel id='id-port-dest'>Port destination du navire</InputLabel>
                                            <Select label='Port destination du navire' labelId='id-port-dest'
                                                value={formikNavire.values.id_port_dest}
                                                name='id_port_dest'
                                                onChange={formikNavire.handleChange}
                                                onBlur={formikNavire.handleBlur}
                                                error={formikNavire.touched.id_port_dest && Boolean(formikNavire.errors.id_port_dest)}
                                            >
                                                {
                                                    ports.map(elem => (
                                                        <MenuItem key={elem.id_port} value={elem.id_port} > {elem.nom_port} </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            { formikNavire.touched.id_port_dest && <FormHelperText sx={{color: 'error.main'}}> {formikNavire.errors.id_port_dest} </FormHelperText> }
                                        </FormControl>
            
                                        {/** armateur personne ou entreprise */}
                                        <FormControl>
                                            <FormLabel id='label-armateur'>Status Armateur</FormLabel>
                                            <FormControlLabel control={<Switch name='personne_armateur' checked={formikNavire.values.personne_armateur} onChange={formikNavire.handleChange} />} label="person" /> 
                                        </FormControl>
            
                                        {/** nom de l'armateur */}
                                        <TextField type='text' label='Nom Armateur' name='nom_armateur' 
                                            value={formikNavire.values.nom_armateur}
                                            onChange={formikNavire.handleChange}
                                            onBlur={formikNavire.handleBlur}
                                            error={formikNavire.touched.nom_armateur && Boolean(formikNavire.errors.nom_armateur)}
                                            helperText={formikNavire.touched.nom_armateur && formikNavire.errors.nom_armateur}
                                        />
            
                                        {/** role de l'armateur */}
                                        <TextField type='text' label='Role' name='role_armateur' contentEditable={false} 
                                            value={formikNavire.values.role_armateur}
                                            onChange={formikNavire.handleChange}
                                            onBlur={formikNavire.handleBlur}
                                            error={formikNavire.touched.role_armateur && Boolean(formikNavire.errors.role_armateur)}
                                            helperText={formikNavire.touched.role_armateur && formikNavire.errors.role_armateur}
                                        />
            
                                        {/** telephone de l'armateur */}
                                        <TextField type='text' label='Contact Armateur' name='tel_armateur' 
                                            value={formikNavire.values.tel_armateur}
                                            onChange={formikNavire.handleChange}
                                            onBlur={formikNavire.handleBlur}
                                            error={formikNavire.touched.tel_armateur && Boolean(formikNavire.errors.tel_armateur)}
                                            helperText={formikNavire.touched.tel_armateur && formikNavire.errors.tel_armateur}
                                        />
            
                                        {/** email de l'armateur */}
                                        <TextField type='text' label='Email Armateur' name='email_armateur'  
                                            value={formikNavire.values.email_armateur}
                                            onChange={formikNavire.handleChange}
                                            onBlur={formikNavire.handleBlur}
                                            error={formikNavire.touched.email_armateur && Boolean(formikNavire.errors.email_armateur)}
                                            helperText={formikNavire.touched.email_armateur && formikNavire.errors.email_armateur}
                                        />
            
                                        {/** date arrive */}
                                        <TextField label="Date et heure d'arrivé" type='datetime-local' name='date_heure_arrive'  
                                            value={formikNavire.values.date_heure_arrive}
                                            onChange={formikNavire.handleChange}
                                            onBlur={formikNavire.handleBlur}
                                            error={formikNavire.touched.date_heure_arrive && Boolean(formikNavire.errors.date_heure_arrive)}
                                            helperText={formikNavire.touched.date_heure_arrive && formikNavire.errors.date_heure_arrive}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
            
                                        {/** date départ */}
                                        <TextField label="Date et heure de départ" type='datetime-local' name='date_heure_depart'  
                                            value={formikNavire.values.date_heure_depart}
                                            onChange={formikNavire.handleChange}
                                            onBlur={formikNavire.handleBlur}
                                            error={formikNavire.touched.date_heure_depart && Boolean(formikNavire.errors.date_heure_depart)}
                                            helperText={formikNavire.touched.date_heure_depart && formikNavire.errors.date_heure_depart}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </AccordionDetails>
                            <Divider />
                            <AccordionActions>
                                <Button variant="contained" color="info" onClick={formikNavire.handleSubmit}>valider</Button>
                            </AccordionActions>
                        </Accordion>

                        {/** INFORMATION DU PORT */}
                        <Accordion>
                            <AccordionSummary sx={styles.infoTitle} expandIcon={<ExpandMoreIcon sx={styles.expandIcon} />}>
                                <Box display={'flex'} gap={1} alignItems={'center'}>
                                    <AnchorIcon />
                                    Information du port d' accostage
                                    {  
                                        formikAccost.isValid && isValidAccost ? <Chip label='remplit' icon={<CheckIcon />} color='info' /> : <Chip label='Pas encore remplit' icon={<Warning />} color='warning' />
                                    }
                                </Box>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={1}>
                                    <FormControl fullWidth>
                                        <InputLabel id='id-port-accost'>Votre port</InputLabel>
                                        <Select labelId='id-port-accost' label='Votre port'
                                            value={formikAccost.values.id_port_accost}
                                            name='id_port_accost'
                                            onChange={formikAccost.handleChange}
                                            onBlur={formikAccost.handleBlur}
                                            error={formikAccost.touched.id_port_accost && Boolean(formikAccost.errors.id_port_accost)}
                                        >
                                            {
                                                ports.map(elem => (
                                                    <MenuItem key={elem.id_port} value={elem.id_port} > {elem.nom_port} </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        { formikAccost.touched.id_port_accost && <FormHelperText sx={{color: 'error.main'}}> {formikAccost.errors.id_port_accost} </FormHelperText> }
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id='id-type-desserte'>Type de desserte</InputLabel>
                                        <Select labelId='id-type-desserte' label='Type de desserte'
                                            value={formikAccost.values.type_desserte}
                                            name='type_desserte'
                                            onChange={formikAccost.handleChange}
                                            onBlur={formikAccost.handleBlur}
                                            error={formikAccost.touched.type_desserte && Boolean(formikAccost.errors.type_desserte)}
                                        >
                                            <MenuItem value={'CN'}>CN</MenuItem>
                                            <MenuItem value={'CILC'}>CILC</MenuItem>
                                            <MenuItem value={'CIR'}>CIR</MenuItem>
                                            <MenuItem value={'BO'}>BO</MenuItem>
                                        </Select>
                                        { formikAccost.touched.type_desserte && <FormHelperText sx={{color: 'error.main'}}> {formikAccost.errors.type_desserte} </FormHelperText> }
                                    </FormControl>

                                    <TextField type='number' name='passage_embarque' label="Nombre de passage embarqué" fullWidth
                                        InputProps={{ inputMode: "numeric" }}  
                                        value={formikAccost.values.passage_embarque}
                                        onChange={formikAccost.handleChange}
                                        onBlur={formikAccost.handleBlur}
                                        error={formikAccost.touched.passage_embarque && Boolean(formikAccost.errors.passage_embarque)}
                                        helperText={formikAccost.touched.passage_embarque && formikAccost.errors.passage_embarque}
                                    />
                                    
                                    <TextField type='number' name='passage_debarque' label="Nombre de passage débarqué" fullWidth
                                        InputProps={{ inputMode: "numeric" }}  
                                        value={formikAccost.values.passage_debarque}
                                        onChange={formikAccost.handleChange}
                                        onBlur={formikAccost.handleBlur}
                                        error={formikAccost.touched.passage_debarque && Boolean(formikAccost.errors.passage_debarque)}
                                        helperText={formikAccost.touched.passage_debarque && formikAccost.errors.passage_debarque}
                                    />
                                </Box>
                            </AccordionDetails>
                            <Divider />
                            <AccordionActions>
                                <Button variant="contained" color="info" onClick={formikAccost.handleSubmit}>valider</Button>
                            </AccordionActions>
                        </Accordion>

                        {/** INFORMATION DU CONSIGNATAIRE */}
                        <Accordion>
                            <AccordionSummary sx={styles.infoTitle} expandIcon={<ExpandMoreIcon sx={styles.expandIcon} />}>
                                <Box display={'flex'} gap={1} alignItems={'center'}>
                                    <AttributionIcon />
                                    Information du Consignataire
                                    {  
                                        formikCons.isValid && isValidCons ? <Chip label='remplit' icon={<CheckIcon />} color='info' /> : <Chip label='Pas encore remplit' icon={<Warning />} color='warning' />
                                    }
                                </Box>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={1}>
                                    <TextField type="text" label="Nom du consignataire" name='nom_cons'  
                                        value={formikCons.values.nom_cons}
                                        onChange={formikCons.handleChange}
                                        onBlur={formikCons.handleBlur}
                                        error={formikCons.touched.nom_cons && Boolean(formikCons.errors.nom_cons)}
                                        helperText={formikCons.touched.nom_cons && formikCons.errors.nom_cons}
                                    />
                                    <TextField type="text" label="Role du consignataire" name='role_cons' value={'CONSIGNATAIRE'} />
                                    <TextField type="text" label="Contact du consignataire" name='tel_cons'  
                                        value={formikCons.values.tel_cons}
                                        onChange={formikCons.handleChange}
                                        onBlur={formikCons.handleBlur}
                                        error={formikCons.touched.tel_cons && Boolean(formikCons.errors.tel_cons)}
                                        helperText={formikCons.touched.tel_cons && formikCons.errors.tel_cons}
                                    />
                                    <TextField type="text" label="Email du consignataire" name='email_cons'  
                                        value={formikCons.values.email_cons}
                                        onChange={formikCons.handleChange}
                                        onBlur={formikCons.handleBlur}
                                        error={formikCons.touched.email_cons && Boolean(formikCons.errors.email_cons)}
                                        helperText={formikCons.touched.email_cons && formikCons.errors.email_cons}
                                    />
                                </Box>
                            </AccordionDetails>
                            <Divider />
                            <AccordionActions>
                                <Button variant="contained" color="info" onClick={formikCons.handleSubmit}>valider</Button>
                            </AccordionActions>
                        </Accordion>
                    </Box>

                    <Box paddingTop={1} component={'div'} display={'flex'} justifyContent={'center'}>
                        {
                            formikNavire.isValid && formikAccost.isValid && formikCons.isValid && isValidNavire && isValidAccost && isValidCons ? <Button startIcon={<SaveIcon />} onClick={handleSendData} variant="contained">Enregistrer</Button> : <Button startIcon={<SaveIcon />} variant="contained" disabled >Enregistrer</Button>
                        }
                    </Box>
                </form>
            </Box>
        </MyContainer>
    );
}

/** @type import('@mui/material').SxProps */
const styles = {
    addStatisticHeader: {
        width: '100%',
        boxSizing: 'border-box'
    },
    addStatisticHeaderTitle: {
        fontFamily: "'Dancing Script', cursive"
    },
    addStatisticBody: {
        width: '100%',
        marginTop: 1
    },
    infoNavire: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 2
    },
    infoTitle: {
        background: '#1A2444',
        color: "white",
        height: '40px'
    },
    expandIcon: {
        color: 'white',
        fontSize: '3em'
    }
}

export default AddStatistic;
