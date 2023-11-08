import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box, IconButton, } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Global from '../../config/global';
import axios from 'axios';
import DialogDelete from '../DialogDelete';
import EditNavire from './EditNavire';
import { useMyRefresh } from '../../context/refreshContext/Refresh';

const MyCustomToolbar = () => (
    <GridToolbarContainer>
        <GridToolbarColumnsButton></GridToolbarColumnsButton>
        <GridToolbarQuickFilter></GridToolbarQuickFilter>
    </GridToolbarContainer>
)

const ListNavire = () => {
    // refresh variable
    const { isRefresh } = useMyRefresh();

    const confHead = Global();
    // les states  DEBUT  **********************************************
    const [rows, setRows] = React.useState([]);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectId, setSelectId] = React.useState(null);
    const [editValue, setEditValue] = React.useState({
        nom_navire: '',
        type_navire: '',
        id_pays_navire: '',
        observation_navire: '',
        immatricule_navire: ''
    });
    const [openEdit, setOpenEdit] = React.useState(false);

    // les states FIN    ***********************************************

    // obtenir tous les navires dans la base de données
    React.useEffect(() => {
        axios.get('/api/navire/all', confHead)
            .then(resp => {
                console.log(resp);
                const data = resp.data.map(elem => ({
                    nom_navire: elem.nom_navire,
                    type_navire: elem.type_navire,
                    pays: elem.pays.nom_pays,
                    immatricule_navire: elem.immatricule_navire,
                    id: elem.id_navire,
                    observation_navire: elem.observation_navire
                }))
                setRows(data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [isRefresh]);

    // configuration des data grid
    const columns = [
        {field: "id", headerName: 'ID PORT', width: 90, editable: false},
        {field: "nom_navire", headerName: 'Nom du navire', flex: 1, editable: false},
        {field: "immatricule_navire", headerName: 'IM Navire', flex: 1, editable: false},
        {field: "type_navire", headerName: 'Type du navire', flex: 1, editable: false},
        {field: "pays", headerName: 'Pavillon Navire', flex: 1, editable: false},
        {field: "observation_navire", headerName: 'Observation du navire', flex: 1, editable: false},
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
                    console.log("edit", params);
                    setSelectId(params.id)
                    await axios.get(`/api/navire/one/${params.id}`, confHead)
                                .then(resp => {
                                    setEditValue(resp.data)
                                    setOpenEdit(true)
                                })
                                .catch(err => {
                                    console.log(err);
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
    ]

    return (
        <Box>
            <EditNavire 
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                value={editValue}
                idUpdate={selectId}
            />

            <DialogDelete 
                open={openDelete}
                title={`SUPRESSION DU NAVIRE PORTANT ID ${selectId}`}
                content={'Cet action est une supression définitive'}
                linkDelete={`/api/navire/delete/${selectId}`}
                handleClose={() => setOpenDelete(false)}
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

export default ListNavire;
