import React, { useContext, useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';

import { Header } from '~/src/components';
import UserContext from '~/src/contexts/user';

import CardPet from './components/CardPet';
import { Container, Content, Separator } from './styles';

const Pets = () => {
  const {
    state: { user },
  } = useContext(UserContext);

  const [pets, setPets] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('pets')
      .onSnapshot(
        (snapshot) => {
          const PETS = snapshot.docs
            .filter((doc) => doc.exists && !doc.data()?.deleted_at)
            .filter((doc) => (user?.email ? doc.data()?.organization?.email === user.email : true))
            .map((doc) => ({ ...doc.data(), path: `pets/${doc.id}.png`, id: doc.id }));

          setPets(PETS);
        },
        (error) => {
          console.log('Error on get pets', error);
        }
      );

    return () => subscriber();
  }, [user]);

  return (
    <>
      <Header title='Pets' />
      <Container>
        <Content
          data={pets}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item: pet }) => (
            <CardPet
              isLogged={!!user?.email}
              data={{ ...pet, image_url: `https://loremflickr.com/300/300/${pet.type}` }}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
          ListEmptyComponent={() => <></>}
        />
      </Container>
    </>
  );
};

export default Pets;
