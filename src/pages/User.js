import React from 'react';
import MyContainer from '../components/MyContainer';
import {
    Backdrop,
    Box,
    Button,
    Chip,
    CircularProgress,
    Typography
} from '@mui/material';
import { GroupOutlined } from '@mui/icons-material';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import axios from 'axios';
import { useMyRefresh } from '../context/refreshContext/Refresh';
import {toast} from 'react-toastify';
import DialogDelete from "../components/DialogDelete";
import Global from '../config/global';

const MyCustomToolbar = () => (
    <GridToolbarContainer>
        <GridToolbarColumnsButton></GridToolbarColumnsButton>
        <GridToolbarQuickFilter></GridToolbarQuickFilter>
    </GridToolbarContainer>
)

const User = () => {
    const conf = Global();

    const [isLoading, setIsLoading] = React.useState(false);

    const [selectId, setSelectId] = React.useState(null);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openBack, setOpenBack] = React.useState(false)
    const { isRefresh, handleRefresh } = useMyRefresh();
    // montage
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        axios.get('/api/user/all')
                .then(response => {
                    console.log(response.data);
                    const data = response.data.map(elem => ({
                        id: elem.id_utilisateur,
                        nom: elem.nom,
                        prenoms: elem.prenoms,
                        status: elem.status_compte,
                        email: elem.email
                    }))

                    setRows(data);
                })
                .catch(error => {
                    console.log(error);
                })
    }, [isRefresh]);
    
    // configuration des data grid
    const columns = [
        {field: "id", headerName: 'NUM UTILISATEUR', width: 90, editable: false},
        {field: "nom", headerName: 'Nom', flex: 1, editable: false},
        {field: "prenoms", headerName: 'Prenoms', flex: 1, editable: false},
        {field: "email", headerName: "Adresse Email", flex: 1, editable: false},
        {field: "status", headerName: 'Status', flex: 1, editable: false, renderCell: (params => (
            params.value ? <Chip color='success' label="Activé" /> : <Chip color='error' label='Désactivé' />
        ))},
        {
            field: 'actions', 
            headerName: 'Actions',
            renderCell: (params) => {
                console.log('params', params);

                // supprimer une ligne
                const handleToggleActive = async () => {
                    console.log('delete', params);
                    setOpenBack(true)
                    if(params.row.status){
                        await axios.post(`/api/user/deactivate/${params.row.email}`)
                                    .then(response => {
                                        console.log(response);
                                        setOpenBack(false)
                                        toast.success('Désactivation réusssi')
                                        handleRefresh()
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        toast.error('server error')
                                    })
                        setOpenBack(false)
                    } else {
                        await axios.post(`/api/user/refresh-account/${params.row.email}`)
                                    .then(response => {
                                        console.log(response);
                                        setOpenBack(false)
                                        toast.info('Nouveau code d activation envoyé à son email')
                                        handleRefresh()
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        toast.error('server error')
                                    })
                        setOpenBack(false)
                    }
                }

                const handleDelete = () => {
                    setSelectId(params.id);
                    setOpenDelete(true);
                    handleRefresh();
                }

                return (
                    <Box display={'flex'} gap={2} alignItems='center'>
                        <Button onClick={handleToggleActive} variant='contained' size='small' color='info' >
                            {
                                params.row.status ? "Désactiver" : "Activer"
                            }
                        </Button>
                        <Button variant='contained' size='small' color='error' onClick={handleDelete} >Supprimer</Button>
                    </Box>
                )
            },
            flex: 1
        }
    ];

    
    return (
        <MyContainer>
            <DialogDelete 
                title={"SUPPRESSION D' UN UTILISATEUR"}
                content={'supprimé définitivement ?'}
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                linkDelete={`/api/user/delete/${selectId}`}
            />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBack}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
            <Box component={'div'} sx={styles.portHeader}>
                <Typography component={'h2'} variant='h4' sx={styles.portTitle} display={'flex'} alignItems={'center'} gap={1}>
                    <GroupOutlined fontSize='100px' />
                    UTILISATEURS
                </Typography>
            </Box>
            <Box marginY={2}>
                <DataGrid 
                    autoHeight
                    columns={columns}
                    rows={rows}
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
        </MyContainer>
    );
}

/** @type {import('@mui/material').SxProps} */
const styles = {
    portHeader: {
        width: '100%',
        boxSizing: 'border-box'
    },
    portTitle: {
        fontFamily: "'Dancing Script', cursive",
        fontWeight: 'bold'
    },
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
        },

        '& .MuiDataGrid-virtualScrollerRenderZone': {
            background: 'white'
        }
    }
}

export default User;
