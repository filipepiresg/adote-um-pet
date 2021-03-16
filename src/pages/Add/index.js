import React, { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { useFormik } from 'formik';
import { get } from 'lodash';
import * as Yup from 'yup';

import { Header, Input, Button } from '~/src/components';

import Styles, { Container } from './styles';

const SCHEMA = Yup.object({
  name: Yup.string()
    .trim('Esse campo não pode ser só espacos')
    .required('Esse campo é obrigatório'),
  type: Yup.string().required('Esse campo é obrigatório'),
  age: Yup.number()
    .nullable('Idade deve ser preenchida')
    .min(0, 'Abaixo da idade mínima')
    .max(100, 'Ultrapassa a idade máxima')
    .required('Esse campo é obrigatório'),
  breed: Yup.string().required('Esse campo é obrigatório'),
  description: Yup.string(),
});

const Add = () => {
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const typeRef = useRef();
  const ageRef = useRef();
  const breedRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = useCallback((values, { resetForm }) => {
    setLoading(true);

    firestore()
      .collection('pets')
      .add({
        ...values,
        description: get(values, 'description', 'Não possui descrição'),
      })
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        console.log('Error on create pet', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      age: null,
      breed: '',
      description: '',
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validationSchema: SCHEMA,
  });

  return (
    <>
      <Header title='Adicionar pet' hasLeftIcon={false} />
      <Container>
        <KeyboardAvoidingView behavior='padding' enabled={Platform.OS === 'ios'}>
          <Input
            editable={!loading}
            ref={typeRef}
            title='Tipo de animal'
            styleInput={Styles.input}
            value={formik.values.type}
            error={formik.touched.type ? formik.errors.type : undefined}
            onChangeText={formik.handleChange('type')}
            onSubmitEditing={() => {
              nameRef.current?.focus();
            }}
            autoCapitalize='sentences'
            autoCorrect
            keyboardType='default'
            placeholder='Tipo do pet'
            returnKeyType='next'
          />

          <Input
            editable={!loading}
            ref={nameRef}
            title='Nome'
            styleInput={Styles.input}
            value={formik.values.name}
            error={formik.touched.name ? formik.errors.name : undefined}
            onChangeText={formik.handleChange('name')}
            onSubmitEditing={() => {
              ageRef.current?.focus();
            }}
            autoCapitalize='words'
            autoCorrect={false}
            keyboardType='default'
            placeholder='Nome do pet'
            returnKeyType='next'
          />

          <Input
            editable={!loading}
            ref={ageRef}
            title='Idade'
            styleInput={Styles.input}
            value={formik.values.age}
            error={formik.touched.age ? formik.errors.age : undefined}
            onChangeText={formik.handleChange('age')}
            onSubmitEditing={() => {
              breedRef.current?.focus();
            }}
            keyboardType='numeric'
            placeholder='Idade do pet (em anos)'
            returnKeyType='next'
          />

          <Input
            editable={!loading}
            ref={breedRef}
            title='Raça'
            styleInput={Styles.input}
            value={formik.values.breed}
            error={formik.touched.breed ? formik.errors.breed : undefined}
            onChangeText={formik.handleChange('breed')}
            onSubmitEditing={() => {
              descriptionRef.current?.focus();
            }}
            autoCapitalize='sentences'
            autoCorrect
            keyboardType='default'
            placeholder='Raça do pet'
            returnKeyType='next'
          />

          <Input
            editable={!loading}
            ref={descriptionRef}
            title='Descrição'
            styleInput={Styles.input}
            value={formik.values.description}
            error={formik.touched.description ? formik.errors.description : undefined}
            onChangeText={formik.handleChange('description')}
            onSubmitEditing={formik.submitForm}
            autoCapitalize='sentences'
            autoCorrect
            keyboardType='default'
            placeholder='Descrição do pet'
            returnKeyType='send'
          />
        </KeyboardAvoidingView>
        <Button onPress={formik.submitForm}>Enviar dados</Button>
      </Container>
    </>
  );
};

export default Add;
