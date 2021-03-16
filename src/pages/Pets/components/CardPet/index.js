import React, { useCallback, memo } from 'react';
import { Pressable, Linking, Alert, Platform } from 'react-native';

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
} from './styles';

const CardPet = ({ data }) => {
  const callPhone = useCallback((phone) => {
    let phoneNumber = phone.replace(/\W/g, '');

    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneNumber);
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
  }, []);

  return (
    <>
      <Container>
        <Image source={{ uri: data.image_url }} />
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
          if (data?.organization?.phone) callPhone(data.organization.phone);
        }}
      >
        <Container inverted>
          <Content>
            <OrganizationName>{get(data, 'organization.name', '')}</OrganizationName>
            <OrganizationEmail>{get(data, 'organization.email', '')}</OrganizationEmail>
          </Content>
          <CallContent>
            <CallPhone>Ligar para a organização</CallPhone>
          </CallContent>
        </Container>
      </Pressable>
    </>
  );
};

export default memo(CardPet);
