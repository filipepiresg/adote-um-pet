import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.BACKGROUND};
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px 10px;
`;
