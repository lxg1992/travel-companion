import React, { useState }  from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles';

import { mapStyles } from './mapStyles';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          console.log("⚙  -------------------------------------------------");
          console.log("⚙  <|> file: Map.jsx <|> line 23 <|> Map <|> e", e);
          console.log("⚙  -------------------------------------------------");
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          setBounds({
            ne: e.marginBounds.ne,
            sw: e.marginBounds.sw,
          })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          > {
            !isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={place.photo ? place.photo.images.small.url : 'https://images.vexels.com/media/users/3/156928/isolated/lists/6c65c177e94e7554e1fdb0af3038acb7-question-mark-square-icon.png'}
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly/>
              </Paper>
            )
          }

          </div>
        ))}
        {weatherData?.list?.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img height={100} alt={'weatherIcon'} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map;