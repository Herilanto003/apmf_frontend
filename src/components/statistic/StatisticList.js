import React from 'react';
import {
    Box, IconButton, Popper, Button, Paper
} from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter, GridToolbarColumnsButton } from '@mui/x-data-grid';
import { Delete, Edit, InfoRounded } from '@mui/icons-material';
import StatisticInfo from './StatisticInfo';
import axios from 'axios';
import Global from '../../config/global';
import EditAccost from './EditAccost';
import DialogDelete from '../DialogDelete';
import { useMyRefresh } from '../../context/refreshContext/Refresh';

// personnalisation de toolbar de datagrid
const MyCustomToolbar = () => (
    <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarQuickFilter />
    </GridToolbarContainer>
)

const StatisticList = () => {
    const { isRefresh } = useMyRefresh();
    const config = Global();

    // variable qui permet d' ouvrir et de fermer le dialog d' information
    const [openInfo, setOpenInfo] = React.useState(false);
    const [dataInfo, setDataInfo] = React.useState(null);

    // obtenir les données de la statistique
    const [rows, setRows] = React.useState([]);

    // configuration pour la modification d'un accostage
    const [openEdit, setOpenEdit] = React.useState(false);
    const [selectId, setSelectId] = React.useState(null);
    const [editValues, setEditValues] = React.useState({
        numero_escale: '',
        type_desserte: '',
        passage_embarque: '',
        passage_debarque: '',
        id_navire_accoste: '',
        id_port_accoste: '',
        date_enreg: '',
        id_port_prov: '',
        id_port_dest: '',
        date_heure_arrive: '',
        date_heure_depart: '',
    });

    // configuration de suppression
    const [openDelete, setOpenDelete] = React.useState(false);

    React.useEffect(() => {
        axios.get('/api/statistic/list', config)
                .then(resp => {
                    setRows(resp.data);
                })
                .catch(err => {
                    console.log(err);
                })

    }, [isRefresh])

    // ****************************** -------------------------------- *********************************
    // début de configuration de colonnes et lignes pour le datagrid

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 90, editable: false
        },
        {
            field: 'nom_navire', headerName: 'Nom du navire',flex: 1, editable: false
        },
        {
            field: 'immatricule_navire', headerName : 'IM Navire', flex: 1, editable: false 
        },
        {
            field: 'numero_escale', headerName: 'Numéro escale',flex: 1, editable: false
        },
        {
            field: 'date_enreg', headerName: 'Enregistré le',flex: 1, editable: false
        },
        {
            field: 'nom_cons', headerName: 'Nom du consignataire',flex: 1, editable: false
        },
        {
            field: 'nom_arma', headerName: 'Nom Armateur',flex: 1, editable: false
        },
        {
            field: 'actions', 
            headerName: 'Actions',
            renderCell: (params) => {

                // supprimer une ligne
                const handleDelete = () => {
                    console.log('delete', params);
                    setSelectId(params.id)
                    setOpenDelete(true);
                }

                // modifier une ligne
                const handleEdit = (e) => {
                    console.log("edit", params);
                    axios.get(`/api/accostage/one/${params.id}`)
                            .then(response => {
                                console.log(response.data);
                                const data = response.data;
                                setEditValues({
                                    numero_escale: data.numero_escale,
                                    type_desserte: data.type_desserte,
                                    passage_embarque: data.passage_embarque,
                                    passage_debarque: data.passage_debarque,
                                    id_navire_accoste: data.id_navire_accoste,
                                    id_port_accoste: data.id_port_accoste,
                                    date_enreg: data.date_enreg,
                                    id_port_prov: data.id_port_prov,
                                    id_port_dest: data.id_port_dest,
                                    date_heure_arrive: data.date_heure_arrive,
                                    date_heure_depart: data.date_heure_depart,
                                });
                                setDataInfo(data);
                                setOpenEdit(true);
                                setSelectId(params.id)
                            })
                            .catch(error => {
                                console.log(error);
                            })
                }

                // information pour la ligne
                const handleInfo = async () => {
                    console.log('info', params);
                    await axios.get(`/api/statistic/one/${params.id}`)
                            .then(resp => {
                                console.log(resp);
                                setDataInfo(resp.data)
                            })
                            .catch(err => {
                                console.log(err);  
                            }) 
                            
                    setOpenInfo(true);
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
                            <InfoRounded />
                        </IconButton>
                    </Box>
                )
            },
            flex: 1
        }
    ]

    // fin de configuration de colonnes et lignes pour le datagrid
    // ****************************** -------------------------------- *********************************

    return (
        <Box component={'div'}>
            <DialogDelete 
                title={'SUPPRESSION DE L ACCOSTAGE N°'+selectId}
                content={'Suppression définitive'}
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                linkDelete={`/api/accostage/delete/${selectId}`}
            />

            <EditAccost 
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                idUpdate={selectId}
                values={editValues}
            />

            <StatisticInfo 
                open={openInfo}
                handleClose={() => setOpenInfo(false)}
                data={dataInfo}
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
            background: '#090af830',
            borderRadius: 0
        },

        '& .MuiDataGrid-footerContainer': {
            color: '#090a00',
            background: '#090af830',
            borderRadius: 0
        }
    }
}

export default StatisticList;
