import { StyleSheet } from 'react-native';

import { transparentize } from 'polished';
import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
})`
  background-color: ${Colors.BACKGROUND};
`;

export default StyleSheet.create({
  input: {
    backgroundColor: transparentize(0.9, Colors.BLACK),
  },
});
