import { lighten } from 'polished';
import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.BACKGROUND};
  align-items: center;
  justify-content: ${(props) => (props.isError ? 'center' : 'flex-start')};
`;

export const Spinner = styled.ActivityIndicator.attrs({
  size: 'large',
  color: Colors.BLACK,
})`
  padding: 10px 0 0;
`;

export const Message = styled.Text`
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  color: ${lighten(0.2, Colors.BLACK)};
`;
