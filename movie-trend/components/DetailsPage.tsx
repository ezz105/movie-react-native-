import { ImageBackground } from 'react-native';
import React from 'react';
import { MediaType } from '~/interfaces/apiresult';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '~/services/api';
import { Button, H1, Main, Paragraph, ScrollView, Text, YStack, useTheme } from 'tamagui';
import Animated from 'react-native-reanimated';
import { useMMKV, useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import { favorite } from '~/interfaces/favorites';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type DetailsPageProps = {
  id: string;
  mediaType: MediaType;
};

const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
  const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediaType}-${id}`);
  const [favorites, setIsFavorites] = useMMKVObject<favorite[]>('favorites');
  const theme = useTheme();

  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(+id, mediaType),
  });

  const toggleFavorite = () => {
    const current = favorites || [];

    if (!isFavorite) {
      setIsFavorites([
        ...current,
        {
          id,
          mediaType,
          thumb: movieQuery.data?.poster_path,
          name: movieQuery.data?.title || movieQuery.data?.name,
        },
      ]);
    } else {
      setIsFavorites(current.filter((fav) => fav.id !== id || fav.mediaType !== mediaType));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Main>
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <Button
                unstyled
                onPress={toggleFavorite}
                scale={0.95}
                pressStyle={{ scale: 0.95 }}
                animation={'bouncy'}>
                <Ionicons
                  name={isFavorite ? 'star' : 'star-outline'}
                  size={26}
                  color={theme.blue9.get()}
                />
              </Button>
            );
          },
        }}
      />
      <ScrollView>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.backdrop_path}`,
          }}>
          <Animated.Image
            borderRadius={6}
            source={{
              uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.poster_path}`,
            }}
            style={{ width: 200, height: 300, margin: 10 }}
            sharedTransitionTag={`${mediaType === 'movie' ? 'movie' : 'tv'}-${id}`}
          />
        </ImageBackground>

        <YStack
          p={10}
          animation={'lazy'}
          enterStyle={{
            opacity: 0,
            y: 10,
          }}>
          <H1 color={'$blue7'}>
            {movieQuery.data?.title || movieQuery.data?.name}
            <Text fontSize={16}>
              {' '}
              {movieQuery.data?.release_date || movieQuery.data?.first_air_date}
            </Text>
          </H1>
          <Paragraph theme={'alt2'}>{movieQuery.data?.tagline}</Paragraph>
          <Text fontSize={16}>{movieQuery.data?.overview}</Text>
        </YStack>
      </ScrollView>
    </Main>
  );
};

export default DetailsPage;
