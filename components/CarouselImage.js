import React from 'react';
import { ActivityIndicator, StyleSheet, View, Animated, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel-expo-46-compatible';
import { Image } from 'react-native-elements';
import { size } from 'lodash';

const { width: screenWidth } = Dimensions.get('window');

export default function CarouselImage({ images, height, width }) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const renderItem = ({ item, index }) => {
    const scale = scaleValue.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.95, 1, 0.95],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.imageContainer, { transform: [{ scale }] }]}>
        <Image
          source={{ uri: item }}
          style={[styles.image, { width, height }]}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        layout="default"
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => {
          setActiveSlide(index);
          Animated.spring(scaleValue, {
            toValue: 1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }).start();
        }}
      />
      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={size(images)}
          activeDotIndex={activeSlide}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.paginationDotInactive}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
    marginBottom: 10,
    paddingVertical: 20,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  image: {
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#442484', // Color del punto activo
  },
  paginationDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: '#BDBDBD', // Color del punto inactivo
  },
});
