import React, { Component } from 'react';
import "../css/items.css"

class ItemDetails extends Component {
    state = {}
    render() {
        return (
            <div className="medias">
                <img alt="" className="image" src={this.props.media.image}></img>
                <div className="media-name">{this.props.media.name}</div>

                {this.props.media.artist ? <div className="media-artist">By: {this.props.media.artist}</div> : null}

                {this.props.media.producers ? <span className="media-producers">Producers: </span> : null}
                {this.props.media.producers ? this.props.media.producers.map((item, i) => (
                    <span key={i} className="media-producers">{item}{this.props.media.producers[i + 1] ? <span>, </span> : <br />} </span>
                )) : null}

                {this.props.media.genres ? this.props.media.genres.map((item, i) => (
                    <div key={i} className="media-genres">{item}</div>
                )) : null}

                {this.props.media.country ? <div className="media-country">Country: {this.props.media.country}</div> : null}
            </div>
        );
    }
}

export default ItemDetails;