import React, { Component } from "react";
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
import { images, theme, rgba } from "../constants";
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

export default class Welcome extends Component {
  scrollX = new Animated.Value(0);

  state = {
    slideIndex: 0,
  };

  componentDidMount() {
    this.scrollX.addListener(({ value }) => {
      this.setState({ slideIndex: Math.floor(value / SIZES.width) });
    });
  }

  componentWillUnmount() {
    this.scrollX.removeAllListeners();
  }

  renderImages() {
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
          [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
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
  }

  renderDots() {
    const dotPosition = Animated.divide(this.scrollX, SIZES.width);

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
  }

  renderTexts() {
    const { slideIndex } = this.state;
    const slide = backgrounds[slideIndex];

    return (
      <>
        <Text style={styles.title}>{slide && slide.title}</Text>
        <Text style={styles.description}>{slide && slide.description}</Text>
      </>
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {/* Slides */}
        <View style={styles.imagesContainer}>{this.renderImages()}</View>

        {/* Bottom content */}
        <View style={styles.bottomContainer}>
          {this.renderTexts()}
          {this.renderDots()}
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
  }
}

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
