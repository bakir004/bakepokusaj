import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function BasicTextFields(props) {
    const classes = useStyles();
    return (
        <form className={classes.root}>
            <TextField
                id="standard-full-width"
                label={`Media ${props.name}`}
                autoComplete="current-password"
                fullWidth
                style={{ marginRight: 25, marginTop: 10 }}
                name={props.name}
                value={props.value}
                onChange={(event) => props.onChangeFunction(event, props.id)}
                placeholder={`Please enter media ${props.name}`}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}

