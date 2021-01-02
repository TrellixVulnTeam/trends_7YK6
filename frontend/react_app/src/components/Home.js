import React from 'react'
import axios from 'axios';
import * as settings from '../settings';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Slider, Button, TextField } from '@material-ui/core';


// ########################################################
// Material UI inline styles
// ########################################################
const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "75%",
        marginTop: "15vh",
        marginBottom: "10vh",
        borderRadius: '6px',
        backgroundColor: theme.palette.action.disabledBackground,
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2), paddingLeft: theme.spacing(4),
        color: theme.palette.primary.main,
    },
    sliders: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    slidertop: {
        marginTop: theme.spacing(4),
    }
}));

// ########################################################
// Our Custom IRIS slider. You may use the default slider instead of this
// ########################################################
const IrisSlider = withStyles({
    root: {
        color: '#751E66',
    },
    valueLabel: {
        left: 'calc(-50% -2)',
        top: -22,
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    mark: {
        height: 8,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
})(Slider);


// Marks on the slider track
///const marks = [{ value: 0 }, { value: 10 }];

// ########################################################
// The main Home component returned by this Module
// ########################################################
function Home(props) {
    // Material UI Classes
    const classes = useStyles();

    // React hook state variable - Brands

    const [brand_one, setBrandOne] = React.useState(null);
    const [brand_two, setBrandTwo] = React.useState(null);
    const [brand_three, setBrandThree] = React.useState(null);
    const [brand_four, setBrandFour] = React.useState(null);

    // React hook state variable - Prediction
    const [trends, setTrends] = React.useState([0,0,0,0])

    // Function to update the Dimensions state upon slider value change
    const handleTextChange = (event) => {
        switch (event.target.id) {
          case 'brand_one': setBrandOne(event.target.value);  break;
          case 'brand_two': setBrandTwo(event.target.value);  break;
          case 'brand_three': setBrandThree(event.target.value);  break;
          case 'brand_four': setBrandFour(event.target.value);  break;
          default: return null;
        }
    };


    // Function to make the predict API call and update the state variable - Prediction
    const handleTrends = event => {
        // Submit Iris Flower measured dimensions as form data
        let irisFormData = new FormData();
        irisFormData.append("Brand One", brand_one);
        irisFormData.append("Brand Two", brand_two);
        irisFormData.append("Brand Three", brand_three);
        irisFormData.append("Brand Four", brand_four);


        //Axios variables required to call the predict API
        let headers = { 'Authorization': `Token ${props.token}` };
        let url = settings.API_SERVER + '/api/trends/';
        let method = 'post';
        let config = { headers, method, url, data: irisFormData };

        //Axios predict API call
        axios(config).then(
            res => {setTrends(res.data)
            }).catch(
                error => {alert(error)})



    }

    function valuetext(value) {
        return `${value} cm`;
    }


    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed className={classes.container}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={5}>
                        <Paper className={classes.title} elevation={0}>
                            <Typography variant="h7">
                                Compare Average Interest Over the Last 3-Months
                            </Typography>
                        </Paper>
                        <Paper className={classes.sliders}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Brand One"
                                id="brand_one"
                                onChange={handleTextChange}
                             />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Brand Two"
                                id="brand_two"
                                onChange={handleTextChange}
                             />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Brand Three"
                                id="brand_three"
                                onChange={handleTextChange}
                             />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Brand Four"
                                id="brand_four"
                                onChange={handleTextChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" color="primary" onClick={handleTrends}>
                            Get Trends
                        </Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper className={classes.title} elevation={0}>
                            <Typography variant="h7">
                                Results
                            </Typography>
                        </Paper>
                        <Paper className={classes.sliders}>

                            <Typography variant="h6">
                                Brand One: {trends[0]}
                            </Typography>
                            <Typography variant="h6">
                                Brand Two: {trends[1]}
                            </Typography>
                            <Typography variant="h6">
                                Brand Three: {trends[2]}
                            </Typography>
                            <Typography variant="h6">
                                Brand Four: {trends[3]}
                            </Typography>

                        </Paper>
                    </Grid>


                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Home