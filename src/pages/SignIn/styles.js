import { StyleSheet } from 'react-native';

import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.PRIMARY};
`;

export const Content = styled.View`
  flex: 1;
  padding: 10px;
  /* align-items: center; */
  /* justify-content: center; */
`;

export const Message = styled.Text`
  font-size: 14px;
  color: ${Colors.BLACK};
  text-align: center;
  font-weight: ${(props) => (props.isBold ? 'bold' : 'normal')};
`;

export default StyleSheet.create({
  button: {
    marginBottom: 20,
  },
});
