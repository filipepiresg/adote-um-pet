/* eslint-disable no-use-before-define */
import React, { useCallback, useContext, useEffect, useMemo, useState, useRef } from 'react';
import { Alert, Pressable } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { MaskService } from 'react-native-masked-text';

import analytics from '@react-native-firebase/analytics';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { useFormik } from 'formik';
import { get } from 'lodash';
import * as Yup from 'yup';

import { DefaultProfilePicture } from '~/src/assets/images';
import { Header, Input, Button, ImagePicker, Picture } from '~/src/components';
import UserContext from '~/src/contexts/user';

import Styles, { Container } from './styles';

const SCHEMA = Yup.object({
  name: Yup.string().required(),
});

const CELPHONE_OPTIONS = {
  maskType: 'BRL',
  withDDD: true,
  dddMask: '(99) ',
};

const Profile = () => {
  const {
    state: { profile, user },
  } = useContext(UserContext);

  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(profile?.picture ? { uri: profile.picture } : null);

  const isBlocked = useMemo(() => !isEditable || loading, [isEditable, loading]);

  const nameRef = useRef();
  const phoneRef = useRef();
  const descriptionRef = useRef();
  const addressRef = useRef();
  const photoRef = useRef();

  const handleGeolocation = useCallback(
    async (latitude = 0, longitude = 0) => {
      try {
        const { results, status } = await Geocoder.from(latitude, longitude);

        if (status === 'OK') {
          await analytics().logEvent('get_location');

          return (
            results.filter(({ types }) => types.includes('street_address'))[0]?.formatted_address ||
            'Localização errada'
          );
        }

        await analytics().logEvent('error_get_location', { error: status });

        return 'Ocorreu um erro ao tentar pegar sua localização';
      } catch (error) {
        await analytics().logEvent('error_get_location', { error });
        console.log('Error on get geolocation', error);

        return 'Ocorreu um erro ao tentar pegar sua localização';
      }
    },

    []
  );

  const handleSubmit = useCallback(
    async ({ name, phone, description, address }) => {
      try {
        const { results, status } = await Geocoder.from(address);

        if (status === 'OK') {
          const [
            {
              formatted_address,
              geometry: { location },
            },
          ] = results.filter(({ types }) => types.includes('street_address'));

          if (!user?.uid) {
            throw new Error('User not found');
          }

          if (Object.keys(photo).length > 1) {
            await storage().ref(`users/${user.uid}.png`).putFile(photo.uri, {
              cacheControl: 'no-store',
            });
          }

          const newDocument = {
            name,
            phone,
            description,
            coordinate: {
              latitude: location.lat,
              longitude: location.lng,
            },
          };

          await firestore().collection('users').doc(user.uid).set(newDocument);

          await analytics().logEvent('update_profile', newDocument);

          formik.setFieldValue('address', formatted_address);

          Alert.alert('Atualizado com sucesso', 'Perfil foi atualizado', [
            {
              text: 'OK',
              onPress: () => {
                setIsEditable(false);

                setLoading(false);
              },
            },
          ]);
        } else {
          setLoading(false);
        }
      } catch (error) {
        await analytics().logEvent('error_register', { error });
        console.log('Error on update profile', error);

        Alert.alert('Ocorreu um problema ao atualizar seu perfil', 'Tente novamente em instantes', [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false);
            },
          },
        ]);
      }
    },
    [formik, user, photo]
  );

  const formik = useFormik({
    initialValues: {
      name: get(profile, 'name', ''),
      description: get(profile, 'description', ''),
      phone: get(profile, 'phone', ''),
      address: '',
    },
    validationSchema: SCHEMA,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setFieldValue('name', get(profile, 'name', ''));
    formik.setFieldValue('description', get(profile, 'description', ''));
    formik.setFieldValue('phone', get(profile, 'phone', ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    async function getAddress() {
      const _address = await handleGeolocation(
        profile?.coordinate?.latitude,
        profile?.coordinate?.longitude
      );

      formik.setFieldValue('address', _address);
    }

    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title='Perfil' />
      <Container>
        <ImagePicker ref={photoRef} changePhoto={setPhoto} image={photo}>
          <Pressable
            onPress={() => {
              photoRef.current?.show();
            }}
          >
            <Picture
              source={photo}
              defaultPicture={DefaultProfilePicture}
              styleImage={Styles.picture}
            />
          </Pressable>
        </ImagePicker>

        <Input
          editable={!isBlocked}
          ref={nameRef}
          title='Nome da organização'
          styleInput={Styles.input}
          value={formik.values.name}
          error={formik.touched.name ? formik.errors.name : undefined}
          onChangeText={formik.handleChange('name')}
          onSubmitEditing={() => {
            phoneRef.current?.focus();
          }}
          autoCapitalize='sentences'
          autoCorrect={false}
          keyboardType='default'
          returnKeyType='next'
        />

        <Input
          editable={!isBlocked}
          ref={phoneRef}
          title='Telefone da organização'
          styleInput={Styles.input}
          value={MaskService.toMask('cel-phone', formik.values.phone, CELPHONE_OPTIONS)}
          error={formik.touched.phone ? formik.errors.phone : undefined}
          onChangeText={formik.handleChange('phone')}
          onSubmitEditing={() => {
            addressRef.current?.focus();
          }}
          autoCapitalize='sentences'
          autoCorrect={false}
          keyboardType='default'
          returnKeyType='next'
        />

        <Input
          editable={!isBlocked}
          ref={addressRef}
          title='Endereço da organização'
          styleInput={Styles.input}
          value={formik.values.address}
          error={formik.touched.address ? formik.errors.address : undefined}
          onChangeText={formik.handleChange('address')}
          onSubmitEditing={() => {
            descriptionRef.current?.focus();
          }}
          autoCapitalize='sentences'
          autoCorrect={false}
          keyboardType='default'
          returnKeyType='next'
        />

        <Input
          editable={!isBlocked}
          ref={descriptionRef}
          title='Descrição da organização'
          multiline
          numberOfLines={4}
          styleInput={Styles.input}
          value={formik.values.description}
          error={formik.touched.description ? formik.errors.description : undefined}
          onChangeText={formik.handleChange('description')}
          onSubmitEditing={formik.submitForm}
          autoCapitalize='sentences'
          autoCorrect={false}
          keyboardType='default'
          returnKeyType='send'
          textAlignVertical='top'
        />

        <Button
          disabled={loading}
          onPress={() => {
            if (isEditable) {
              formik.submitForm();
            } else {
              setIsEditable(true);
            }
          }}
        >
          {isEditable ? 'Salvar alterações' : 'Editar dados'}
        </Button>
      </Container>
    </>
  );
};

export default Profile;
