import React from 'react';
import classNames from 'classnames' ;

import './Item.css'

const Item = ({ children, disabled }) => (
    <li
        className={classNames('Item', {disabled})}
    >
        {children}
    </li>
)

export default Item;
