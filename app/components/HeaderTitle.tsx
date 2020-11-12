import React from 'react';
import { Redirect } from 'react-router-dom';
import { Well } from 'react-bootstrap';

const HeaderTitle = ({
  title,
  redirect,
  onRedirect,
  toLink = '/admin/list',
}) => {
  return (
    <div>
      {redirect && <Redirect from="/" to={toLink} />}
      <Well
        style={{
          background: '#fff',
          textAlign: 'center',
          padding: 0,
          color: '#034f84',
          position: 'relative',
        }}
        className="animate__backInDown"
      >
        <span
          className="pe-7s-angle-left-circle"
          onClick={onRedirect}
          style={{
            fontSize: '45px',
            display: 'table',
            top: '20px',
            marginLeft: '21px',
            position: 'absolute',
            cursor: 'pointer',
          }}
        ></span>
        <h2>{title}</h2>
      </Well>
    </div>
  );
};

export default HeaderTitle;
