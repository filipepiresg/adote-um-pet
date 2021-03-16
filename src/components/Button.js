import React, { memo } from 'react';

import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: ${Colors.BUTTON};
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: ${(props) => (props.isFull ? 0 : 8)}px;
  margin-bottom: 10px;
`;

const ButtonTitle = styled.Text`
  color: ${Colors.WHITE};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const CustomButton = ({
  children,
  onPress = () => {},
  full,
  styleButton = {},
  styleTitle = {},
  ...props
}) => (
  <Button style={styleButton} onPress={onPress} {...props} isFull={full}>
    <ButtonTitle style={styleTitle}>{children}</ButtonTitle>
  </Button>
);

export default memo(CustomButton);
