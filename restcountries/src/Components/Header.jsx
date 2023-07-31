import React from "react";
import ColorModeSwitcher from "../ColorModeSwitcher";
import { Box, Heading, Stack, useColorMode } from "@chakra-ui/react";

const Header = () => {
  const { colorMode } = useColorMode();

  return (
    <Stack>
      <Box
        bg={colorMode === "dark" ? "dark.primary" : "light.primary"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        paddingX={["4", "12", "20", "28"]}
        paddingY={["4vh", "4vh"]}
        boxShadow="md"
      >
        <Heading
          as={"h1"}
          size={["md", "lg", "xl"]}
        >
          Where in the world ?
        </Heading>
        <ColorModeSwitcher />
      </Box>
    </Stack>
  );
};

export default Header;
