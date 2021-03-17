import React, { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { Pressable, Linking, Alert, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import analytics from '@react-native-firebase/analytics';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { get } from 'lodash';
import PropTypes from 'prop-types';

import { Colors } from '~/src/utils';

import {
  Container,
  Image,
  Content,
  Age,
  Name,
  Description,
  Row,
  Col,
  Breed,
  Type,
  CallPhone,
  CallContent,
  OrganizationName,
  OrganizationEmail,
  LoadingImage,
  Loading,
  DeleteContainer,
} from './styles';

const CardPet = ({ data, isLogged = false }) => {
  const [picture, setPicture] = useState();

  useEffect(() => {
    storage()
      .ref(data.path)
      .getDownloadURL()
      .then((url) => {
        setPicture(url);
      })
      .catch((error) => {
        setPicture(null);
        console.log('Error on get pet image', error);
      });
  }, [data.path]);

  const phoneNumber = useMemo(() => get(data, 'organization.phone', '').replace(/\W/g, ''), [data]);

  const callPhone = useCallback(() => {
    let _phoneNumber = phoneNumber;

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
  }, [phoneNumber]);

  const handleDelete = useCallback(async () => {
    try {
      if (data?.id)
        await firestore().collection('pets').doc(data.id).update({
          deleted_at: new Date(),
        });
    } catch (error) {
      console.log('Error on delete pet', error);
      await analytics().logEvent('error_delete_ad', { error: JSON.stringify(error) });
    }
  }, [data]);

  return (
    <>
      <Container>
        <LoadingImage>
          {picture === undefined ? (
            <Loading />
          ) : (
            <Image source={{ uri: picture ?? data.image_url }} />
          )}
        </LoadingImage>
        <Content hasLeftMargin>
          <Name>{data.name}</Name>
          <Age>{data.age} anos</Age>
          <Row>
            <Col>
              <Breed>{data.breed}</Breed>
            </Col>

            <Col>
              <Type>{data.type}</Type>
            </Col>
          </Row>
          <Description>{data.description}</Description>
        </Content>
        {isLogged && (
          <Pressable onPress={handleDelete}>
            <DeleteContainer>
              <Ionicons name='close-circle' size={28} color={Colors.TERTIARY} />
            </DeleteContainer>
          </Pressable>
        )}
      </Container>
      {!isLogged && (
        <Pressable
          onPress={() => {
            if (String(phoneNumber)) {
              callPhone();
            }
          }}
        >
          <Container inverted>
            <Content>
              <OrganizationName>
                {get(data, 'organization.name', 'Sem nome da organização')}
              </OrganizationName>
              <OrganizationEmail>
                {get(data, 'organization.email', 'Sem e-mail da organização')}
              </OrganizationEmail>
            </Content>
            {!!String(phoneNumber) && (
              <CallContent>
                <CallPhone>Ligar para a organização</CallPhone>
              </CallContent>
            )}
          </Container>
        </Pressable>
      )}
    </>
  );
};

CardPet.propTypes = {
  data: PropTypes.shape({
    path: PropTypes.string,
    organization: PropTypes.shape({
      phone: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    image_url: PropTypes.string,
    name: PropTypes.string,
    age: PropTypes.string,
    breed: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  isLogged: PropTypes.bool,
};
CardPet.defaultProps = {
  isLogged: false,
};

export default memo(CardPet);
