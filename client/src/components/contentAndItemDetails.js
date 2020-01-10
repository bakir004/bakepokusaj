import React, { Component } from 'react';
import Content from './content';
import ItemDetails from './item_details';

class ContentAndItemDetails extends Component {
    state = {
        media: {}
    }
    sendMedia = (media) => {
        if (media === null)
            this.setState({ media: {} })
        this.setState({ media })
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-7">
                    <Content sendMedia={this.sendMedia}></Content>
                </div>
                <div className="col-md-3 col-xs-12">
                    <ItemDetails media={this.state.media} handleDelete={this.handleDelete}></ItemDetails>
                </div>
            </div >);
    }
}

export default ContentAndItemDetails;