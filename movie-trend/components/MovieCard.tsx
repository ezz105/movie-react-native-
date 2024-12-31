import { Link } from 'expo-router';
import Animated from 'react-native-reanimated';
import { Text, Card, YStack, Paragraph } from 'tamagui';
import { ResultItem } from '~/interfaces/apiresult';

type MovieCardProps = {
  movie: ResultItem;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      key={movie.id}
      href={`/(drawer)/home/${movie.media_type === 'movie' ? 'movie' : 'tv'}/${movie.id}`}
      asChild>
      <Card
        elevate
        width={150}
        height={260}
        scale={0.1}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.95 }}
        animation={'bouncy'}>
        <Card.Header p={0}>
          <Animated.Image
            source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
            alt={movie.title}
            style={{ width: 150, height: 200 }}
            sharedTransitionTag={`${movie.media_type === 'movie' ? 'movie' : 'tv'}-${movie.id}`}
            /// هنا كان في خطأ في التشغيل وتم حله عن طريق ازالة / عند استدعاء معرف  الفلم
          />
        </Card.Header>
        <Card.Footer p={5} style={{ backgroundColor: 'blue1' }}>
          <YStack>
            <Text fontSize={12} color={'#fff'}>
              {movie.title || movie.name}
            </Text>
            <Paragraph theme={'alt2'} color={'$color.blue10Dark'}>
              {new Date(movie.release_date! || movie.first_air_date!).getFullYear()}
            </Paragraph>
          </YStack>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default MovieCard;
