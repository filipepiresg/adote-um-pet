import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.PRIMARY};
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 10px;
`;
