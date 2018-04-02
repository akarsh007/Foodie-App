import React, { Component } from 'react';
import {Link} from 'react-router-dom'
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
                        <Link to={'/'} className="left-nav-logo" style={{width: '170px'}}>
                            <span className='app-font-color'>Homepage</span>
                        </Link>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}

export default Header;