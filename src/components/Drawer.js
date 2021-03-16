import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { transparentize } from 'polished';
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
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const ItemTitle = styled.Text`
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
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
  margin-bottom: 10px;
`;

const ButtonTitle = styled.Text`
  color: ${Colors.WHITE};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

const ITEMS_AUTHENTICATED = [
  {
    route: 'App',
    title: 'Home',
    Icon: () => (
      <Entypo name='home' size={20} style={styles.icon} color={transparentize(0.3, Colors.BLACK)} />
    ),
  },
];
const ITEMS = [
  {
    route: 'Main',
    title: 'Mapa',
    Icon: () => (
      <Entypo name='home' size={20} style={styles.icon} color={transparentize(0.3, Colors.BLACK)} />
    ),
  },
  {
    route: 'Pets',
    title: 'Pets para adoção',
    Icon: () => (
      <MaterialIcons
        name='pets'
        size={20}
        style={styles.icon}
        color={transparentize(0.3, Colors.BLACK)}
      />
    ),
  },
];

const CustomDrawer = ({ navigation }) => {
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
        {items.map(({ Icon, ...item }, index) => (
          <Item
            key={String(index)}
            // isActive={state.routeNames[state.index] === item.route}
            onPress={() => {
              if (item.route) navigation.navigate(item.route);
            }}
          >
            <Icon />
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
