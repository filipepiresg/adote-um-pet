import React, { useCallback, useRef } from 'react';
import { MaskService } from 'react-native-masked-text';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, Input } from '~/src/components';

import { Container, Content } from './styles';

const SCHEMA = Yup.object({
  name: Yup.string().required('Necessário preencher esse campo'),
  address: Yup.string().required('Necessário preencher esse campo'),
  phone: Yup.string()
    .min(10, 'Telefone inválido')
    .max(11, 'Telefone inválido')
    .required('Necessário preencher esse campo'),
  description: Yup.string()
    .max(250, 'Descrição deve conter até 250 caracteres')
    .required('Necessário preencher esse campo'),
  email: Yup.string().email('E-mail inválido').required('Necessário preencher esse campo'),
  password: Yup.string()
    .min(4, 'Senha deve conter mais de 3 caracteres')
    .max(8, 'Senha deve conter menos de 9 caracteres')
    .required('Necessário preencher esse campo'),
});

const CELPHONE_OPTIONS = {
  maskType: 'BRL',
  withDDD: true,
  dddMask: '(99) ',
};

const SignUp = () => {
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const descriptionRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      phone: '',
      description: '',
      email: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: SCHEMA,
    onSubmit: handleSubmit,
  });

  return (
    <Container>
      <Content>
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
          placeholder='Rua principal, 00, campina grande'
          returnKeyType='next'
        />
        <Input
          ref={phoneRef}
          title='Telefone'
          error={formik.touched.phone ? formik.errors.phone : undefined}
          value={MaskService.toMask('cel-phone', formik.values.phone, CELPHONE_OPTIONS)}
          // onChangeText={formik.handleChange('phone')}
          onChangeText={(text) => {
            const phone = MaskService.toRawValue('cel-phone', text, CELPHONE_OPTIONS);
            formik.setFieldValue('phone', phone);
          }}
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
