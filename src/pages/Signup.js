import { Backdrop, Box, Button, CircularProgress, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import SignupBackground from '../assets/pictures/signup.jpg';
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React from 'react';
import { useFormik, validateYupSchema } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigation = useNavigate();
    // variable pour backdrop
    const [openBackdrop, setOpenBackdrop] = React.useState(false)

    // variable pour le mot de passe
    const [showPass, setShowPass] = React.useState(false);
    // variable pour la confirmation de passe
    const [showConfirmPass, setShowConfirmPass] = React.useState(false);

    // fonction qui permet de changer de la visibilité de mot de passe 
    const handleShowPass = () => {
        setShowPass(!showPass);
    }

    // fonction qui permet de changer la visibilité de la confirmation de mot de passe
    const handleShowConfirmPass = () => {
        setShowConfirmPass(!showConfirmPass);
    }

    // début de configuration de formik et yup ----------------------------------------------------------------

    const initialValues = {
        nom: '',
        prenoms: '',
        email: '',
        password: '',
        confirmPass: ''
    }

    const validationSchema = yup.object({
        nom: yup.string().required('Veuillez remplir le nom s\'il vous plait'),
        prenoms: yup.string(),
        email: yup.string().required('L\'adresse e-mail est obligatoire').email('Votre email n\'est pas un email valide'),
        password: yup.string().required('Entrer le mot de passe s\'il vous plait'),
        confirmPass: yup.string().required('Veuillez confirmer votre mot de passe').oneOf([yup.ref('password')], 'Les deux mot de passes doivent être identique'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setOpenBackdrop(true);
            console.log('values', values);
            const requestData = {
                nom: values.nom,
                prenoms: values.prenoms,
                email: values.email,
                password: values.password
            }
            await axios.post('/api/user/signup', requestData)
                        .then(response => {
                            console.log(response);
                            toast.success('Vous êtes inscrit avec succès')
                            setOpenBackdrop(false)
                            navigation('/apmf/account')
                        })
                        .catch(error => {
                            console.log(error);
                            toast.error('Veuillez vérifier les renseignements peut-être que l email existe déjà')
                            setOpenBackdrop(false)
                        })
        },

        onReset: () => {
            console.log('RESET');
        }
    })

    // fin de configuration de formik et yup ------------------------------------------------------------------



    return (
        // conteneur principale de la page signup
        <Box
            component={'div'} 
            sx={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
                height: "100vh",
            }}
        >       
        
            <Backdrop 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color='inherit' />
            </Backdrop>

            {/* div qui contient le formulaire */}
            <Box
                component={'div'}
                sx={{
                    width: "65%",
                    position: "relative",
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box 
                    component={'div'}
                    sx={{
                        width: '80%',
                        height: '70vh',
                        display: "flex",
                        flexDirection: 'column',
                        textAlign: 'justify',
                        justifyContent: "space-between",  
                    }}
                >
                    {/** titre de la page signup */}
                    <Typography
                        variant="h3"
                        sx={{
                            fontStyle: "italic",
                            fontWeight: "bold",
                            fontFamily: "'Dancing Script', cursive",
                        }}
                    >
                        Création d'un nouveau compte
                    </Typography>
                    <Link to={'/apmf'}>
                        Retour à l'acceuil
                    </Link>

                    <Typography
                        variant="body1"
                    >
                        Bienvenue, <br />
                        Veuillez vous inscrire s' il vous plait                    
                    </Typography>

                    <Box
                        component={'div'}
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            gap: 1
                        }}
                    >
                        <Typography>Avez-vous déjà un compte ? </Typography> <Divider orientation="vertical" />
                        <Link to={'/apmf/login'}>Se connecter</Link>
                    </Box>
                    <Divider />
                    
                    {/* formulaire de signup */}
                    <form>
                        <Box
                            component={"div"}
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                alignItems: "flex-end"
                            }}
                        >
                            {/** les input de signup */}
                            <Box
                                sx={{
                                    width: "100%",
                                    gap: 2,
                                    display: "grid",
                                    gridTemplateColumns: '1fr 1fr',
                                    gridTemplateRows: '1fr 1fr 1fr'
                                }}
                            >
                                <TextField 
                                    label="Nom"
                                    variant="outlined"
                                    size="small"
                                    type="text"
                                    sx={{
                                        width: "100%",
                                    }}
                                    name="nom"
                                    value={formik.values.nom}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nom && Boolean(formik.errors.nom)}
                                    helperText={formik.touched.nom && formik.errors.nom}
                                />
                                <TextField 
                                    label="Prénoms"
                                    variant="outlined"
                                    size="small"
                                    type="text"
                                    sx={{
                                        width: "100%",
                                    }}
                                    value={formik.values.prenoms}
                                    name="prenoms"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.prenoms && Boolean(formik.errors.prenoms)}
                                    helperText={formik.touched.prenoms && formik.errors.prenoms}
                                />
                                <TextField 
                                    label="Adresse e-mail"
                                    variant="outlined"
                                    size="small"
                                    type="email"
                                    sx={{
                                        width: "100%",
                                        gridColumn: "1 / span 2"
                                    }}
                                    value={formik.values.email}
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField 
                                    label="Mot de passe"
                                    variant="outlined"
                                    size="small"
                                    type={showPass ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton
                                                    edge="end"
                                                    onClick={handleShowPass}
                                                >
                                                    {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>      
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        width: "100%",
                                    }}
                                    value={formik.values.password}
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <TextField 
                                    label="Confirmer votre mot de passe"
                                    variant="outlined"
                                    size="small"
                                    type={showConfirmPass ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton
                                                    edge="end"
                                                    onClick={handleShowConfirmPass}
                                                >
                                                    {showConfirmPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>      
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        width: "100%",
                                    }}
                                    value={formik.values.confirmPass}
                                    name="confirmPass"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPass && Boolean(formik.errors.confirmPass)}
                                    helperText={formik.touched.confirmPass && formik.errors.confirmPass}
                                />
                            </Box>

                            {/** le bouton pour se connecter  */}
                            <Button variant="contained" onClick={formik.handleSubmit}>créer le compte</Button>
                        </Box>
                    </form>
                    

                </Box>
            </Box>
            
            {/* div qui contient l'image */}
            <Box
                component={'div'}
                sx={{
                    width: "35%",
                    position: "relative",
                }}
            >
                <Box
                    component={"div"}
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        backgroundColor: "#00000080",
                        zIndex: "10",
                        color: "#ffffff",
                        display: "flex",
                        textAlign: "center",
                        flexDirection: "column",
                        gap: 1,
                        padding: "0 20px",
                        boxSizing: "border-box",
                        justifyContent: "center"
                    }}
                >
                    <Typography 
                        variant="h2"
                        sx={{
                            fontWeight: "semi-bold",
                            fontFamily: "'Dancing Script', cursive",
                        }}
                    >APMF</Typography>
                    <Typography variant="body2">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum repellendus enim itaque quo optio repudiandae, placeat, ducimus sint, neque nesciunt dignissimos aliquid inventore obcaecati beatae omnis consectetur! Aut, cupiditate error?
                    </Typography>
                </Box>
                <Box
                    component={"div"}
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        backgroundImage: `url(${SignupBackground})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        zIndex: "9"
                    }}
                >
                </Box>
            </Box>
        </Box>
    )
}
