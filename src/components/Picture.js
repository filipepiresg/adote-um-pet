import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { Colors, Metrics } from '~/src/utils';

const Photo = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: ${Metrics.screenWidth * 0.3}px;
  height: ${Metrics.screenWidth * 0.3}px;
  border-radius: ${Metrics.screenWidth * 0.15}px;
  border-width: 4px;
  border-color: ${Colors.BUTTON};
  align-self: center;
  min-height: 100px;
  max-height: 150px;
  min-width: 100px;
  max-width: 150px;
`;

const Picture = ({ source, defaultPicture = null, styleImage = {} }) => (
  <Photo source={source?.uri ? { uri: source.uri } : defaultPicture} style={styleImage} />
);

Picture.protoTypes = {
  source: PropTypes.oneOf([PropTypes.object, null]),
  defaultPicture: PropTypes.oneOf([PropTypes.number, null]),
  styleImage: PropTypes.object,
};

Picture.defaultProps = {
  source: null,
  defaultPicture: null,
  styleImage: {},
};

export default Picture;
