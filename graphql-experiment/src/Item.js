import React from 'react';

const Item = ({ children }) => (
    <li style={{
        display: 'block',
        textAlign: 'left',
    }}>
        {children}
    </li>
)

export default Item;
