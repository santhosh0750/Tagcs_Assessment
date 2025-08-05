'use client'

import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import AlertCommon from '@/app/CommonUi/AlertCommon';
import { DataGrid } from '@mui/x-data-grid';
import UseThemeColor from '@/hooks/UseThemeColor';

export default function DashBoard() {
    const { primary, secondary, text, textsecondary } = UseThemeColor();
  
  const [UserDetails,setUserDetails] = useState([])
  const[UserBack,setUserBack]= useState([])
  const [AlertOpen, setAlertOpen] = useState(false);
  const[Search,setSearch]=useState('')
    const [AlertMessage, setAlertMessage] = useState({
      type: "",
      message: "",
    });
const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 10,
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
    
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "body",
      headerName: "Body",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
  
  ];
  const paginationModel = { page: 0, pageSize: 10 };
 const searchTable = () => {
    if (Search) {
      let date = UserBack.filter((item) => {
        return Search.toLowerCase()
          .split(" ")
          .every((v) => item?.title?.toLowerCase().includes(v) 
        || item?.body?.toLowerCase().includes(v))  ;
      });

      setUserDetails(date);
    } else {
      return setUserDetails(UserBack);
    }
  };
  
  const DataGridfun = async () => {
try {

  const response =
   await axios.get('https://jsonplaceholder.typicode.com/posts')
  if (response.status =='200') {
    setUserDetails(response.data)
    setUserBack(response.data)
  }else{
    setUserDetails([])
    setUserBack([])
setAlertMessage({
        type: "error",
        message: "Some Think Went Wrong",
      });
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2000);
  }

} catch (error) {
  console.warn("userapi",error)
  
}


    }
   
   useEffect(() => {
    searchTable();
  }, [Search]);
    useEffect(()=>{
DataGridfun()
    },[])
  return (
    <Grid container  size={12}>
      <Grid size={12} container justifyContent={'space-between'}>
<Typography sx={{fontSize:16,color:primary ,fontWeight:500}} >
  DashBoard
</Typography>
<TextField label={'Search'} size='small' value={Search} onChange={(e)=>setSearch(e.target.value)} />
      </Grid>
<Paper
        sx={{
          flexGrow: 1,
          
          width: "100%",
          mt: 1,
          borderRadius:3,
          minHeight:300
        }}
        square={false}
      >
        <DataGrid
          getRowId={(row, index) => row.id}
          rows={UserDetails}
          columns={columns}
          density="compact"
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
{AlertOpen && (
        <AlertCommon
          AlertOpen={AlertOpen}
          setAlertOpen={setAlertOpen}
          type={AlertMessage.type}
          message={AlertMessage.message}
        />
      )}
    </Grid>


  )
}
