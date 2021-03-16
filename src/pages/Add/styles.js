import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { transparentize } from 'polished';
import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

export const Container = styled(KeyboardAwareScrollView).attrs({
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
})`
  padding-top: 10px;
  background-color: ${Colors.BACKGROUND};
`;

export default StyleSheet.create({
  input: {
    backgroundColor: transparentize(0.9, Colors.BLACK),
  },
  picture: {
    marginBottom: 30,
  },
});
