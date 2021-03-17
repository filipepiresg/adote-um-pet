import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.BACKGROUND};
`;

export const Content = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
})`
  flex: 1;
`;

export const Separator = styled.View`
  height: 20px;
`;
