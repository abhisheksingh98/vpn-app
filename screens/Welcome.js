import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// constants
import { images, theme } from "../constants";
const { background } = images;
const { SIZES, COLORS } = theme;

const backgrounds = [
  {
    title: "Secured, forever.",
    description:
      "Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.",
    img: background.welcome,
  },
  {
    title: "Encrypted, forever.",
    description:
      "Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.",
    img: background.encrypted,
  },
  {
    title: "Privacy, forever.",
    description:
      "Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.",
    img: background.privacy,
  },
];

const Welcome = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const listenerId = scrollX.addListener(({ value }) => {
      setSlideIndex(Math.floor(value / SIZES.width));
    });
    return () => {
      scrollX.removeListener(listenerId);
    };
  }, [scrollX]);

  const renderImages = () => {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {backgrounds.map((item, index) => (
          <View
            key={`img-${index}`}
            style={[styles.slideContainer, { width: SIZES.width }]}
          >
            <Image
              source={item.img}
              resizeMode="contain"
              style={styles.slideImage}
            />
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotsRow}>
        {backgrounds.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[styles.dot, { opacity }]}
            />
          );
        })}
      </View>
    );
  };

  const renderTexts = () => {
    const slide = backgrounds[slideIndex];

    return (
      <>
        <Text style={styles.title}>{slide && slide.title}</Text>
        <Text style={styles.description}>{slide && slide.description}</Text>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Slides */}
      <View style={styles.imagesContainer}>{renderImages()}</View>

      {/* Bottom content */}
      <View style={styles.bottomContainer}>
        {renderTexts()}
        {renderDots()}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imagesContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slideContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  slideImage: {
    width: SIZES.width / 1.5,
    height: SIZES.height * 0.4,
  },
  bottomContainer: {
    alignItems: "center",
    paddingBottom: SIZES.padding * 2.5,
    paddingHorizontal: SIZES.padding,
  },
  title: {
    fontSize: SIZES.h3,
    fontWeight: "600",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: SIZES.small,
  },
  description: {
    fontSize: SIZES.caption,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: SIZES.caption * 1.6,
    marginBottom: SIZES.small,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SIZES.padding,
  },
  dot: {
    width: SIZES.base,
    height: SIZES.base,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.gray,
    marginHorizontal: SIZES.small / 2,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.caption,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
