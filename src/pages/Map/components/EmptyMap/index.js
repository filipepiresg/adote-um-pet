import React from 'react';

import PropTypes from 'prop-types';

import { Container, Spinner, Message } from './styles';

const EmptyMap = ({ data }) => (
  <Container isError={!data.loading}>
    {data.loading ? <Spinner /> : <Message>{data.error}</Message>}
  </Container>
);

EmptyMap.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
};
EmptyMap.defaultProps = {};

export default EmptyMap;
