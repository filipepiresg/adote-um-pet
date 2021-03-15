import React, { useCallback, useMemo } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { get } from 'lodash';
import { transparentize } from 'polished';
import styled from 'styled-components/native';

import { Colors } from '../utils';

const Container = styled.SafeAreaView`
  background-color: ${Colors.PRIMARY};
`;
const Content = styled.View`
  padding: 10px 0 0;
  flex-direction: row;
`;

const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  /* padding: 10px; */
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ContentIcon = styled.View`
  background-color: ${(props) => transparentize(props.isActive ? 0.2 : 0, Colors.BUTTON)};
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-top: -25px;
`;

const BUTTONS = [
  {
    render: (active) => (
      <Ionicons
        size={30}
        color={transparentize(active ? 0.2 : 0, Colors.BUTTON)}
        name='add-circle-sharp'
      />
    ),
  },
  {
    render: (active) => (
      <ContentIcon isActive={active}>
        <FontAwesome
          size={25}
          color={(transparentize(active ? 0.2 : 0), Colors.WHITE)}
          name='map'
        />
      </ContentIcon>
    ),
  },
  {
    render: (active) => (
      <FontAwesome
        size={25}
        color={transparentize(active ? 0.2 : 0, Colors.BUTTON)}
        name='user-circle'
      />
    ),
  },
];

const CustomTab = ({ state, navigation }) => {
  const routeNames = useMemo(() => get(state, 'routeNames', []), [state]);

  const handlePress = useCallback(
    (index) => {
      navigation.jumpTo(routeNames[index], {});
    },
    [navigation, routeNames]
  );

  return (
    <Container>
      <Content>
        {BUTTONS.map((item, index) => (
          <Item
            key={String(index)}
            onPress={() => {
              handlePress(index);
            }}
          >
            {item.render(state.index === index, index)}
          </Item>
        ))}
      </Content>
    </Container>
  );
};

export default CustomTab;
