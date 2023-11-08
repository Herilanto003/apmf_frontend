import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Chip, Box, Button } from '@mui/material';
import axios from 'axios';
import EditResp from './EditResp';
import { useMyRefresh } from '../../context/refreshContext/Refresh';

const MyCustomToolbar = () => (
    <GridToolbarContainer>
        <GridToolbarColumnsButton></GridToolbarColumnsButton>
        <GridToolbarQuickFilter></GridToolbarQuickFilter>
    </GridToolbarContainer>
)

const ListResponsable = () => {
    // variable refresh
    const { isRefresh } = useMyRefresh();

    // obtenir les données 
    const [rows, setRows] = React.useState([])
    React.useEffect(() => {
        axios.get('/api/resp-navire/all')
                .then(resp => {
                    const data = resp.data.map(elem => ({
                        id: elem.id_resp,
                        nom_resp: elem.nom_resp,
                        tel_resp: elem.tel_resp,
                        email_resp: elem.email_resp,
                        role_resp: elem.role_resp,
                        personne: elem.personne,
                        id_accoste_resp: elem.id_accoste_resp
                    }))
                    setRows(data)
                })
    }, [isRefresh])

    // configuration pour la modification d'un responsable
    const [openEdit, setOpenEdit] = React.useState(false);
    const [valuesEdit, setValuesEdit] = React.useState({
        nom_resp: '',
        tel_resp: '',
        email_resp: '',
        role_resp: '',
        personne: false,
        id_accoste_resp: ''
    });
    const [selectId, setSelectId] = React.useState(null);

    // configuration datagrid
    const columns = [
        { field: 'id', headerName: 'ID RESP', width: 60, editable:false },
        { field: 'id_accoste_resp', headerName: 'ID ACCOSTAGE', width: 90, editable:false },
        { field: 'nom_resp', headerName: 'Nom', flex: 1, editable:false },
        { field: 'tel_resp', headerName: 'Contact', flex: 1, editable:false },
        { field: 'email_resp', headerName: 'Email', flex: 1, editable:false },
        { field: 'role_resp', headerName: 'Role', flex: 1, editable:false },
        { field: 'personne', headerName: 'Personne', flex: 1, editable:false, 
            renderCell: (params) => {
                return params.value  ? <Chip label='oui' color='success' /> : <Chip label='non' color='error' />
            }
        },
        {
            field: 'actions', 
            headerName: 'Actions',
            renderCell: (params) => {

                // modifier une ligne
                const handleEdit = async () => {
                    console.log("edit", params);
                    setSelectId(params.id)
                    setValuesEdit(params.row)
                    setOpenEdit(true)
                }

                return (
                    <Box>
                        <Button variant='contained' size='small' color='info' onClick={handleEdit} >Modifier</Button>
                    </Box>
                )
            },
            flex: 1
        }
    ]

    return (
        <React.Fragment>
            <EditResp 
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                values={valuesEdit}
                idUpdate={selectId}
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
        </React.Fragment>
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

export default ListResponsable;
