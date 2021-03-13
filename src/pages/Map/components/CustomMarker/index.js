import React from 'react';
import { Callout, Marker as RNMarker } from 'react-native-maps';

import PropTypes from 'prop-types';

import { Container, Description, Phone, Title } from './styles';

const Marker = ({ mark }) => (
  <RNMarker coordinate={{ ...mark.coordinate }}>
    <Callout tooltip>
      <Container>
        <Title>{mark.title}</Title>
        <Phone>{mark.phone}</Phone>
        <Description>{mark.description}</Description>
      </Container>
    </Callout>
  </RNMarker>
);

Marker.propTypes = {
  mark: PropTypes.shape({
    coordinate: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};
Marker.defaultProps = {};

export default Marker;
