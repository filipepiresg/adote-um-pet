import { StyleSheet } from 'react-native';

import { transparentize } from 'polished';
import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled',
})`
  background-color: ${Colors.BACKGROUND};
  padding: 10px 10px 20px;
`;

export default StyleSheet.create({
  input: {
    backgroundColor: transparentize(0.9, Colors.BLACK),
  },
});
