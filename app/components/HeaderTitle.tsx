import React from 'react';
import { Redirect } from 'react-router-dom';
import { Well } from 'react-bootstrap';
import './HeaderTitle.css';

const HeaderTitle = ({
  title,
  redirect,
  dynamicRedirect,
  onDynamicRedirect,
  onRedirect,
  toLink = '/admin/list',
  link = true,
  dynamicPath,
}) => {
  return (
    <div>
      {redirect && <Redirect from="/" to={toLink} />}
      {dynamicRedirect && <Redirect from="/" to={dynamicPath} />}
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
        <div className="header__content">
          <div className="header__linkBack">
            {link && (
              <span
                className="pe-7s-angle-left-circle header__span"
                onClick={onRedirect}
              ></span>
            )}
          </div>
          <div className="header__title">
            <h2>{title}</h2>
          </div>

          <div className="header__listBack">
            {dynamicPath && (
              <span className="pe-7s-car" onClick={onDynamicRedirect}></span>
            )}
          </div>
        </div>
      </Well>
    </div>
  );
};

export default HeaderTitle;
