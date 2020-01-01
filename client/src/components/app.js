import React, { Component } from 'react';
import axios from "axios"

class App extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        axios.get("http://localhost:3001/media")
            .then(res => {
                this.setState({ data: res.data })
            })
    }

    render() {
        return (
            <div>
                {this.state.data ?
                    <div>
                        {this.state.data.map(item => (
                            <div>
                                <h1>{item.name}</h1>
                                <img src={item.image}></img>
                                <h4>Producers:</h4>
                                <ul>
                                    {item.producers.map(producer => (
                                        <li>{producer}</li>
                                    ))}
                                </ul>
                                <h3>Artist: {item.artist}</h3>
                                <h4>Country: {item.country}</h4>
                                <h3>Genres: </h3>

                                <ul>
                                    {item.genres.map(genre => (
                                        <li>{genre}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    : null}
            </div>);
    }
}

export default App;