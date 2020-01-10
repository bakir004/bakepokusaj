import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
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
    const classes = useStyles();

    return (
        <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end" >
                <Grid item style={{ width: "256px" }}>
                    <TextField className={classes.width} id="input-with-icon-grid" label="With a grid" />
                </Grid>
                <Grid item style={{ display: "inline" }}>
                    {props.icon === "plus" ? <AddCircleIcon onClick={props.func} style={{ cursor: "pointer" }} /> : null}
                    {props.icon === "minus" ? <RemoveCircleIcon onClick={props.func} style={{ cursor: "pointer" }} /> : null}
                </Grid>
            </Grid>
        </div>
    );
}
