import React, { useContext } from 'react';
import { ScrollView } from 'react-native';

import styled from 'styled-components/native';

import UserContext from '~/src/contexts/user';
import { Colors } from '~/src/utils';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.PRIMARY};
`;

const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 10px;
  padding-left: 15px;
  opacity: ${(props) => (props.isActive ? 0.4 : 1)};
`;

const ItemTitle = styled.Text`
  text-align: left;
  font-size: 14px;
  font-weight: 500;
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

const ITEMS = [{ route: 'Main', title: 'Home' }];

const CustomDrawer = ({ navigation, state }) => {
  const {
    state: { isAuthenticated },
  } = useContext(UserContext);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isAuthenticated &&
          ITEMS.map((item, index) => (
            <Item
              key={String(index)}
              isActive={state.index === index}
              onPress={() => {
                if (item.route) navigation.navigate(item.route);
              }}
            >
              <ItemTitle>{item.title}</ItemTitle>
            </Item>
          ))}
      </ScrollView>
      {isAuthenticated ? (
        <Button>
          <ButtonTitle>Fazer logout</ButtonTitle>
        </Button>
      ) : (
        <Button
          onPress={() => {
            navigation.reset({
              routes: [{ name: 'Auth' }],
            });
          }}
        >
          <ButtonTitle>Fazer login</ButtonTitle>
        </Button>
      )}
    </Container>
  );
};

export default CustomDrawer;
