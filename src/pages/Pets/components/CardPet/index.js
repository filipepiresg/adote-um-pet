import React, { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { Pressable, Linking, Alert, Platform } from 'react-native';

import storage from '@react-native-firebase/storage';

import { get } from 'lodash';

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
} from './styles';

const CardPet = ({ data }) => {
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
      });
  }, [phoneNumber]);

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
      </Container>
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
    </>
  );
};

export default memo(CardPet);
