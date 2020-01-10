import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect(props) {
    const classes = useStyles();
    const [genre, setGenre] = useState('');

    const handleChange = event => {
        console.log("TCL: SimpleSelect -> event", event)
        setGenre(event.target.value);
        console.log(event.target.value)
        props.sendGenre(event.target.value)
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <Select value={genre} onChange={handleChange} displayEmpty className={classes.selectEmpty}>
                    <MenuItem value="" disabled>
                        Genre
                    </MenuItem>
                    {props.genres.map((item, i) => (
                        <MenuItem value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
