import React from 'react';

function Homepage({userData}) {
    return (
        <div>
            <p>Hello! {userData.username} </p>

        </div>
    );
}

export default Homepage;