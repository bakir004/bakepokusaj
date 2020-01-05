import React, { Component } from 'react';
import "../css/create.css"

class CreateMedia extends Component {
    state = {
        counter: 1,
        inputs: [0],
        inputInfo: [],
        info: {
            image: "",
            imageLoaded: false
        }
    }

    addNewInput = () => {
        let inputs = this.state.inputs;
        inputs.push(this.state.counter);
        this.setState({ inputs, counter: this.state.counter + 1 })
        console.log(this.state.inputInfo);
    }
    removeInput = () => {
        let inputs = this.state.inputs;
        let inputInfo = this.state.inputInfo;
        inputs.pop();
        inputInfo.pop()
        this.setState({ inputs, inputInfo, counter: this.state.counter - 1 })
        console.log(this.state.inputInfo);
    }

    handleChange = (event, i) => {
        let inputInfo = this.state.inputInfo;
        inputInfo[i] = event.target.value;
        this.setState({ inputInfo })
        console.log(this.state.inputInfo);
    }
    handleImage = event => {
        let info = this.state.info;
        info.image = event.target.value;
        this.setState({ info })
    }

    render() {
        return (
            <div className="container padding-lg">
                <div className="create-header">Create New Media</div>
                <div className="row">
                    <div className="col-sm-6 padding-sm">
                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter media name" required maxLength="50"></input>
                            <small id="emailHelp" className="form-text text-muted">Maximum of 50 characters</small>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter country of origin" required></input>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter artist" required></input>
                        </div>
                        <div>https://www.crorec.net/wp-content/uploads/2016/01/0053-izvodjac-dino-merlin.jpg</div>
                        <div className="form-group">
                            <input type="text" id="image" className="form-control" aria-describedby="emailHelp" placeholder="Enter image url" onChange={(event) => this.handleImage(event)} required></input>
                        </div>
                        <div className="row">
                            <div className="col-lg-10 no-padding-right">
                                <div className="input-fields">
                                    {this.state.inputs.map((item, i) => (
                                        <div className="form-group">
                                            <input required id={i} key={i} className="form-control" onChange={(event) => this.handleChange(event, i)}></input>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-2 no-padding">
                                <div className="icon-div">
                                    <i className="fas fa-plus icon no-padding no-margin" onClick={() => this.addNewInput()}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 padding-sm">
                        <div className="image-div">
                            {/* eslint-disable-next-line */}
                            <img className={`create-image ${this.state.info.image.length > 8 ? "image-border" : ""}`} alt="Media Image Preview: Insert a valid link" src={this.state.info.image} ></img>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter artist/artists" required></input>
                            <small id="emailHelp" className="form-text text-muted">If there is more than one artist, write both in</small>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter artist/artists" required></input>
                            <small id="emailHelp" className="form-text text-muted">If there is more than one artist, write both in</small>
                        </div>
                    </div>
                </div>

                {/* {this.state.inputs.length >= 5 ? <div className="warning">Max Number of Genres Created!</div> : null} */}
                <div className="plus" onClick={() => this.addNewInput()}>+</div>
                <div className="plus" onClick={() => this.removeInput()}>-</div>
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