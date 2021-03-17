import { transparentize, darken } from 'polished';
import styled from 'styled-components/native';

import { Colors, Metrics } from '~/src/utils';

export const Container = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  background-color: ${transparentize(0.7, Colors.PRIMARY)};
  border-radius: 10px;
  border-top-left-radius: ${(props) => (props.inverted ? 0 : 10)}px;
  border-top-right-radius: ${(props) => (props.inverted ? 0 : 10)}px;
  border-bottom-left-radius: ${(props) => (!props.inverted ? 0 : 10)}px;
  border-bottom-right-radius: ${(props) => (!props.inverted ? 0 : 10)}px;
  align-items: center;
  border-top-width: ${(props) => (props.inverted ? 1 : 0)}px;
  border-color: ${Colors.BUTTON};
`;

export const LoadingImage = styled.View`
  align-items: center;
  justify-content: center;
  width: ${Metrics.screenWidth * 0.2}px;
  height: ${Metrics.screenWidth * 0.2}px;
  border-radius: ${Metrics.screenWidth * 0.1}px;
  margin-right: 10px;
  background-color: ${transparentize(0.5, Colors.BLACK)};
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: 'white',
})``;

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: ${Metrics.screenWidth * 0.2}px;
  height: ${Metrics.screenWidth * 0.2}px;
  border-radius: ${Metrics.screenWidth * 0.1}px;
`;

export const Content = styled.View`
  margin-left: ${(props) => (props.hasLeftMargin ? 10 : 0)}px;
  flex: 1;
`;

export const CallContent = styled.View``;

export const Age = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${transparentize(0.4, Colors.BLACK)};
  font-size: 12px;
  /* font-weight: bold; */
`;

export const Name = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${darken(0.2, Colors.TERTIARY)};
  font-size: 18px;
  font-weight: bold;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${transparentize(0.25, Colors.BLACK)};
  font-size: 15px;
`;

export const Row = styled.View`
  flex-direction: row;
  margin: 5px 0;
  justify-content: space-between;
`;

export const Col = styled.View`
  width: 40%;
`;

export const Breed = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${transparentize(0.25, Colors.BLACK)};
  font-size: 13px;
`;

export const Type = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${transparentize(0.25, Colors.BLACK)};
  font-size: 13px;
`;

export const CallPhone = styled.Text`
  color: ${Colors.BLACK};
  font-size: 11px;
`;

export const OrganizationName = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 16px;
  color: ${Colors.BLACK};
`;

export const OrganizationEmail = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 12px;

  color: ${transparentize(0.4, Colors.BLACK)};
`;
