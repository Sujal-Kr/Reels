import * as React from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../Context/Authcontext';
import { useNavigate } from 'react-router-dom';
import insta from '../Assests/Instagram.JPG';
import HomeIcon from '@mui/icons-material/Home'
import ExploreIcon from '@mui/icons-material/Explore'
import { Avatar } from '@mui/material';
// const useStyle=makeStyles({
//     appbar:{background: 'white',}
// } )
export default function Navbar({userData}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
//   const classes=useStyle()

  const {logout}=useContext(AuthContext)
  const navigate=useNavigate()

  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfile=()=>{
    
    navigate(`/profile/${userData.userId}`)
  }

  const handleExplore=()=>{
    let win=window.open('https://www.google.com','_blank')
    win.focus()
  }

  const handleBannerClick=()=>{
    navigate('/')
  }
  
  const handleLogout = async() => {
    await logout()
    navigate('/login')
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}><AccountCircle/>Profile</MenuItem>
      <MenuItem onClick={handleLogout}><LogoutIcon/>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        <MenuItem onClick={handleProfile}><AccountCircle/>Profile</MenuItem>
      <MenuItem onClick={handleLogout}><LogoutIcon/>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" onClick={handleBannerClick} sx={{background:"white"}} >
        <Toolbar>
        <div style={{marginLeft:"5%"}}>
          <img src={insta} style={{width:"20vh"}} alt="instagram logo" />
        </div>
          <Box sx={{ flexGrow: 1 }}  />
          <Box sx={{ display: { xs: 'none', md: 'flex' } ,color:"black",alignItems:"center",gap:"1.2rem"}}>
            <HomeIcon onClick={handleBannerClick} sx={{height:"2rem",width:"2rem"}}/>
            <ExploreIcon onClick={handleExplore} sx={{height:"2rem",width:"2rem"}}/>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >

            <Avatar src={userData.profileUrl} sx={{height:"2rem",width:"2rem"}}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}