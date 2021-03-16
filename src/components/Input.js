import React, { forwardRef } from 'react';

import { lighten } from 'polished';
import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

const Container = styled.View``;
const Title = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 500;
`;
const ErrorMessage = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.TERTIARY};
  margin-bottom: 5px;
`;
const Input = styled.TextInput.attrs({
  selectionColor: Colors.BLACK,
  placeholderTextColor: lighten(0.7, Colors.BLACK),
  underlineColorAndroid: 'transparent',
})`
  color: ${Colors.BLACK};
  font-size: 16px;
  height: ${(props) =>
    props.multiline && props.numberOfLines > 1 ? `${props.numberOfLines * 30}px` : 'auto'};
  padding: 10px;
  border-radius: 6px;
  background-color: ${(props) => (props.hasError ? Colors.TERTIARY : lighten(0.2, Colors.PRIMARY))};
`;

const CustomInput = forwardRef(
  ({ title, error, styleInput = {}, styleTitle = {}, ...props }, ref) => (
    <Container>
      <Title style={styleTitle}>{title}</Title>
      <Input {...props} hasError={!!error} ref={ref} style={styleInput} />
      <ErrorMessage>{error || ' '}</ErrorMessage>
    </Container>
  )
);

export default CustomInput;
