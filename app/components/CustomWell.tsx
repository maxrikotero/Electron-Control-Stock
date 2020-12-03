import React from 'react';
import { Grid, Row, Col, Well } from 'react-bootstrap';
import HeaderTitle from './HeaderTitle';
import useRedirect from '../hooks/useRedirect';

const CustomWell = ({
  children,
  headerTitle,
  toLink,
  isEdit = false,
  link = true,
}) => {
  const { redirect, setRedirect } = useRedirect();
  return (
    <div className="content">
      {!isEdit && (
        <HeaderTitle
          title={headerTitle}
          redirect={redirect}
          link={link}
          onRedirect={() => setRedirect((prev) => !prev)}
          toLink={toLink}
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
