import React, { Component } from 'react';

class Header extends Component {
    constructor(props){
        super(props);

    }

    componentWillReceiveProps(nextProps) {
    }

    render() {

        return (
            <div className= 'bw-header'>
                <nav className="navbar">
                    <div className="navbar-brand">
                        <a className="left-nav-logo" href="/" style={{width: '170px'}}>
                            Homepage
                        </a>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}

export default Header;