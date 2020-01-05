import React, { Component } from 'react';
import "../css/forms.css"

class Forms extends Component {
    state = {
        genre: "",
        producer: ""
    }


    submitAndHandleGenre = genre => {
        this.props.sendGenre(genre)
        this.setState({ genre })
    }

    submitAndHandleProducer = producer => {
        this.props.sendProducer(producer)
        this.setState({ producer })
    }


    render() {
        return (
            <div>
                <form className="form" method="POST" action="/">
                    <select className="genre-dropdown" name="select">
                        {this.props.allGenres.map((item, i) => (
                            <option key={i} value={item} onClick={() => this.submitAndHandleGenre(item)}>{item}</option>
                        ))}
                    </select>
                    <select className="genre-dropdown" name="select">
                        {this.props.allProducers.map((item, i) => (
                            <option key={i} value={item} onClick={() => this.submitAndHandleProducer(item)}>{item}</option>
                        ))}
                    </select>
                </form >
            </div>
        );
    }
}

export default Forms;