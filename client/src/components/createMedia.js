import React, { Component } from 'react';
import "../css/create.css"

class CreateMedia extends Component {
    state = {
        genreCounter: 1,
        genreInputs: [0],
        info: {
            image: "",
            name: "",
            artist: "",
            country: "",
            genreInputInfo: []
        }
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

    handleChange = (event, i) => {
        let info = this.state.info;
        info.genreInputInfo[i] = event.target.value;
        this.setState({ info })
    }
    handleInputChanges = event => {
        let info = this.state.info;
        info[event.target.name] = event.target.value;
        this.setState({ info });
        console.log(this.state.info);
    }

    render() {
        return (
            <div className="container padding-lg">
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
                        <div>https://www.crorec.net/wp-content/uploads/2016/01/0053-izvodjac-dino-merlin.jpg</div>
                        <div className="form-group">
                            <input type="text" name="image" className="form-control" aria-describedby="emailHelp" placeholder="Enter image url" onChange={(event) => this.handleInputChanges(event)} required></input>
                        </div>
                        <div className="row">
                            <div className="col-lg-10 no-padding-right">
                                <div className="input-fields">
                                    {this.state.genreInputs.map((item, i) => (
                                        <div className="form-group" key={i}>
                                            <input type="text" required id={i} key={i} className="form-control" placeholder="Enter genre" onChange={(event) => this.handleChange(event, i)}></input>
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
                        <div className="image-div">
                            {/* eslint-disable-next-line */}
                            <img className={`create-image ${this.state.info.image.length > 8 ? "image-border" : ""}`} alt="Media Image Preview: Insert a valid link" src={this.state.info.image} ></img>
                        </div>

                    </div>
                </div>

                {/* <div>
                    {this.state.inputInfo.map((item, i) => (
                        <div key={i}>{item}</div>
                    ))}
                </div> */}
            </div>
        );
    }
}

export default CreateMedia;