import React, { Component } from 'react';
import axios from "axios";
import "../css/content.css"
import Forms from "../components/forms.js"

class Content extends Component {
    state = {
        allGenres: [],
        allProducers: [],
        data: []
    }

    componentDidMount() {
        axios.get("http://localhost:3001/media")
            .then(res => {
                this.setState({ data: res.data })
                this.sendGenresToForms(res.data)
                this.sendProducersToForms(res.data)
            })
    }

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

    hover = key => {
        const media = this.state.data[key];
        this.props.sendMedia(media);
    }

    render() {
        return (
            <div className="content">
                <Forms sendGenre={this.acceptGenre} allGenres={this.state.allGenres} sendProducer={this.acceptProducer} allProducers={this.state.allProducers}></Forms>
                <div className="images">
                    <div className="row">
                        {this.state.data.length > 0 ? this.state.data.map((item, i) => (
                            <div className="col-lg-2 col-sm-2 no-padding" key={i}>
                                <img alt="myimage" src={item.image} className="image" onMouseOver={() => this.hover(i)}></img>
                            </div>
                        )) : null}
                    </div>
                </div>
            </div>);
    }
}

export default Content;