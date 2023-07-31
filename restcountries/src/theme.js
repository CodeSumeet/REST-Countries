// theme.js
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#e7f6ff", // replace with your custom color
      100: "#c0e0ff", // replace with your custom color
      // ... and so on for 200, 300, up to 900 if desired
    },
    light: {
      primary: "#FFFFFF",
      secondary: "#FAFAFA",
    },
    dark: {
      primary: "#2B3743",
      secondary: "#202D36",
    },
  },

  // Color mode config
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: ({ colorMode }) => ({
        color: colorMode === "dark" ? "white" : "black",
      }),
      // 2. We can add a new button size or extend existing
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
      // 3. We can add a new visual variant
      variants: {
        "with-shadow": {
          boxShadow: "0 0 2px 2px #efdfde",
        },
        // 4. We can override existing variants
        solid: ({ colorMode }) => ({
          bg: colorMode === "dark" ? "red.500" : "red.300",
        }),
      },
    },
  },
});

export default theme;
