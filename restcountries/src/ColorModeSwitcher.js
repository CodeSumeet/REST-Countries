import React from "react";
import { useColorMode, useColorModeValue, Button, Box } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = (props) => {
  const { toggleColorMode } = useColorMode();
  // const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={"2"}
    >
      <Button
        variant="ghost"
        color="current"
        colorScheme="blackAlpha"
        fontSize={"16"}
        fontWeight={"semibold"}
        zIndex={"overlay"}
        onClick={toggleColorMode}
        leftIcon={<SwitchIcon size={16} />}
        gap={"2"}
        {...props}
      >
        Dark Mode
      </Button>
    </Box>
  );
};

export default ColorModeSwitcher;
