import React, { Component } from 'react';
import axios from "axios";
import "../css/content.css"
import Forms from "../components/forms.js"
import "../css/spinner.css"
import "../css/create.css"
import Input from "./input.js"
import InputIcon from "./inputIcon.js"
import DeleteModal from "./delete_modal.js"
import EditModal from "./edit_modal.js"
import Tooltip from '@material-ui/core/Tooltip';

class Content extends Component {
    state = {
        allGenres: [],
        allProducers: [],
        data: [],
        show: [],
        editInfo: {},
        originalInfo: {},
        genreCounter: 1,
        genreInputs: [],
        producerCounter: 1,
        producerInputs: [],
        deletedMedia: "",
        deletedMediaKey: null,
        showWarningMsg: false,
        loading: false,
        isOpen: false,
        isOpen2: false
    }

    // ==============================================
    //                 GET ALL MEDIAS
    // ==============================================

    componentDidMount() {
        // this.setState({ loading: true })
        axios.get("http://localhost:3001/media")
            .then(res => {
                this.setState({ data: res.data })
                this.sendGenresToForms(res.data)
                this.sendProducersToForms(res.data)
            })
        // setTimeout(() => {
        //     this.setState({ loading: false })
        // }, 750);
    }

    // ==============================================
    //                 FIND BY GENRE
    // ==============================================

    acceptGenre = genre => {
        if (genre === "None") {
            axios.get(`http://localhost:3001/media`)
                .then(res => {
                    this.setState({ data: res.data })
                })
        } else {
            axios.get(`http://localhost:3001/media/genre/${genre}`)
                .then(res => {
                    this.setState({ data: res.data.medias })
                })
        }
    }

    // ==============================================
    //                FIND BY PRODUCER
    // ==============================================

    acceptProducer = producer => {
        if (producer === "None") {
            axios.get(`http://localhost:3001/media`)
                .then(res => {
                    this.setState({ data: res.data })
                })
        } else {
            axios.get(`http://localhost:3001/media/producer/${producer}`)
                .then(res => {
                    this.setState({ data: res.data.medias })
                })
        }
    }

    // ==============================================
    //   SEND GENRES & PRODUCERS TO THEIR DROPDOWNS
    // ==============================================

    sendGenresToForms = (medias) => {
        let allGenres = [];
        let distinctGenres = [];
        let unique = {};
        for (let i = 0; i < medias.length; i++) {
            const genres = medias[i].genres; // genres of 1 media
            for (let j = 0; j < genres.length; j++) {
                allGenres.push(genres[j])
            }
        }
        // ovo sam kopiro s interneta neznam kako radi
        allGenres.forEach(genre => {
            if (!unique[genre]) {
                unique[genre] = true;
            }
        });
        distinctGenres = Object.keys(unique);
        distinctGenres.unshift("None")
        this.setState({ allGenres: distinctGenres });
    }

    sendProducersToForms = (medias) => {
        let allProducers = [];
        let distinctProducers = [];
        let unique = {};
        for (let i = 0; i < medias.length; i++) {
            const producers = medias[i].producers; // producers of 1 media
            for (let j = 0; j < producers.length; j++) {
                allProducers.push(producers[j])
            }
        }
        allProducers.forEach(i => {
            if (!unique[i]) {
                unique[i] = true;
            }
        });
        distinctProducers = Object.keys(unique);
        distinctProducers.unshift("None")
        this.setState({ allProducers: distinctProducers });
    }

    // ==============================================
    //                UPDATE & DESTROY
    // ==============================================

    handleDelete = (key) => {
        const id = this.state.data[key]._id
        axios.get(`http://localhost:3001/media/delete/${id}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        this.componentDidMount()

    }

    openDeleteModal = (key) => {
        const mediaName = this.state.data[key].name;
        this.setState({ deletedMedia: mediaName, deletedMediaKey: key, isOpen: true })
    }

    openEditModal = (key) => {
        const media = this.state.data[key];
        this.setState({ editInfo: media, originalInfo: media, isOpen2: true })

    }


    handleEditClick = (key) => {
        const editInfo = this.state.data[key];
        this.setState({ editInfo, originalInfo: editInfo })

        let genres = editInfo.genres;
        let genreInputs = [];
        for (let i = 0; i < genres.length; i++) {
            genreInputs.push(i)
        }
        let producers = editInfo.producers;
        let producerInputs = [];
        for (let i = 0; i < producers.length; i++) {
            producerInputs.push(i)
        }
        this.setState({ genreInputs, genreCounter: genres.length, producerInputs, producerCounter: producers.length })
    }

    submitEditedMedia = (media) => {
        let isEmpty = false
        if (media.name && media.image && media.artist && media.country) {
            for (let i = 0; i < media.genres.length; i++) {
                if (!media.genres[i]) {
                    isEmpty = true;
                    break;
                } else {
                    for (let j = 0; j < media.producers.length; j++) {
                        if (!media.producers[j]) {
                            isEmpty = true;
                            break;
                        }
                    }
                }
                if (isEmpty) {
                    this.setState({ showWarningMsg: true })
                } else {
                    this.setState({ showWarningMsg: false })
                    axios.post("http://localhost:3001/media/edit", media)
                        .then(res => {
                            console.log(res.data)
                            this.componentDidMount()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            }
        } else {
            this.setState({ showWarningMsg: true })
        }
        console.log(this.state.showWarningMsg)
    }

    // ==============================================
    //            COMPONENT FUNCTIONALITY
    // ==============================================

    hover = key => {
        const show = this.state.show;
        if (key === null) {
            this.props.sendMedia(null);
            for (let i = 0; i < show.length; i++) {
                show[i] = false;
            }
            this.setState({ show })
            return 0;
        }
        show[key] = true;
        const media = this.state.data[key];
        this.props.sendMedia(media);
    }

    refresh = () => {
        this.componentDidMount()
    }

    // ==============================================
    //             MODAL INFO TRACKING
    // ==============================================

    // =========== GENRE HANDLING ===========

    addNewGenreInput = () => {
        let genreInputs = this.state.genreInputs;
        genreInputs.push(this.state.genreCounter);
        this.setState({ genreInputs, genreCounter: this.state.genreCounter + 1 })
    }

    removeGenreInput = () => {
        let genreInputs = this.state.genreInputs;
        let info = this.state.editInfo;
        genreInputs.pop();
        info.genres.pop()

        let isEmpty = false;
        for (let i = 0; i < info.genres.length; i++) {
            if (!info.genres[i]) {
                isEmpty = true;
                break;
            }
        }
        if (isEmpty)
            this.setState({ showWarningMsg: true, genreInputs, info, genreCounter: this.state.genreCounter - 1 })
        else
            this.setState({ showWarningMsg: false, genreInputs, info, genreCounter: this.state.genreCounter - 1 })
    }

    handleGenreChange = (event, i) => {
        let info = this.state.editInfo;
        info.genres[i] = event.target.value;
        this.setState({ editInfo: info })

        let isEmpty = false;
        for (let i = 0; i < info.genres.length; i++) {
            if (!info.genres[i]) {
                isEmpty = true;
                break;
            }
        }
        if (isEmpty)
            this.setState({ showWarningMsg: true })
        else
            this.setState({ showWarningMsg: false })
    }

    // =========== PRODUCER HANDLING ===========

    addNewProducerInput = () => {
        let producerInputs = this.state.producerInputs;
        producerInputs.push(this.state.producerCounter);
        this.setState({ producerInputs, producerCounter: this.state.producerCounter + 1 })
    }

    removeProducerInput = () => {
        let producerInputs = this.state.producerInputs;
        let info = this.state.editInfo;
        producerInputs.pop();
        info.producers.pop()

        let isEmpty = false;
        for (let i = 0; i < info.producers.length; i++) {
            if (!info.producers[i]) {
                isEmpty = true;
                break;
            }
        }
        if (isEmpty)
            this.setState({ showWarningMsg: true, producerInputs, editInfo: info, producerCounter: this.state.producerCounter - 1 })
        else
            this.setState({ showWarningMsg: false, producerInputs, editInfo: info, producerCounter: this.state.producerCounter - 1 })
    }

    handleProducerChange = (event, i) => {
        let info = this.state.editInfo;
        info.producers[i] = event.target.value;
        this.setState({ editInfo: info })

        let isEmpty = false;
        for (let i = 0; i < info.producers.length; i++) {
            if (!info.producers[i]) {
                isEmpty = true;
                break;
            }
        }
        if (isEmpty)
            this.setState({ showWarningMsg: true })
        else
            this.setState({ showWarningMsg: false })
    }

    // =========== OTHER INFO HANDLING ===========

    handleInputChanges = event => {
        let info = this.state.editInfo;
        info[event.target.name] = event.target.value;
        this.setState({ editInfo: info });
        if (!info[event.target.name])
            this.setState({ showWarningMsg: true })

        this.setState({ showWarningMsg: false })
        console.log(this.state.data)
    }

    closeModal = () => {
        this.setState({ isOpen: false, isOpen2: false })
    }


    render() {
        if (this.state.data.length <= 0)
            return (
                <div className="loading">
                    <div className="loadingio-spinner-bean-eater-i8pmfn7myym"><div className="ldio-8agui72l2fw">
                        <div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
                    </div></div>
                </div>
            )
        else return (
            <div className="content">

                <Forms sendGenre={this.acceptGenre} refresh={this.refresh} allGenres={this.state.allGenres} sendProducer={this.acceptProducer} allProducers={this.state.allProducers}></Forms>
                <div className="images">
                    <div className="row">
                        {this.state.data.map((item, i) => (
                            <div className="col-lg-2 col-sm-2 no-padding" key={i} >
                                <div className="image-div" onMouseOver={() => this.hover(i)} onMouseLeave={() => this.hover(null)}>
                                    <img alt="myimage" src={item.image} className="image"></img>
                                    {this.state.show[i] === true ? <div className="overlay">
                                        <div className="text show">
                                            <i className="fas fa-pencil-alt show" onClick={() => this.openEditModal(i)}></i><br />
                                            <i className="fas fa-trash-alt show" onClick={() => this.openDeleteModal(i)}></i>
                                        </div>
                                    </div> : null}
                                </div>
                            </div>
                        ))}
                        <div className="col-lg-2 col-sm-2 no-padding" >
                            <Tooltip title="Add new Media" arrow >
                                <div className="plus-div" data-toggle="modal" data-target=".bd-example-modal-lg">
                                    <i className="fas fa-plus plus-icon no-padding"></i>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="modal fade mymodal" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="padding-xl">
                                <div className="create-header">Edit Media</div>
                                <div className="row">
                                    <div className="col-sm-6 padding-sm">
                                        <Input name="name" value={this.state.editInfo.name} onChangeFunction={this.handleInputChanges}></Input>
                                        <Input name="country" value={this.state.editInfo.country} onChangeFunction={this.handleInputChanges}></Input>
                                        <Input name="artist" value={this.state.editInfo.artist} onChangeFunction={this.handleInputChanges}></Input>
                                        {/* https://www.crorec.net/wp-content/uploads/2016/01/0053-izvodjac-dino-merlin.jpg */}
                                        <Input name="image" value={this.state.editInfo.image} onChangeFunction={this.handleInputChanges}></Input>
                                        <div className="row">
                                            <div className="col-lg-10 no-padding-right">
                                                {this.state.genreInputs.map((item, i) => (
                                                    <Input name="genre" value={this.state.editInfo.genres[i]} onChangeFunction={this.handleGenreChange} key={i} id={i}></Input>
                                                ))}
                                                <small id="emailHelp" className="form-text text-muted">Maximum of 10 genres, currently: {this.state.genreInputs.length}</small>
                                                {this.state.genreInputs.length === 10 ? <small id="emailHelp" className="form-text text-muted"><span className="red">Maximum number of genres reached!</span></small> : null}

                                            </div>
                                            <div className="col-lg-2 no-padding">
                                                <div className="icon-div">
                                                    {this.state.genreInputs.length < 10 ? <i className="fas fa-plus icon no-padding no-margin" onClick={() => this.addNewGenreInput()}></i> : null}
                                                </div>
                                                <div className="icon-div">
                                                    {this.state.genreInputs.length >= 2 ? <i className="fas fa-minus icon no-padding no-margin" onClick={() => this.removeGenreInput()}></i> : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 padding-sm">
                                        <div>
                                            {/* eslint-disable-next-line */}
                                            <img className={`create-image`} alt="Media Image Preview: Insert a valid link" src={this.state.editInfo.image ? this.state.editInfo.image : ""} ></img>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-10 no-padding-right">
                                                {this.state.producerInputs.map((item, i) => (
                                                    <div className="input-icon-div">
                                                        {i === 0 ?
                                                            <InputIcon icon={this.state.producerInputs.length === 10 ? "" : "plus"} func={this.addNewProducerInput}></InputIcon>
                                                            :
                                                            i === this.state.producerInputs.length - 1 ?
                                                                <InputIcon icon="minus" func={this.removeProducerInput}></InputIcon> :
                                                                <InputIcon></InputIcon>
                                                        }
                                                    </div>
                                                    // < Input name = "producer" value = { this.state.editInfo.producers[i] } onChangeFunction = { this.handleProducerChange } key = { i } id = { i } ></Input>
                                                ))}
                                            </div>
                                            <small id="emailHelp" className="form-text text-muted">Maximum of 10 producers, currently: {this.state.producerInputs.length}</small>
                                            {this.state.producerInputs.length === 10 ? <small id="emailHelp" className="form-text text-muted"><span className="red">Maximum number of producers reached!</span></small> : null}

                                        </div>
                                        {/* <div className="col-lg-2 no-padding">
                                                <div className="icon-div">

                                                     {this.state.producerInputs.length < 10 ? <i className="fas fa-plus icon no-padding no-margin" onClick={() => this.addNewProducerInput()}></i> : null}
                                        </div>
                                        <div className="icon-div">
                                            {this.state.producerInputs.length >= 2 ? <i className="fas fa-minus icon no-padding no-margin" onClick={() => this.removeProducerInput()}></i> : null}
                                        </div>
                                    </div> */}
                                    </div>
                                </div>
                                <div className={this.state.showWarningMsg ? "warning-red" : "none"}>Please fill out all fields!</div>
                                <div className="btn btn-lg btn-block button-color" data-dismiss={this.state.showWarningMsg ? "" : "modal"} onClick={() => this.submitEditedMedia(this.state.editInfo)} >Submit</div>
                            </div>
                        </div>
                    </div>
                </div >
                <DeleteModal
                    media={this.state.deletedMedia}
                    mediaKey={this.state.deletedMediaKey}
                    handleDelete={this.handleDelete}
                    open={this.state.isOpen}
                    closeModal={this.closeModal}
                ></DeleteModal>
                <EditModal
                    media={this.state.editInfo}
                    originalMedia={this.state.originalInfo}
                    open={this.state.isOpen2}
                    closeModal={this.closeModal}
                ></EditModal>

            </div >);
    }
}

export default Content;