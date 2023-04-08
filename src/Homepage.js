/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

function Homepage({userData}) {
    return (
        <div>
            <p>Hello! {userData.username} </p>
            <img src="./evan.jpg" alt="Evan Image"></img>
        </div>
    );
}

export default Homepage;