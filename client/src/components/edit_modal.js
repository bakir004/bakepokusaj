import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from "./input.js"
import InputIcon from "./inputIcon.js"
import "../css/modals.css"

export default function MaxWidthDialog(props) {
    const [media, setMedia] = useState(null)
    const [originalMedia, setOriginalMedia] = useState(null)
    const [warning, showWarning] = useState(false)
    const handleClose = () => {
        props.closeModal()
    };

    useEffect(() => {
        setMedia(props.media);
        setOriginalMedia(props.media);
    }, [props])

    const handleInputChanges = event => {
        let editedMedia = media;
        editedMedia[event.target.name] = event.target.value
        if (!editedMedia[event.target.name])
            showWarning(true);
        else showWarning(false)
    }
    return (
        <React.Fragment>
            <Dialog
                fullWidth="true"
                maxWidth="lg"
                open={props.open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Edit Media</DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row modal-scroll">
                                <div className="col-md-6 modal-input-divs">

                                    <DialogContent style={{ marginBottom: "10px" }}>
                                        <Input name="name" value={props.media.name} onChangeFunction={handleInputChanges}></Input>
                                        <Input name="country" value={props.media.country} onChangeFunction={handleInputChanges}></Input>

                                        <div className="invisible-inputs"> {/* moves the inputs from the 2nd column into the 1st at small window sizes */}
                                            <Input name="artist" value={props.media.artist} onChangeFunction={handleInputChanges}></Input>
                                            <Input name="image" value={props.media.image} onChangeFunction={handleInputChanges}></Input>
                                        </div>

                                        {media ? media.genres ? media.genres.map((item, i) => (
                                            <Input key={i} name="genre" value={props.media.genres[i]} onChangeFunction={handleInputChanges}></Input>
                                        ))

                                            : null : null}
                                        {media ? media.genres ? media.genres.map((item, i) => (
                                            <Input key={i} name="genre" value={props.media.genres[i]} onChangeFunction={handleInputChanges}></Input>
                                        ))

                                            : null : null}
                                        {media ? media.genres ? media.genres.map((item, i) => (
                                            <Input key={i} name="genre" value={props.media.genres[i]} onChangeFunction={handleInputChanges}></Input>
                                        ))

                                            : null : null}
                                    </DialogContent>

                                </div>
                                <div className="col-md-6 modal-input-divs">
                                    <div className="invisible-inputs-2">
                                        <DialogContent style={{ marginBottom: "10px" }}>
                                            <Input name="artist" value={props.media.artist} onChangeFunction={handleInputChanges}></Input>
                                            <Input name="image" value={props.media.image} onChangeFunction={handleInputChanges}></Input>
                                        </DialogContent>
                                    </div>

                                </div>
                            </div>

                            <Button
                                variant="contained"
                                fullWidth
                                disableElevation
                                onClick={handleClose}
                                style={{ backgroundColor: "#ffaa00", color: "white", marginBottom: "15px", marginTop: "15px" }}
                            >
                                <strong>Submit</strong>
                            </Button>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <DialogContent style={{ marginBottom: "10px" }}>
                                <div className="modal-media">
                                    <div className="modal-preview">PREVIEW</div>
                                    <div className="modal-image-div">
                                        {/* { eslint-disable-next-line */}
                                        <img alt="Please fill in the image input with a valid link" className="modal-image" src={media ? media.image : null}></img>
                                    </div>
                                    {media ? <div className="modal-name"> {media.name} </div> : null}

                                    {media ? <div className="modal-artist">By: {media.artist}</div> : null}

                                    {media ? <span className="modal-producers">Producers: </span> : null}
                                    {media ? media.producers ? media.producers.map((item, i) => (
                                        <span key={i} className="modal-producers">{item}{media.producers[i + 1] ? <span>, </span> : <br />} </span>
                                    )) : null : null}

                                    {media ? media.genres ? media.genres.map((item, i) => (
                                        <div key={i} className="modal-genres">{item}</div>
                                    )) : null : null}

                                    {media ? <div className="modal-country">Country: {media.country}</div> : null}

                                </div>
                            </DialogContent>
                        </div>
                    </div>
                </DialogContent>

            </Dialog>
        </React.Fragment >
    );
}
