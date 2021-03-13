import { lighten } from 'polished';
import styled from 'styled-components/native';

import { Colors, Metrics } from '~/src/utils';

export const Container = styled.View`
  background-color: ${Colors.WHITE};
  border-radius: 8px;
  padding: 10px;
  width: ${Metrics.screenWidth * 0.6}px;
  min-width: 120px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 16px;
  color: black;
  font-weight: bold;
`;

export const Phone = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 14px;
  color: ${lighten(0.2, 'grey')};
  font-weight: normal;
  margin: 5px 0;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: 14px;
  color: ${lighten(0.07, 'grey')};
  font-weight: normal;
  text-align: justify;
`;
