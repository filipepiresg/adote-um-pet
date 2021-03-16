import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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

const ITEMS_AUTHENTICATED = [{ route: 'Main', title: 'Home' }];
const ITEMS = [{ route: 'Pets', title: 'Pets para adoção' }];

const CustomDrawer = ({ navigation, state }) => {
  const {
    state: { isAuthenticated: stateIsAuthenticated },
    handleLogout: handleLogoutState,
  } = useContext(UserContext);

  const [isAuthenticated, setIsAuthenticated] = useState(stateIsAuthenticated);

  const items = useMemo(() => (isAuthenticated ? ITEMS_AUTHENTICATED : ITEMS), [isAuthenticated]);

  useEffect(() => {
    setIsAuthenticated(stateIsAuthenticated);
  }, [stateIsAuthenticated]);

  const handleLogout = useCallback(() => {
    handleLogoutState(() => {
      navigation.reset({
        routes: [{ name: 'Main' }],
      });
    });
  }, [handleLogoutState, navigation]);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {items.map((item, index) => (
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
      <Button
        onPress={() => {
          if (isAuthenticated) {
            handleLogout();
          } else {
            navigation.reset({
              routes: [{ name: 'Auth' }],
            });
          }
        }}
      >
        <ButtonTitle>{isAuthenticated ? 'Fazer logout' : 'Fazer login'}</ButtonTitle>
      </Button>
    </Container>
  );
};

export default CustomDrawer;
