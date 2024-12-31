import React from 'react';
import { useMMKVObject } from 'react-native-mmkv';
import { Main, Container } from '~/tamagui.config';
import { ListItem, ScrollView } from 'tamagui';
import { Link } from 'expo-router';
import { favorite } from '~/interfaces/favorites';
import Animated from 'react-native-reanimated';

const Page = () => {
  const [favorites, setFavorites] = useMMKVObject<favorite[]>('favorites');

  return (
    <Main>
      <Container>
        <ScrollView>
          {favorites?.map((fav) => {
            return (
              <Link key={fav.id} href={`/(drawer)/favorites/${fav.mediaType}/${fav.id}`} asChild>
                <ListItem
                  theme={'alt2'}
                  title={fav.name}
                  size={'$3'}
                  icon={() => (
                    <Animated.Image
                      sharedTransitionTag={`${fav.mediaType === 'movie' ? 'movie' : 'tv'}-${fav.id}`}
                      source={{ uri: `https://image.tmdb.org/t/p/w500${fav.thumb}` }}
                      style={{ width: 50, height: 50 }}></Animated.Image>
                  )}></ListItem>
              </Link>
            );
          })}
        </ScrollView>
      </Container>
    </Main>
  );
};
export default Page;
