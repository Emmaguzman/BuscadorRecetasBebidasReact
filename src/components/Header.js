import React from 'react';

const Header = ({ mensaje }) => {
    return ( <
        header className = "bg-alert" >
        <
        h1 > { mensaje } < /h1>  <
        /header>
    );
}

export default Header;