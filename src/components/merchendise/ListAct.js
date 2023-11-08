import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box, Chip, Hidden, IconButton, } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import EditAct from './EditAct';
import DialogDelete from '../DialogDelete';
import { useMyRefresh } from '../../context/refreshContext/Refresh';

const MyCustomToolbar = () => (
    <GridToolbarContainer>
        <GridToolbarColumnsButton></GridToolbarColumnsButton>
        <GridToolbarQuickFilter></GridToolbarQuickFilter>
    </GridToolbarContainer>
)

const ListAct = () => {
    const { isRefresh } = useMyRefresh();
    // variable permet d'ouvrir ou de fermer les formulaire de modification
    const [openEdit, setOpenEdit] = React.useState(false);
    const [selectId, setSelectId] = React.useState(null);
    const [editValues, setEditValues] = React.useState({
        nom_act: '',
        adresse_act: '',
        tel_act: '',
        email_act: '',
        role: '',
        personne: false  
    })

    // configuration pour le delete
    const [openDelete, setOpenDelete] = React.useState(false);

    // obtenir tous les actionaires
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        axios.get('/api/marchandise/all')
                .then(response => {
                    const data = response.data.actionaires.map(elem => (
                        {
                            id: elem.id_actionaire,
                            nom: elem.nom_act,
                            adresse: elem.adresse_act,
                            contact: elem.tel_act,
                            email: elem.email_act,
                            personne: elem.personne,
                            role: elem.role
                        }
                    ));

                    setRows(data);
                })
                .catch(err => {
                    console.log('====================================');
                    console.log(err);
                    console.log('====================================');
                })
    }, [isRefresh]);

    // configuration des data grid
    const columns = [
        {field: "id", headerName: 'ID', width: 90, editable: false},
        {field: "nom", headerName: 'Nom', flex: 1, editable: false},
        {field: "adresse", headerName: 'Adresse', flex: 1, editable: false},
        {field: "contact", headerName: 'Contact', flex: 1, editable: false},
        {field: "email", headerName: 'Email', flex: 1, editable: false},
        {field: "personne", headerName: 'Status', flex: 1, editable: false, renderCell: (params) => {
            return params.value ? <Chip label='Personne' color='info' /> : <Chip label='Entreprise' color='primary' /> 
        }},
        {field: "role", headerName: 'Role', flex: 1, editable: false},
        {
            field: 'actions', 
            headerName: 'Actions',
            renderCell: (params) => {

                // supprimer une ligne
                const handleDelete = () => {
                    console.log('delete', params);
                    setOpenDelete(true)
                    setSelectId(params.id)
                }

                // modifier une ligne
                const handleEdit = async () => {
                    setSelectId(params.id);
                    await axios.get(`/api/marchandise/one/act/${params.id}`)
                                .then(response => {
                                    console.log(response.data);
                                    setEditValues({
                                        nom_act: response.data.nom_act,
                                        adresse_act: response.data.adresse_act,
                                        tel_act: response.data.tel_act,
                                        email_act: response.data.email_act,
                                        role: response.data.role,
                                        personne: response.data.personne
                                    })
                                    setOpenEdit(true);
                                    
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
                        <IconButton color='success' onClick={handleEdit}>
                            <Edit />
                        </IconButton>
                    </Box>
                )
            },
            flex: 1
        }
    ];


    return (
        <Box width={'100%'}>
            <DialogDelete 
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                title={'SUPRESSION DU MARCHANDISE'}
                content={'la suppression est définitive !'}
                linkDelete={`/api/marchandise/delete/one-act/${selectId}`}
            />

            <EditAct 
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                idUpdate={selectId}
                values={editValues}
            />

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
        },
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box'
    }
}

export default ListAct;
