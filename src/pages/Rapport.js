import React from 'react';
import {
    Box, 
    Typography,
    TextField,
    Button,
    IconButton,
} from '@mui/material';
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarQuickFilter,
    GridToolbarContainer
} from '@mui/x-data-grid';
import { Delete, Download, Edit } from '@mui/icons-material';
import MyContainer from '../components/MyContainer';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useMyRefresh } from '../context/refreshContext/Refresh';
import DialogDelete from '../components/DialogDelete';

const MyCustomToolbar = () => (
    <GridToolbarContainer>
        <GridToolbarColumnsButton></GridToolbarColumnsButton>
        <GridToolbarQuickFilter></GridToolbarQuickFilter>
    </GridToolbarContainer>
)

const Rapport = () => {
    const { isRefresh, handleRefresh } = useMyRefresh()

    const initialValues = {
        date_debut: '',
        date_milieu: '',
        date_fin: '',
    }

    const validationSchema = yup.object({
        date_debut: yup.date().required('La premier date ne doit pas être vide'),
        date_milieu: yup.date().required('La deuxième date ne doit pas être vide'),
        date_fin: yup.date().required('La troisième date ne doit pas être vide'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            axios.post('/api/rapport/download', values)
                    .then(response => {
                        handleRefresh()
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            console.log("values", values);
        },
        onReset: () => {
            console.log('reset');
        }
    })

    const [allRapport, setAllRapport] = React.useState([]);
    React.useEffect(() => {

        axios.get('/api/rapport/all')
                .then(response => {
                    console.log(response);
                    const data = response.data.map(elem => ({
                        id: elem.id_rapport,
                        date_d: elem.date_debut,
                        date_f: elem.date_fin,
                        file_name: elem.fichier
                    }))
                    setAllRapport(data);
                })
                .catch(error => {
                    console.log(error);
                })

    }, [isRefresh]);

    const [selectId, setSelectId] = React.useState(null);
    const [openDelete, setOpenDelete] = React.useState(false)
    const columns = [
        {field: 'id', headerName: 'Numéro du rapport', flex: 1, editable: false},
        {field: 'date_d', headerName: 'Date début', flex: 1, editable: false},
        {field: 'date_f', headerName: 'Date fin', flex: 1, editable: false},
        {field: 'file_name', headerName: 'Le fichier', flex: 1, editable: false},
        {field: 'action', headerName: 'Actions', flex: 1, renderCell:  (params) => {

            // supprimer une ligne
            const handleDelete = () => {
                console.log('delete', params);
                setSelectId(params.id);
                setOpenDelete(true);
            }


            // modifier une ligne
            const handleDownload = async () => {
                console.log("down", params);
                await axios.get(`/api/rapport/api/download/${params.row.file_name}`, {
                    responseType: 'blob',
                })
                        .then(response => {
                            console.log(response);

                            // Create a new blob object
                            const file = new Blob([response.data], { type: 'application/vnd.ms-excel' });
                    
                            // Create a link for our script to 'click'
                            const fileURL = URL.createObjectURL(file);
                            const link = document.createElement('a');
                            link.href = fileURL;
                    
                            // Set the download name
                            link.download = params.row.file_name;
                    
                            // Trigger the download
                            link.click();
                        })
                        .catch(error => {
                            console.log(error);
                        })
            }

            return (
                <Box>
                    <IconButton color='error' onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                    <IconButton color='primary' onClick={handleDownload}>
                        <Download />
                    </IconButton>
                </Box>
            )
        }}
    ]

    return (
        <MyContainer>
            <DialogDelete 
                open={openDelete}
                linkDelete={`/api/rapport/delete/one/${selectId}`}
                handleClose={() => setOpenDelete(false)}
                title={'Suppression un rapport'}
                content={'Suppression définitive'}
            />

            <Box>

                {/** FORMULAIRE D AJOUT POUR LE NOUVEAU RAPPORT */}
                <form>
                    <Typography variant='h4' component={'h4'} marginBottom={2} > Faire ici un nouveau rapport </Typography>
                    <Box display={'grid'} gridTemplateColumns={'1fr 1fr 1fr 1fr'} gap={2} width={'100%'}>
                        <TextField label='Premier date' type='date' name='date_debut' fullWidth variant='standard' InputLabelProps={{ shrink: true }} 
                            value={formik.values.date_debut}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.date_debut && Boolean(formik.errors.date_debut)}
                            helperText={formik.touched.date_debut && formik.errors.date_debut}
                        />
                        <TextField label='Deuxième date' type='date' name='date_milieu' fullWidth variant='standard' InputLabelProps={{ shrink: true }} 
                            value={formik.values.date_milieu}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.date_milieu && Boolean(formik.errors.date_milieu)}
                            helperText={formik.touched.date_milieu && formik.errors.date_milieu}
                        />
                        <TextField label='Troisième date' type='date' name='date_fin' fullWidth variant='standard' InputLabelProps={{ shrink: true }} 
                            value={formik.values.date_fin}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.date_fin && Boolean(formik.errors.date_fin)}
                            helperText={formik.touched.date_fin && formik.errors.date_fin}
                        />
                        <Box display='flex' justifyContent={'flex-start'} alignItems={'center'} gap={2} >
                            <Button color='error' variant='outlined' onClick={formik.handleReset}>Annuler</Button>
                            <Button size='small' variant='outlined' color='info' onClick={formik.handleSubmit}> Faire le rapport </Button>
                        </Box>
                    </Box>
                </form>

                {/** LISTE DES RAPPORTS */}
                <Box marginTop={2}>
                    <DataGrid 
                        autoHeight
                        columns={columns}
                        rows={allRapport}
                        disableRowSelectionOnClick
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        slots={{ toolbar: MyCustomToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true
                            }
                        }}
                        sx={styles.tableContainer}
                    />
                </Box>

            </Box>
        </MyContainer>
    );
}

/** @type import('@mui/material').SxProps */
const styles = {
    tableContainer: {
        boxShadow: 15,
        borderRadius: 0,
        borderColor: '#44444480',

        '& .MuiDataGrid-columnHeaders': {
            color: '#090a44',
            background: '#0ea22430',
            borderRadius: 0
        },

        '& .MuiDataGrid-footerContainer': {
            color: '#090a00',
            background: '#0ea22430',
            borderRadius: 0
        }
    }
}
export default Rapport;
