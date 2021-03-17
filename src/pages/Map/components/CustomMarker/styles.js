import { lighten, transparentize } from 'polished';
import styled from 'styled-components/native';

import { Colors, Metrics } from '~/src/utils';

export const Container = styled.View`
  background-color: ${Colors.WHITE};
  border-radius: 8px;
  padding: 10px;
  /* width: ${Metrics.screenWidth * 0.65}px; */
  min-width: 120px;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;
`;

export const Content = styled.View`
  margin-left: 10px;
`;

export const ContainerPicture = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${transparentize(0.5, Colors.BLACK)};
  align-items: center;
  justify-content: center;
`;

export const Picture = styled.Image.attrs({
  resizeMode: 'cover',
})`
  border-radius: 15px;
  width: 30px;
  height: 30px;
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
  numberOfLines: 1,
})`
  font-size: 14px;
  color: ${lighten(0.07, 'grey')};
  font-weight: normal;
  text-align: justify;
`;
