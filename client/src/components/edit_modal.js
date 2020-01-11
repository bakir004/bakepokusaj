import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from "./input.js"
import InputIcon from "./inputIcon.js"
import "../css/modals.css"

export default function MaxWidthDialog(props) {
    let [name, setName] = useState("")
    let [country, setCountry] = useState("")
    let [image, setImage] = useState("")
    let [artist, setArtist] = useState("")
    let [genres, setGenres] = useState([])
    let [producers, setProducers] = useState([])
    let [media, setMedia] = useState(null)
    const [originalMedia, setOriginalMedia] = useState(null)
    const [warning, showWarning] = useState(false)
    const handleClose = () => {
        props.closeModal()
    };

    useEffect(() => {
        console.log("props effect")
        setOriginalMedia(props.media);
        setGenres(props.media.genres)
        setName(props.media.name)
        setCountry(props.media.country)
        setImage(props.media.image)
        setArtist(props.media.artist)
        setProducers(props.media.producers)
    }, [props])

    useEffect(() => {
        console.log('aa')
        let media = {
            name,
            image,
            country,
            artist,
            genres,
            producers
        }
        setMedia(media)
        console.log(media)
    }, [country, name, artist, image, genres, producers])

    const handleInputChanges = (event, i) => {
        let editedMedia = originalMedia;
        editedMedia[event.target.name] = event.target.value;

        // setMedia(editedMedia)
        // eslint-disable-next-line
        switch (event.target.name) {
            case "name": {
                setName(editedMedia.name)
                break;
            }
            case "country": {
                setCountry(editedMedia.country)
                break;
            }
            case "image": {
                setImage(editedMedia.image)
                break;
            }
            case "artist": {
                setArtist(editedMedia.artist)
                break;
            }
            case "genres": {
                setGenres(editedMedia.genres)
                break;
            }
            case "producers": {
                setProducers(editedMedia.producers)
                break;
            }
        }

        if (!editedMedia[event.target.name])
            showWarning(true);
        else showWarning(false)
    }
    const addNewGenreInput = () => {
        let newGenres = genres;
        newGenres.push("");
        setGenres(newGenres)

    }
    const removeGenreInput = () => {

    }
    const genreChange = (genre, inputId) => {
        let tempGenres = genres;
        tempGenres[inputId] = genre
        console.log("TCL: genreChange -> tempGenres", tempGenres)

        setGenres(tempGenres)
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
                                        <Input name="name" value={name} onChangeFunction={handleInputChanges}></Input>
                                        <Input name="country" value={country} onChangeFunction={handleInputChanges}></Input>

                                        <div className="invisible-inputs"> {/* moves the inputs from the 2nd column into the 1st at small window sizes */}
                                            <Input name="artist" value={artist} onChangeFunction={handleInputChanges}></Input>
                                            <Input name="image" value={image} onChangeFunction={handleInputChanges}></Input>
                                        </div>

                                        {genres ? genres.map((item, i) => (
                                            i === 0 ?
                                                <InputIcon value={item} icon="plus" func={addNewGenreInput} id={i} genreChange={genreChange}></InputIcon> : i === genres.length - 1 ?
                                                    <InputIcon value={item} icon="minus" func={removeGenreInput} id={i} genreChange={genreChange}></InputIcon> :
                                                    <InputIcon value={item} id={i} genreChange={genreChange}></InputIcon>
                                        ))

                                            : null}
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
                            <div className="modal-preview">
                                <DialogContent style={{ marginBottom: "10px" }}>
                                    <div className="modal-media">
                                        <div className="modal-preview">PREVIEW</div>
                                        <div className="modal-image-div">
                                            {/* eslint-disable-next-line */}
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
                    </div>
                </DialogContent>

            </Dialog>
        </React.Fragment >
    );
}
