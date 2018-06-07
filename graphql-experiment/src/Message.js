import React from 'react';
import classNames from 'classnames';

import './Message.css';

const Message = ({type, children}) => (
  <div className={classNames('Message', type)}>
    {children}
  </div>
)

export default Message;
