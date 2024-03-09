// Header.js

import React, { useEffect } from 'react';
import './Header.css'; // Import CSS file for styling
import {Link, useLocation} from 'react-router-dom';
function Header() {
    let location = useLocation();
    useEffect(() =>{
     console.log(location.pathname)
    },[location]);

    return (
        <header className="header">
            {/* <div className="brand">CHOPADE BANDHU PAPAD</div> */}
            <nav className="menu">
                <ul>
                    <li><Link className={`nav ${location.pathname === "/generateInvoice" ? "active" : "" }`} to="/generateInvoice">Invoice Generator</Link></li>
                    <li><Link className={`nav ${location.pathname === "/calculateDate" ? "active" : "" }`} to="/calculateDate">Date Calculator</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
