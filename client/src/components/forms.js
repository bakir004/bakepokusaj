import React, { Component } from 'react';
import "../css/forms.css"
import axios from 'axios';
import Dropdown from "./dropdown.js"

class Forms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genreCounter: 1,
            genreInputs: [0],
            producerCounter: 1,
            producerInputs: [0],
            info: {
                image: "",
                name: "",
                artist: "",
                country: "",
                genreInputInfo: [],
                producerInputInfo: []
            },
            genreDropdownText: "Select a genre",
            producerDropdownText: "Select a producer"
        }
    }

    submitAndHandleGenre = genre => {
        this.props.sendGenre(genre);
        this.setState({ genreDropdownText: genre })
    }

    submitAndHandleProducer = producer => {
        this.props.sendProducer(producer)
        this.setState({ producerDropdownText: producer })
    }

    addNewGenreInput = () => {
        let genreInputs = this.state.genreInputs;
        genreInputs.push(this.state.genreCounter);
        this.setState({ genreInputs, genreCounter: this.state.genreCounter + 1 })
    }

    removeGenreInput = () => {
        let genreInputs = this.state.genreInputs;
        let info = this.state.info;
        genreInputs.pop();
        info.genreInputInfo.pop()
        this.setState({ genreInputs, info, genreCounter: this.state.genreCounter - 1 })
    }

    handleGenreChange = (event, i) => {
        let info = this.state.info;
        info.genreInputInfo[i] = event.target.value;
        this.setState({ info })
    }

    handleInputChanges = event => {
        let info = this.state.info;
        info[event.target.name] = event.target.value;
        this.setState({ info });
    }

    addNewProducerInput = () => {
        let producerInputs = this.state.producerInputs;
        producerInputs.push(this.state.producerCounter);
        this.setState({ producerInputs, producerCounter: this.state.producerCounter + 1 })
    }

    removeProducerInput = () => {
        let producerInputs = this.state.producerInputs;
        let info = this.state.info;
        producerInputs.pop();
        info.genreInputInfo.pop()
        this.setState({ producerInputs, info, producerCounter: this.state.producerCounter - 1 })
    }

    handleProducerChange = (event, i) => {
        let info = this.state.info;
        info.producerInputInfo[i] = event.target.value;
        this.setState({ info })
    }

    submitMedia = info => {
        axios.post("http://localhost:3001/media", {
            name: info.name,
            image: info.image,
            artist: info.artist,
            genres: info.genreInputInfo,
            producers: info.producerInputInfo,
            country: info.country
        }).then(res => {
            console.log(res.data)
            this.props.refresh();
        })

    }

    acceptGenre = (genre) => {
        console.log(genre)
        this.props.sendGenre(genre)
        console.log("TCL: Forms -> acceptGenre -> this.myRef", this.myRef)
    }

    render() {
        return (
            <div>
                <Dropdown genres={this.props.allGenres} sendGenre={this.acceptGenre}></Dropdown>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="dropdown show">
                            <div className="btn dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.genreDropdownText}
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                {this.props.allGenres.map((item, i) => (
                                    <div key={i} value={item} className="dropdown-item" onClick={() => this.submitAndHandleGenre(item)}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="dropdown show">
                            <div className="btn dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.producerDropdownText}
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                {this.props.allProducers.map((item, i) => (
                                    <div key={i} value={item} className="dropdown-item" onClick={() => this.submitAndHandleProducer(item)}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="padding-xl">
                                <div className="create-header">Create New Media</div>
                                <div className="row">
                                    <div className="col-sm-6 padding-sm">
                                        <div className="form-group">
                                            <input type="text" name="name" className="form-control" aria-describedby="emailHelp" placeholder="Enter media name" required maxLength="50" onChange={(event) => this.handleInputChanges(event)}></input>
                                            <small id="emailHelp" className="form-text text-muted">Maximum of 50 characters</small>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="country" className="form-control" aria-describedby="emailHelp" placeholder="Enter country of origin" required onChange={(event) => this.handleInputChanges(event)}></input>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="artist" className="form-control" aria-describedby="emailHelp" placeholder="Enter artist" required onChange={(event) => this.handleInputChanges(event)}></input>
                                        </div>
                                        {/* https://www.crorec.net/wp-content/uploads/2016/01/0053-izvodjac-dino-merlin.jpg */}
                                        <div className="form-group">
                                            <input type="text" name="image" className="form-control" aria-describedby="emailHelp" placeholder="Enter image url" onChange={(event) => this.handleInputChanges(event)} required></input>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-10 no-padding-right">
                                                <div className="input-fields">
                                                    {this.state.genreInputs.map((item, i) => (
                                                        <div className="form-group" key={i}>
                                                            <input type="text" required id={i} key={i} className="form-control" placeholder="Enter genre" onChange={(event) => this.handleGenreChange(event, i)}></input>
                                                        </div>
                                                    ))}
                                                </div>
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
                                            <img className={`create-image ${this.state.info.image.length > 8 ? "image-border" : ""}`} alt="Media Image Preview: Insert a valid link" src={this.state.info.image} ></img>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-10 no-padding-right">
                                                <div className="input-fields">
                                                    {this.state.producerInputs.map((item, i) => (
                                                        <div className="form-group" key={i}>
                                                            <input type="text" required id={i} key={i} className="form-control" placeholder="Enter producer" onChange={(event) => this.handleProducerChange(event, i)}></input>
                                                        </div>
                                                    ))}
                                                </div>
                                                <small id="emailHelp" className="form-text text-muted">Maximum of 10 producers, currently: {this.state.producerInputs.length}</small>
                                                {this.state.producerInputs.length === 10 ? <small id="emailHelp" className="form-text text-muted"><span className="red">Maximum number of producers reached!</span></small> : null}

                                            </div>
                                            <div className="col-lg-2 no-padding">
                                                <div className="icon-div">
                                                    {this.state.producerInputs.length < 10 ? <i className="fas fa-plus icon no-padding no-margin" onClick={() => this.addNewProducerInput()}></i> : null}
                                                </div>
                                                <div className="icon-div">
                                                    {this.state.producerInputs.length >= 2 ? <i className="fas fa-minus icon no-padding no-margin" onClick={() => this.removeProducerInput()}></i> : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn btn-lg btn-block button-color" data-dismiss="modal" onClick={() => this.submitMedia(this.state.info)}>Submit</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Forms;