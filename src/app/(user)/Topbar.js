'use client'
import { AppBar, Box, Button, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import UseThemeColor from '@/hooks/UseThemeColor';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import AlertCommon from '../CommonUi/AlertCommon';
import { useRouter } from 'next/navigation';


export default function Topbar({children}) {
  const { primary, secondary, text } = UseThemeColor();
  const [anchorEl, setAnchorEl] = useState(null);
  const [AlertOpen, setAlertOpen] = useState(false);
    const [AlertMessage, setAlertMessage] = useState({
      type: "",
      message: "",
    });
  const userInfo = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter()

const [UserDetails,setuserDetails] =useState(userInfo??"")
  console.log("userInfo0",userInfo)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout = () =>{

    setAlertMessage({
      type: "success",
      message: "We Miss You Come Back Soon",
    });
    
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
      router.push('auth')
    }, 2000);
    localStorage.clear()
    dispatch({
      type:'LOGOUT'
    })

  }
  const checkstatus = () =>{
    if(!userInfo.loggedIn){
      router.push('auth')
    }
  }
  useEffect(()=>{
    setTimeout(() => {
      checkstatus()
    }, 2000);
  },[])
  return (
    <Grid container  >  
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle sx={{fontSize:30}} />
                <Typography sx={{fontSize:14,fontWeight:500,pl:1}}>

                {UserDetails?.name}
                </Typography>

              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{
                  Logout()
                  handleClose()
                  }}>LogOut</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
    <Grid container size={12} sx={{p:2}}  >
{children}
    </Grid>
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
