import {Fragment, useState} from 'react';
import {
  Icon,
  HStack,
  Image,
  Box,
  VStack,
  Text,
  Skeleton,
  Pressable,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {
  useFavoriteRestuarantMutation,
  useUnFavoriteRestuarantMutation,
} from '../../services/restuarant/restaurantApiSlice';
import {useToken} from '../../utils/Helper';
import {SlideAlert} from '../Notifications';

const RestuarantGridCard = ({
  loading,
  fetching,
  coverImage,
  title,
  likes,
  reviews,
  ratings,
  width,
  height,
  prepTime,
  isOpen,
  restuarantID,
  favorite,
  Spinner,
}) => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [slideOpen, setSlideOpen] = useState(false);
  const [slideStatus, setSlideStatus] = useState('');
  const [favoriteRestuarant, {isLoading}] = useFavoriteRestuarantMutation();
  const [unFavoriteRestuarant, {isLoading: unFavLoading}] =
    useUnFavoriteRestuarantMutation();

  const favRestuarant = async () => {
    try {
      if (useToken) {
        const responseData = await favoriteRestuarant(restuarantID);
        if (responseData?.data.status === 'success') {
          setMessage(responseData?.data.message);
          setSlideOpen(true);
          setSlideStatus('success');
          // console.log('success data', responseData?.data.message);
        } else {
          // console.log('error response', responseData?.data.message);
          setMessage(responseData?.data.message);
          setSlideOpen(true);
          setSlideStatus('error');
        }
      } else {
        setMessage('Kindly login to favorite a restuarant!');
        setSlideOpen(true);
        setSlideStatus('error');
      }
    } catch (err) {
      console.log('error response', err.response);
    }
  };

  const unFavRestuarant = async () => {
    try {
      if (useToken) {
        const responseData = await unFavoriteRestuarant(restuarantID);
        if (responseData?.data.status === 'success') {
          setMessage(responseData?.data.message);
          setSlideOpen(true);
          setSlideStatus('error');
          // console.log('success data', responseData?.data.message);
        } else {
          setMessage(responseData?.data.message);
          setSlideOpen(true);
          setSlideStatus('error');
          // console.log('error response', responseData?.data.message);
        }
      } else {
        setMessage('Kindly login to favorite a restuarant!');
        setSlideOpen(true);
        setSlideStatus('error');
      }
    } catch (err) {
      console.log('error response', err.response);
    }
  };

  if (loading || fetching) {
    <VStack bg="white.500" py={2} mx="2">
      <Skeleton
        startColor="grey.500"
        endColor="warmGray.50"
        h={height}
        borderRadius="8"
        w={width}
        maxW="100%"
      />
      <Skeleton.Text p="2" lines={2} />
    </VStack>;
  }
  return (
    <>
      <Pressable
        my={3}
        onPress={() => navigation.navigate('RestuarantInfo', {restuarantID})}>
        <Image
          h={height}
          borderRadius="8"
          w={width}
          maxW="100%"
          source={{
            uri: coverImage,
          }}
          resizeMode="cover"
          alt={title}
        />
      </Pressable>
      <HStack justifyContent="space-between" py={2} bg="white.500">
        <Box>
          <Text
            fontSize="14"
            lineHeight="22"
            fontWeight="500"
            color="black.500"
            letterSpacing="-0.165">
            {title}
          </Text>
          <Text
            fontSize="12"
            lineHeight="20"
            fontWeight="400"
            color="black.500"
            letterSpacing="-0.165">
            {prepTime ? prepTime : 0} mins
            {isOpen ? (
              <Text color="green.500">. Open</Text>
            ) : (
              <Text color="red.500">. Closed</Text>
            )}
          </Text>
        </Box>
        <Box justifyContent="flex-end" alignItems="flex-end">
          <Pressable onPress={favorite ? unFavRestuarant : favRestuarant}>
            {isLoading || unFavLoading ? (
              <Spinner color="red.500" size="sm" />
            ) : (
              <Icon
                as={Feather}
                name="heart"
                size="5"
                color={favorite ? 'red.500' : 'grey.700'}
              />
            )}

            <Text
              fontSize="12px"
              lineHeight="20px"
              fontWeight="400"
              color="black.500"
              letterSpacing="0.165">
              {ratings} ({reviews ? reviews : 0})
            </Text>
          </Pressable>
        </Box>
      </HStack>
      {slideStatus ? (
        <SlideAlert
          message={message}
          status={slideStatus}
          slideOpen={slideOpen}
          setSlideOpen={setSlideOpen}
        />
      ) : null}
    </>
  );
};

export default RestuarantGridCard;
