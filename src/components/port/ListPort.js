import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box, Chip, IconButton, } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import Global from '../../config/global';
import DialogDelete from '../DialogDelete';
import EditPort from './EditPort';

const MyCustomToolbar = () => (
    <GridToolbarContainer>
        <GridToolbarColumnsButton></GridToolbarColumnsButton>
        <GridToolbarQuickFilter></GridToolbarQuickFilter>
    </GridToolbarContainer>
)

const ListPort = ({refresh, handleRefresh}) => {
    // config header
    const confHead = Global()
    // variable de port
    const [rows, setRows] = React.useState([])

    // variable pour la selection ID
    const [selectId, setSelectId] = React.useState(null);

    // variable pour ouvrir le dialog delete
    const [openDelete, setOpenDelete] = React.useState(false);

    // variable pour ouvrir le dialog update
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [updateValue, setUpdateValue] = React.useState({
        nom_port: '',
        id_pays_port: '',
        apmf: true,
        status: ''
    });
    console.log('update', openUpdate);

    // loading
    const [isLoading, setIsLoading] = React.useState(true)

    // configuration des data grid
    const columns = [
        {field: "id", headerName: 'ID PORT', width: 90, editable: false},
        {field: "nom_port", headerName: 'Ville du port', flex: 1, editable: false},
        {field: "pays", headerName: 'Appartient au pays de', flex: 1, editable: false},
        {field: "apmf", headerName: 'Présence APMF', flex: 1, editable: false, 
            renderCell: (params) => {
                return params.value  ? <Chip label='oui' color='success' /> : <Chip label='non' color='error' />
            }
        },
        {field: "status", headerName: 'Status', flex: 1, editable: false},
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

                    await axios.get(`/api/port/one/${params.id}`, confHead)
                            .then(resp => {
                                console.log(resp);
                                setSelectId(params.id);
                                setOpenUpdate(true);
                                setUpdateValue({
                                    nom_port: resp.data.nom_port,
                                    apmf: resp.data.apmf,
                                    status: resp.data.status,
                                    id_pays_port: resp.data.id_pays_port
                                })
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
    ];

    // accéder aux données à la base de données
    React.useEffect(() => {
        console.log('====================================');
        console.log('use effect');
        console.log('====================================');

        axios.get(
                '/api/port/all',
                confHead
            )
            .then(response => {
                const data = response.data.map(element => ({
                    id: element.id_port,
                    nom_port: element.nom_port,
                    pays: element.pays.nom_pays,
                    apmf: element.apmf,
                    status: element.status
                }))

                setRows(data)
            })
            .catch(error => {
                console.error('error', error)
            })
        setIsLoading(false)
    }, [refresh])

    return (
        <Box>
            <EditPort 
                open={openUpdate}
                handleClose={() => setOpenUpdate(false)}
                value={updateValue}
                idUpdate={selectId}
            />

            <DialogDelete 
                open={openDelete} 
                title={'SUPRESSION DU PORT AVEC ID : ' + selectId}
                content={'Cet action est irréversible !'}
                handleClose={() => setOpenDelete(false)}
                linkDelete={`/api/port/delete/${selectId}`}
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
                loading={isLoading}
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

export default ListPort;
