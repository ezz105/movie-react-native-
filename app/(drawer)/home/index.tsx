import { ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { Input, Main, ScrollView, Spinner, YStack } from 'tamagui';
import { Container, Subtitle, Title } from '~/tamagui.config';
import { getSearchResults, getTrending } from '~/services/api';
import { useQuery } from '@tanstack/react-query';
import MovieCard from '~/components/MovieCard';
import useDebounce from '~/utils/useDebounce';

const Page = () => {
  const [searchString, setSearchString] = useState('');
  const debouncedString = useDebounce(searchString, 300);

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: getTrending,
  });

  const searchQuery = useQuery({
    queryKey: ['search', debouncedString],
    queryFn: () => getSearchResults(debouncedString),
    enabled: debouncedString.length > 0,
  });

  return (
    <Main safeArea={true}>
      <ImageBackground
        source={{
          uri: 'https://media.istockphoto.com/id/1526475399/photo/cinema-concept.jpg?s=2048x2048&w=is&k=20&c=7pVIQ4Y-KWmb2iMYqEH2DcWe6x6NCT0_XlrZgER52EI=',
        }}
        style={{ width: '100%', height: 200 }} // Adjusted height value
      >
        <Container>
          <YStack>
            <Title
              color={'$blue12'}
              enterStyle={{
                opacity: 0,
                scale: 1.5,
                y: -10,
              }}
              animation="quick">
              Ternding
            </Title>
            <Input
              placeholder="Search for a movie, tv show, person...."
              placeholderTextColor={'#fff'}
              borderWidth={1}
              size={'$4'}
              value={searchString}
              onChangeText={(text) => setSearchString(text)}
            />
          </YStack>
        </Container>
      </ImageBackground>
      <Subtitle
        p={10}
        enterStyle={{
          opacity: 0,
        }}
        animation="lazy">
        {searchQuery.data?.results ? 'Search Results' : 'Trending'}{' '}
      </Subtitle>

      {(trendingQuery.isLoading || searchQuery.isLoading) && (
        <Spinner py={14} size="large" color={'$blue1'} />
      )}

      <ScrollView
        maxWidth={'1280'}
        horizontal
        showsHorizontalScrollIndicator={false}
        py={40}
        contentContainerStyle={{ gap: 14, paddingLeft: 14 }}>
        {searchQuery.data?.results ? (
          <>{searchQuery.data?.results.map((item) => <MovieCard key={item.id} movie={item} />)}</>
        ) : (
          <>
            {trendingQuery.data?.results && (
              <>
                {trendingQuery.data?.results.map((item) => (
                  <MovieCard key={item.id} movie={item} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </Main>
  );
};

export default Page;
