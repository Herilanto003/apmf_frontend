import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext/AuthContext';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useMyRefresh } from '../context/refreshContext/Refresh';
import { CircularProgress } from '@mui/material';

export default function ModalActive( { open, handleClose, user } ) {
    // refresh
    const { handleRefresh } = useMyRefresh();
    const {logoutUser} = useAuth();

    // loading button
    const [isLoading, setIsLoading] = React.useState(false)

    console.log('fff', user);

    const initialValues = {
        code_activation: ''
    };
    const validateSchema = yup.object({
        code_activation: yup.string().required('Veuillez copier et coller ici le code envoyé dans votre email')
    })
    const formik = useFormik({
        initialValues, 
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            setIsLoading(true)
            await axios.post(`/api/user/activate/${user.email}`, values)
                        .then(response => {
                            handleRefresh();
                            toast.success('Activation du compte réussi')
                        })
                        .catch(error => {
                            toast.error('Erreur d activation du compte, verifié bien le code ou contacter votre administrateur')
                            console.log(error);
                        })
            setIsLoading(false)
            handleClose();
        }
    })

    return (
        <React.Fragment>
            <Dialog open={open}>
                <DialogTitle>CODE D ACTIVATION</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer ici le code d'activation envoyer dans votre email
                    </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="code"
                    label="Votre code d'activation"
                    type="text"
                    fullWidth
                    variant="standard"
                    name='code_activation'
                    value={formik.values.code_activation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.code_activation && Boolean(formik.errors.code_activation)}
                    helperText={formik.touched.code_activation && formik.errors.code_activation}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={logoutUser}>Plus tard</Button>
                    {
                        isLoading ? (
                            <Button disabled size='small' > Envoyer </Button>
                        ) : (
                            <Button onClick={formik.handleSubmit} size='small' > Envoyer </Button>
                        )
                    }
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}