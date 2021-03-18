import React, { useCallback, useContext, useRef, useState } from 'react';
import { Alert, Pressable } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { MaskService } from 'react-native-masked-text';

import { useNavigation } from '@react-navigation/native';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DefaultProfilePicture } from '~/src/assets/images';
import { Button, Input, ImagePicker, Picture } from '~/src/components';
import AppContext from '~/src/contexts/app';
import UserContext from '~/src/contexts/user';

import { Container, Content } from './styles';

const SCHEMA = Yup.object({
  name: Yup.string().required('Necessário preencher esse campo'),
  address: Yup.string().required('Necessário preencher esse campo'),
  phone: Yup.string()
    .min(14, 'Telefone inválido')
    .max(15, 'Telefone inválido')
    .required('Necessário preencher esse campo'),
  description: Yup.string()
    .max(250, 'Descrição deve conter até 250 caracteres')
    .required('Necessário preencher esse campo'),
  email: Yup.string().email('E-mail inválido').required('Necessário preencher esse campo'),
  password: Yup.string()
    .min(4, 'Senha deve conter mais de 3 caracteres')
    .max(8, 'Senha deve conter menos de 9 caracteres')
    .required('Necessário preencher esse campo'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais')
    .required('Necessário preencher esse campo'),
});

const CELPHONE_OPTIONS = {
  maskType: 'BRL',
  withDDD: true,
  dddMask: '(99) ',
};

const SignUp = () => {
  const navigation = useNavigation();
  const { handleRegister } = useContext(UserContext);
  const { showLoading, hideLoading } = useContext(AppContext);

  const [photo, setPhoto] = useState(null);

  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const descriptionRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const photoRef = useRef();

  const handleSubmit = useCallback(
    (values) => {
      Geocoder.from(values.address).then(({ results, status }) => {
        showLoading();

        if (status === 'OK') {
          const [
            {
              geometry: { location },
            },
          ] = results.filter(({ types }) => types.includes('street_address'));

          handleRegister(
            {
              coordinate: {
                latitude: location.lat,
                longitude: location.lng,
              },
              picture: photo,
              ...values,
            },
            () => {
              Alert.alert('Conta criada com sucesso', null, [
                {
                  onPress: () => {
                    navigation.reset({
                      routes: [{ name: 'App' }],
                    });
                  },
                  text: 'OK',
                },
              ]);
            },
            () => {
              Alert.alert('Aconteceu um problema', 'Não foi possível criar a conta', [
                {
                  text: 'OK',
                },
              ]);
            }
          );
        } else {
          hideLoading();

          setTimeout(() => {
            Alert.alert('Aconteceu um problema', 'Não foi possível encontrar sua localização', [
              {
                text: 'OK',
                onPress: () => {
                  addressRef.current?.focus();
                },
              },
            ]);
          }, 100);
        }
      });
    },
    [handleRegister, hideLoading, navigation, photo, showLoading]
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      phone: '',
      description: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    enableReinitialize: true,
    validationSchema: SCHEMA,
    onSubmit: handleSubmit,
  });

  return (
    <Container>
      <Content>
        <ImagePicker ref={photoRef} changePhoto={setPhoto} image={photo}>
          <Pressable
            onPress={() => {
              photoRef.current?.show();
            }}
          >
            <Picture source={photo} defaultPicture={DefaultProfilePicture} />
          </Pressable>
        </ImagePicker>

        <Input
          ref={nameRef}
          title='Nome'
          error={formik.touched.name ? formik.errors.name : undefined}
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
          onSubmitEditing={() => addressRef.current?.focus()}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='default'
          placeholder='Digite o nome da instituição'
          returnKeyType='next'
        />

        <Input
          ref={addressRef}
          title='Endereço'
          error={formik.touched.address ? formik.errors.address : undefined}
          value={formik.values.address}
          onChangeText={formik.handleChange('address')}
          onSubmitEditing={() => phoneRef.current?.focus()}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='default'
          placeholder='Rua principal, 00, Campina Grande-PB'
          returnKeyType='next'
        />

        <Input
          ref={phoneRef}
          title='Telefone'
          error={formik.touched.phone ? formik.errors.phone : undefined}
          value={MaskService.toMask('cel-phone', formik.values.phone, CELPHONE_OPTIONS)}
          onChangeText={formik.handleChange('phone')}
          maxLength={15}
          onSubmitEditing={() => descriptionRef.current?.focus()}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='phone-pad'
          placeholder='(00) 00000-0000'
          returnKeyType='next'
        />

        <Input
          ref={descriptionRef}
          title='Descrição'
          error={formik.touched.description ? formik.errors.description : undefined}
          value={formik.values.description}
          onChangeText={formik.handleChange('description')}
          onSubmitEditing={() => emailRef.current?.focus()}
          maxLength={250}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='default'
          placeholder='Digite a descrição da instituição'
          returnKeyType='next'
        />

        <Input
          ref={emailRef}
          title='E-mail da conta'
          error={formik.touched.email ? formik.errors.email : undefined}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onSubmitEditing={() => passwordRef.current?.focus()}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='default'
          placeholder='example@mail.com'
          returnKeyType='next'
        />

        <Input
          ref={passwordRef}
          title='Senha da conta'
          error={formik.touched.password ? formik.errors.password : undefined}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onSubmitEditing={() => {
            passwordConfirmRef.current?.focus();
          }}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='default'
          placeholder='•••••'
          secureTextEntry
          returnKeyType='done'
        />

        <Input
          ref={passwordConfirmRef}
          title='Confirme sua senha'
          error={formik.touched.passwordConfirm ? formik.errors.passwordConfirm : undefined}
          value={formik.values.passwordConfirm}
          onChangeText={formik.handleChange('passwordConfirm')}
          onSubmitEditing={formik.handleSubmit}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='default'
          placeholder='•••••'
          secureTextEntry
          returnKeyType='done'
        />

        <Button onPress={formik.handleSubmit}>Cadastrar</Button>
      </Content>
    </Container>
  );
};

export default SignUp;
