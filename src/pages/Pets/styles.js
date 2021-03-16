import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.BACKGROUND};
`;

export const Content = styled.FlatList`
  flex: 1;
  padding: 20px 10px;
`;

export const Separator = styled.View`
  height: 20px;
`;
