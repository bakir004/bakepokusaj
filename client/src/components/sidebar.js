import React, { Component } from 'react';
import "../css/sidebar.css"
// import { Link, Router } from "react-router-dom"

class Sidebar extends Component {
    state = {
        clicked: null,
        links: [
            {
                text: "Magazines",
                to: "/magazines",
                icon: "far fa-newspaper"
            },
            {
                text: "Radio",
                to: "/radio",
                icon: "fab fa-intercom"
            },
            {
                text: "Music",
                to: "/music",
                icon: "fas fa-music",
            },
            {
                text: "Movies & TV Series",
                to: "/movies",
                icon: "fas fa-video"
            },
            {
                text: "Tutorials",
                to: "/tutorials",
                icon: "fab fa-youtube"
            },
            {
                text: "News",
                to: "/news",
                icon: "far fa-newspaper"
            },
            {
                text: "Exercise",
                to: "/exercise",
                icon: "fas fa-arrows-alt-h"
            }
        ]
    }

    render() {
        const linkClick = (key) => {
            this.setState({ clicked: key })
        }
        return (
            <div>
                <div className="header">eLib</div>
                <div className="sidebar">

                    {this.state.links.map((item, i) => (
                        <div key={i} className="link" onClick={() => linkClick(i)}>
                            <i className={`${item.icon} ${this.state.clicked === i ? "clicked" : ""}`}></i>
                            <span className={`link-text ${this.state.clicked === i ? "text-clicked" : ""}`} href={item.to} >{item.text}</span>
                        </div>
                    ))}

                </div>
            </div>

        );
    }
}

export default Sidebar;