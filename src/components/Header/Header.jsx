import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { toast } from 'react-toastify';


import useStyles from './styles';

const Header = ({ setCoordinates }) => {
  const classes = useStyles();

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC)
  
  const onPlaceChanged = () => {
    const foundPlace = autocomplete.getPlace();
    console.log(foundPlace);
    if (foundPlace.geometry) {
      const lat = foundPlace.geometry.location.lat();
      const lng = foundPlace.geometry.location.lng();
      setCoordinates({lat, lng});
    } else {
      toast.error(<Typography variant="h6">{foundPlace.name} cannot be found</Typography>, {autoClose: 3000});
    }
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className ={classes.title}>
          Travel Advisor
        </Typography>

        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search..." classes= {{ root: classes.inputRoot, input: classes.inputInput }}/>
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header;