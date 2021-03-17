import React, { forwardRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const Content = styled.View`
  flex-direction: row;
  border-radius: 6px;
  background-color: ${(props) => (props.hasError ? Colors.TERTIARY : lighten(0.2, Colors.PRIMARY))};
`;

const Input = styled.TextInput.attrs({
  selectionColor: Colors.BLACK,
  placeholderTextColor: lighten(0.7, Colors.BLACK),
  underlineColorAndroid: 'transparent',
})`
  flex: 1;
  color: ${Colors.BLACK};
  font-size: 16px;
  height: ${(props) =>
    props.multiline && props.numberOfLines > 1 ? `${props.numberOfLines * 30}px` : 'auto'};
  padding: 10px;
`;

const Pressable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  padding: 10px;
`;

const CustomInput = forwardRef(
  (
    {
      title,
      error,
      hasPasswordShow = false,
      secureTextEntry = false,
      changeVibility = () => {},
      styleInput = {},
      styleTitle = {},
      ...props
    },
    ref
  ) => (
    <Container>
      <Title style={styleTitle}>{title}</Title>
      <Content hasError={!!error}>
        <Input {...props} ref={ref} style={styleInput} secureTextEntry={secureTextEntry} />

        {hasPasswordShow && (
          <Pressable onPress={changeVibility}>
            <Ionicons name={secureTextEntry ? 'eye' : 'eye-off'} color={Colors.BLACK} size={16} />
          </Pressable>
        )}
      </Content>
      <ErrorMessage>{error || ' '}</ErrorMessage>
    </Container>
  )
);

export default CustomInput;
