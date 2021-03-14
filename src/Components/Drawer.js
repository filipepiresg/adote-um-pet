import React from 'react';
import { ScrollView } from 'react-native';

import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.PRIMARY};
`;

const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: ${Colors.BUTTON};
  width: 90%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 8px;
`;
const ButtonTitle = styled.Text`
  color: ${Colors.WHITE};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const ITEMS = [
  { route: 'Main', title: 'Home' },
  { route: 'Auth', title: 'Login' },
];

const CustomDrawer = ({ navigation }) => (
  <Container>
    <ScrollView showsVerticalScrollIndicator={false} />
    <Button
      onPress={() => {
        navigation.reset({
          routes: [{ name: ITEMS[1].route }],
        });
      }}
    >
      <ButtonTitle>Fazer login</ButtonTitle>
    </Button>
  </Container>
);

export default CustomDrawer;
