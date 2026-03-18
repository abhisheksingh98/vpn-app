import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Helper to convert hex + alpha to rgba string
export const rgba = (hex, alpha = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const theme = {
  COLORS: {
    primary: "#0094FC",
    gray: "#535453",
    black: "#000000",
    white: "#FFFFFF",
    success: "#4CAF50",
  },
  SIZES: {
    // global sizes
    base: 8,
    font: 16,
    radius: 30,
    padding: 26,

    // font sizes
    h1: 34,
    h2: 24,
    h3: 20,
    title: 16,
    subtitle: 13,
    caption: 12,
    small: 10,

    // screen dimensions
    width,
    height,
  },
};

export default theme;
