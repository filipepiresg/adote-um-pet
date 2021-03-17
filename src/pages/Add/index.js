import 'react-native-get-random-values';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { Pressable } from 'react-native';

import analytics from '@react-native-firebase/analytics';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { useFormik } from 'formik';
import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { sendNotification } from '~/src/api/onesignal';
import { DefaultPetPicture } from '~/src/assets/images';
import { Header, Input, Button, ImagePicker, Picture } from '~/src/components';
import UserContext from '~/src/contexts/user';

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
  const {
    state: { profile, user },
  } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  const nameRef = useRef();
  const typeRef = useRef();
  const ageRef = useRef();
  const breedRef = useRef();
  const descriptionRef = useRef();
  const photoRef = useRef();

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      try {
        setLoading(true);

        const uid = uuidv4();
        let picture = null;

        if (photo?.uri) {
          const reference = storage().ref(`pets/${uid}.png`);

          await reference.putFile(photo.uri, { cacheControl: 'no-store' });
          picture = reference.toString();
        }

        const document = {
          ...values,
          description: get(values, 'description', 'Não possui descrição'),
          picture,
          organization: {
            name: profile?.name || 'Sem nome',
            phone: profile?.phone || 'Sem telefone',
            email: user?.email || 'Sem e-mail',
          },
        };
        await firestore().collection('pets').doc(uid).set(document);

        await analytics().logEvent('create_ad_pet', document);

        await sendNotification('Um novo pet está disponível para adoção');

        setPhoto(null);
        resetForm();
      } catch (error) {
        console.log('Error on create pet', error);

        await analytics().logEvent('error_permission_requested', {
          error,
        });
      } finally {
        setLoading(false);
      }
    },
    [profile, user, photo]
  );

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
      <Header title='Adicionar pet' />
      <Container>
        <ImagePicker ref={photoRef} changePhoto={setPhoto} image={photo}>
          <Pressable
            onPress={() => {
              photoRef.current?.show();
            }}
          >
            <Picture
              source={photo}
              defaultPicture={DefaultPetPicture}
              styleImage={Styles.picture}
            />
          </Pressable>
        </ImagePicker>

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
          autoCorrect={false}
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
          autoCorrect={false}
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
          autoCorrect={false}
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
          autoCorrect={false}
          keyboardType='default'
          placeholder='Descrição do pet'
          returnKeyType='send'
        />
        <Button onPress={formik.submitForm}>Enviar dados</Button>
      </Container>
    </>
  );
};

export default Add;
