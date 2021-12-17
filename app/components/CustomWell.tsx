import React, { useState } from 'react';
import { Grid, Row, Col, Well } from 'react-bootstrap';
import HeaderTitle from './HeaderTitle';
import useRedirect from '../hooks/useRedirect';

const CustomWell = ({
  children,
  headerTitle,
  toLink,
  isEdit = false,
  hideHeader = false,
  link = true,
  dynamicPath = null,
}) => {
  const { redirect, setRedirect } = useRedirect();
  const [dynamicRedirect, setDynamicRedirect] = useState(false);
  return (
    <div className="content">
      {!isEdit && !hideHeader && (
        <HeaderTitle
          title={headerTitle}
          redirect={redirect}
          link={link}
          onDynamicRedirect={() => setDynamicRedirect((prev) => !prev)}
          onRedirect={() => setRedirect((prev) => !prev)}
          toLink={toLink}
          dynamicPath={dynamicPath}
          {...{ dynamicRedirect }}
        />
      )}

      <Grid fluid>
        <Row>
          <Col md={12} style={{ padding: '0' }}>
            <Well
              style={{
                background: '#fff',
              }}
            >
              {children}
            </Well>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default CustomWell;
