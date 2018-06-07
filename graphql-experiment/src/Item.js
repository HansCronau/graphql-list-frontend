import React from 'react';
import classNames from 'classnames' ;

import './Item.css'

const Item = ({ children, disabled, error }) => (
    <li
        className={classNames('Item', {disabled}, {error})}
    >
        {children}
    </li>
)

export default Item;
