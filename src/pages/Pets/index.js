import React, { useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';

import { Header } from '~/src/components';

import CardPet from './components/CardPet';
import { Container, Content, Separator } from './styles';

const Pets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('pets')
      .onSnapshot(
        (snapshot) => {
          const PETS = snapshot.docs
            .filter((doc) => doc.exists)
            .map((doc) => ({ ...doc.data(), path: `pets/${doc.id}.png` }));

          setPets(PETS);
        },
        (error) => {
          console.log('Error on get pets', error);
        }
      );

    return () => subscriber();
  }, []);

  return (
    <>
      <Header title='Pets' />
      <Container>
        <Content
          data={pets}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item: pet }) => (
            <CardPet data={{ ...pet, image_url: `https://loremflickr.com/300/300/${pet.type}` }} />
          )}
          ItemSeparatorComponent={() => <Separator />}
          ListEmptyComponent={() => <></>}
        />
      </Container>
    </>
  );
};

export default Pets;
