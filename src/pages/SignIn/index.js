import React, { useCallback, useContext, useRef, useState } from 'react';
import { Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { LogoColored } from '~/src/assets/icons';
import { Button, Input } from '~/src/components';
import AppContext from '~/src/contexts/app';
import UserContext from '~/src/contexts/user';

import Styles, { Container, Content, Message } from './styles';

const SCHEMA = Yup.object({
  email: Yup.string().email('E-mail inválido').required('E-mail deve ser preenchido'),
  password: Yup.string()
    .min(4, 'Senha deve conter mais de 3 caracteres')
    .max(8, 'Senha deve conter menos de 9 caracteres')
    .required('Senha deve ser preenchido'),
});

const SignIn = () => {
  const navigation = useNavigation();

  const [isShowPassword, setShowPassword] = useState(false);

  const { showLoading } = useContext(AppContext);
  const { handleLogin } = useContext(UserContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = useCallback(
    ({ email, password }) => {
      showLoading();

      handleLogin({ email, password }, () => {
        navigation.reset({
          routes: [{ name: 'App' }],
        });
      });
    },
    [handleLogin, navigation, showLoading]
  );

  const formik = useFormik({
    initialValues: {
      email: __DEV__ ? 'test@test.com' : '',
      password: __DEV__ ? '12345678' : '',
    },
    onSubmit: handleSubmit,
    validationSchema: SCHEMA,
    enableReinitialize: true,
  });

  return (
    <Container>
      <LogoColored width={80} height={80} style={Styles.icon} />

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
          secureTextEntry={!isShowPassword}
          hasPasswordShow
          changeVibility={() => {
            setShowPassword(!isShowPassword);
          }}
          onSubmitEditing={formik.submitForm}
        />
        <Button onPress={formik.submitForm} style={Styles.button}>
          Logar
        </Button>
        <Pressable
          onPress={() => {
            navigation.reset({
              routes: [{ name: 'Main' }],
            });
          }}
        >
          <Message isBold>Continuar sem logar</Message>
        </Pressable>
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
