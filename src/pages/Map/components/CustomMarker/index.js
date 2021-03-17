import React, { useEffect, useMemo, useState, memo } from 'react';
import { Linking, Alert, Platform } from 'react-native';
import { Callout, Marker as RNMarker } from 'react-native-maps';

import storage from '@react-native-firebase/storage';

import { get } from 'lodash';
import PropTypes from 'prop-types';

import { Container, Description, Phone, Title, Content, Picture, ContainerPicture } from './styles';

const Marker = ({ mark }) => {
  const [picture, setPicture] = useState();

  useEffect(() => {
    storage()
      .ref(mark.path)
      .getDownloadURL()
      .then((url) => {
        setPicture(url);
      })
      .catch((error) => {
        setPicture(null);

        console.log('Error on get user image', error);
      });
  }, [mark.path]);

  const content = useMemo(
    () => (
      <Content>
        <Title>{mark.name}</Title>
        <Phone>{mark.phone}</Phone>
        <Description>{mark.description}</Description>
      </Content>
    ),
    [mark]
  );

  return (
    <RNMarker coordinate={{ ...mark.coordinate }}>
      <Callout
        tooltip
        onPress={(event) => {
          if (
            event.nativeEvent.action === 'marker-overlay-press' ||
            event.nativeEvent.action === 'callout-press'
          ) {
            let _phoneNumber = get(mark, 'phone', '').replace(/\W/g, '');

            if (Platform.OS !== 'android') {
              _phoneNumber = `telprompt:${_phoneNumber}`;
            } else {
              _phoneNumber = `tel:${_phoneNumber}`;
            }

            Linking.canOpenURL(_phoneNumber)
              .then((supported) => {
                if (supported) {
                  Linking.openURL(_phoneNumber);
                } else {
                  Alert.alert(
                    'Ocorreu um erro ao fazer a ligação',
                    'Problema ao tentar ligar para este número'
                  );
                }
              })
              .catch((err) => {
                console.log(err);

                Alert.alert(
                  'Ocorreu um erro ao fazer a ligação',
                  'Problema ao tentar ligar para este número'
                );
              });
          }
        }}
      >
        <Container>
          {picture ? (
            <>
              <ContainerPicture>
                <Picture source={{ uri: picture }} />
              </ContainerPicture>

              {content}
            </>
          ) : (
            content
          )}
        </Container>
      </Callout>
    </RNMarker>
  );
};

Marker.propTypes = {
  mark: PropTypes.shape({
    coordinate: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    name: PropTypes.string,
    description: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};
Marker.defaultProps = {};

export default memo(Marker);
