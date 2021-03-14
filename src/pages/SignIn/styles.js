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

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: ${Colors.BUTTON};
  /* flex: 1; */
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 8px;
`;

export const ButtonTitle = styled.Text`
  color: ${Colors.WHITE};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const Message = styled.Text`
  font-size: 14px;
  color: ${Colors.BLACK};
  text-align: center;
  font-weight: ${(props) => (props.isBold ? 'bold' : 'normal')};
`;
