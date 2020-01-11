import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    width: {
        width: "100%"
    },
    gridWidth: {
        width: "200px"
    }
}));

export default function InputWithIcon(props) {
    const [temp, setTemp] = useState('')
    const classes = useStyles();
    useEffect(() => {
        setTemp(props.value)
    }, [])

    function handleChange(event) {
        setTemp(event.target.value)
        props.genreChange(temp, props.id)
    }
    return (
        <Grid container spacing={1} alignItems="flex-end" >
            <Grid item style={{ width: "256px" }}>
                <TextField className={classes.width} value={temp} id="input-with-icon-grid" label="Enter a genre" onChange={(event) => handleChange(event)} />
            </Grid>
            <Grid item style={{ display: "inline" }}>
                {props.icon === "plus" ? <AddCircleIcon onClick={props.func} style={{ cursor: "pointer" }} /> : null}
                {props.icon === "minus" ? <RemoveCircleIcon onClick={props.func} style={{ cursor: "pointer" }} /> : null}
            </Grid>
        </Grid>
    );
}
