import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box, IconButton, } from '@mui/material';
import { Delete, Edit, Info } from '@mui/icons-material';
import axios from 'axios';
import EditMerch from './EditMerch';
import DialogDelete from '../DialogDelete';
import InfoMerch from './InfoMerch';
import { useMyRefresh } from '../../context/refreshContext/Refresh';

const MyCustomToolbar = () => (
    <GridToolbarContainer>
        <GridToolbarColumnsButton></GridToolbarColumnsButton>
        <GridToolbarQuickFilter></GridToolbarQuickFilter>
    </GridToolbarContainer>
)

// fonction de nommage
const setNameId = (id) => {
    return `N° ${id}`
}

const ListMerch = () => {
    const { isRefresh } = useMyRefresh();
    // configuration de delete
    const [openDelete, setOpenDelete] = React.useState(false);


    // configuration pour info
    const [openInfo, setOpenInfo] = React.useState(false);
    const [infoData, setInfoData] = React.useState(null);

    // tous les states
    const [openEditMerch, setOpenEditMerch] = React.useState(false);
    const [selectId, setSelectId] = React.useState(null);
    const [editData, setEditData] = React.useState({
        nature_marchandise: '',
        tonnage: '',
        type_marchandise: '',
        caractere: '',
        conditionnement: '',
        nombre: '',
        observation_marchandise: '',
        id_accostage_marchandise: '',
        nom_operation: '',
        type_operation: '',
        id_port_march: '',
        id_act_marchandise: '',
    })

    // obtenir tous les marchandises
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        axios.get('/api/marchandise/all')
                .then(response => {
                    console.log('====================================');
                    console.log(response);
                    console.log('====================================');
                    const data = response.data.marchandises.map(elem => (
                        {
                            id: elem.id_marchandise,
                            id_accostage: setNameId(elem.id_accostage_marchandise),
                            nature_marchandise: elem.nature_marchandise,
                            nom_operation: elem.nom_operation,
                            type_operation: elem.type_operation,
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
        {field: "id_accostage", headerName: 'Numero Toucher navire', flex: 1, editable: false},
        {field: "nature_marchandise", headerName: 'Nature de marchandise', flex: 1, editable: false},
        {field: "nom_operation", headerName: 'Nom operation', flex: 1, editable: false},
        {field: "type_operation", headerName: 'Type operation', flex: 1, editable: false},
        {
            field: 'actions', 
            headerName: 'Actions',
            renderCell: (params) => {

                // supprimer une ligne
                const handleDelete = () => {
                    console.log('delete', params);
                    setSelectId(params.id);
                    setOpenDelete(true);
                }

                // modifier une ligne
                const handleEdit = async () => {
                    setSelectId(params.id);
                    await axios.get(`/api/marchandise/one/${params.id}`)
                            .then(response => {
                                console.log('====================================');
                                console.log('success', response);
                                console.log('====================================');
                                setEditData({
                                    nature_marchandise: response.data.nature_marchandise,
                                    tonnage: response.data.tonnage,
                                    type_marchandise: response.data.type_marchandise,
                                    caractere: response.data.caractere,
                                    conditionnement: response.data.conditionnement,
                                    nombre: response.data.nombre,
                                    observation_marchandise: response.data.observation_marchandise,
                                    id_accostage_marchandise: response.data.id_accostage_marchandise,
                                    nom_operation: response.data.nom_operation,
                                    type_operation: response.data.type_operation,
                                    id_port_march: response.data.id_port_march,
                                    id_act_marchandise: response.data.actionaire.id_actionaire,
                                })
                                setOpenEditMerch(true)
                            })
                            .catch(error => {
                                console.log('====================================');
                                console.log('err', error);
                                console.log('====================================');
                            })
                }

                // pour info
                const handleInfo = async () => {
                    console.log('info', params);
                    setSelectId(params.id);
                    setOpenInfo(true);
                    await axios.get(`/api/marchandise/one/${params.id}`)
                                .then(response => {
                                    console.log('info', response.data);
                                    setInfoData(response.data);
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
                        <IconButton color='primary' onClick={handleInfo}>
                            <Info />
                        </IconButton>
                    </Box>
                )
            },
            flex: 1
        }
    ];


    return (
        <Box>
            <InfoMerch 
                open={openInfo}
                handleClose={() => setOpenInfo(false)}
                infoValues={infoData}
                idInfo={selectId}
            />

            <DialogDelete 
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                title={'SUPPRESSION DU MARCHANDISE'}
                content={'Suppression définitive'}
                linkDelete={`/api/marchandise/delete/one/${selectId}`}
            />

            <EditMerch 
                open={openEditMerch}
                handleClose={() => setOpenEditMerch(false)}
                idUpdate={selectId}
                values={editData}
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
        }
    }
}

export default ListMerch;
