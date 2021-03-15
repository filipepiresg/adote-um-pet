import React, { memo } from 'react';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { Colors } from '~/src/utils';

const Container = styled.View`
  background-color: ${Colors.PRIMARY};
  flex-direction: row;
  padding: ${(props) => props.topInset}px 10px 0;
  align-items: center;
`;

const Content = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${Colors.BUTTON};
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
`;

const EmptyIcon = styled.View`
  width: 24px;
  height: 24px;
`;

const HeaderCustom = ({ title, hasLeftIcon = true }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <Container topInset={insets.top}>
      {hasLeftIcon ? (
        <Pressable
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Ionicons name='menu-sharp' size={24} color={Colors.BUTTON} />
        </Pressable>
      ) : (
        <EmptyIcon />
      )}
      <Content>
        <Title>{title}</Title>
      </Content>
      <EmptyIcon />
    </Container>
  );
};

HeaderCustom.propTypes = {
  title: PropTypes.string.isRequired,
  hasLeftIcon: PropTypes.bool,
};
HeaderCustom.defaultProps = {
  hasLeftIcon: true,
};

export default memo(HeaderCustom);
