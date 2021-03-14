import React, { useCallback, useRef } from 'react';
import { Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Input } from '~/src/components';

import { Container, Content, Button, ButtonTitle, Message } from './styles';

const SCHEMA = Yup.object({
  email: Yup.string().email('E-mail inválido').required('E-mail deve ser preenchido'),
  password: Yup.string()
    .min(4, 'Senha deve conter mais de 3 caracteres')
    .max(8, 'Senha deve conter menos de 9 caracteres')
    .required('Senha deve ser preenchido'),
});

const SignIn = () => {
  const navigation = useNavigation();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = useCallback(({ email, password }) => {
    console.log(email, password);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
    validationSchema: SCHEMA,
    enableReinitialize: true,
  });

  return (
    <Container>
      <Content>
        <Input
          error={formik.touched.email ? formik.errors.email : undefined}
          ref={emailRef}
          title='E-mail'
          placeholder='Digite seu e-mail'
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='email-address'
          returnKeyType='next'
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
        />
        <Input
          error={formik.touched.password ? formik.errors.password : undefined}
          ref={passwordRef}
          title='Senha'
          placeholder='Digite sua senha'
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='default'
          returnKeyType='send'
          secureTextEntry
          onSubmitEditing={formik.submitForm}
        />
        <Button onPress={formik.submitForm}>
          <ButtonTitle>Logar</ButtonTitle>
        </Button>
      </Content>
      <Pressable
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Message>
          Não tem uma conta? <Message isBold>Cadastre-se já!</Message>
        </Message>
      </Pressable>
    </Container>
  );
};

export default SignIn;
