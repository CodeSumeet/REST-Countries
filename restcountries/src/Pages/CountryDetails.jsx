import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Data } from "../App";
import { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

const CountryDetails = () => {
  const { colorMode } = useColorMode();
  const cookies = new Cookies();

  const [selectedCountry, setSelectedCountry] = useState(
    cookies.get("selectedCountry") || []
  );

  const { data, currentCountry, setCurrentCountry } = useContext(Data);
  console.log(currentCountry);

  useEffect(() => {
    if (currentCountry && data) {
      const country = data.find(
        (country) => country.name.common === currentCountry
      );
      setSelectedCountry(country);
      cookies.set("selectedCountry", country, { path: "/" });
    }
  }, [currentCountry, data, cookies]);

  console.log(selectedCountry);

  useEffect(() => {
    if (currentCountry) {
      cookies.set("currentCountry", currentCountry, { path: "/" });
    }
  }, [currentCountry, cookies]);

  useEffect(() => {
    const savedCountryName = cookies.get("currentCountry");

    if (savedCountryName && data) {
      const country = data.find(
        (country) => country.name.common === savedCountryName
      );
      setSelectedCountry(country);
      setCurrentCountry(savedCountryName);
    }
  }, [data, cookies]);

  const currencyCodes = Object.keys(selectedCountry?.currencies || {});
  const firstCurrencyCode = currencyCodes[0];
  const firstCurrencyName =
    selectedCountry?.currencies?.[firstCurrencyCode]?.name;

  return (
    <Box
      bg={colorMode === "dark" ? "dark.secondary" : "light.secondary"}
      paddingY={["6vh", "8vh", "12vh"]}
    >
      <Box paddingX={["8", "12", "20", "28"]}>
        <Button
          bg={colorMode === "dark" ? "dark.primary" : "light.primary"}
          leftIcon={<FaArrowLeftLong size={"16px"} />}
          w={"140px"}
          h={"40px"}
          fontSize={"16px"}
          gap={2}
          boxShadow={"dark-lg"}
          outline={"none"}
          onClick={() => window.history.back()}
        >
          Back
        </Button>

        {selectedCountry && selectedCountry.flags && (
          <Stack
            direction={["column", "column", "column", "row"]}
            gap={[20, 20, 48]}
            mt={28}
          >
            <Box
              maxW={"600px"}
              h={["250px", "490px"]}
              boxShadow={"dark-lg"}
            >
              <Image
                src={selectedCountry.flags.png}
                w={"full"}
                h={"full"}
              />
            </Box>

            <Box
              mt={"auto"}
              mb={"auto"}
            >
              <Heading
                as={"h1"}
                fontSize={[28, 36]}
              >
                {selectedCountry.name.common}
              </Heading>

              <Stack
                direction={["column", "column", "row"]}
                mt={12}
                gap={[12, 16, 24, 32]}
              >
                <VStack
                  fontSize={24}
                  textAlign={"left"}
                  align={"left"}
                >
                  <HStack>
                    <Text fontWeight={"semibold"}>Native Name: </Text>{" "}
                    <Text>{selectedCountry.name.common}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight={"semibold"}>Population: </Text>{" "}
                    <Text>{selectedCountry.population}</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight={"semibold"}>Region: </Text>{" "}
                    <Text>{selectedCountry.region}</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight={"semibold"}>Sub Region: </Text>{" "}
                    <Text>{selectedCountry.subregion}</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight={"semibold"}>Capital: </Text>{" "}
                    <Text>{selectedCountry.capital[0]}</Text>
                  </HStack>
                </VStack>

                <VStack
                  fontSize={24}
                  textAlign={"left"}
                  align={"left"}
                >
                  <HStack mt={"auto"}>
                    <Text fontWeight={"semibold"}>Top Level Domains: </Text>{" "}
                    <Text>{selectedCountry.tld[0]}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight={"semibold"}>Currencies: </Text>{" "}
                    <Text>{firstCurrencyName}</Text>
                  </HStack>
                  <HStack mb={"auto"}>
                    <Text fontWeight={"semibold"}>Languages: </Text>{" "}
                    {selectedCountry && selectedCountry.languages && (
                      <Text>
                        {Object.values(selectedCountry.languages).join(", ")}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Stack>

              <Stack
                direction={["column", "row"]}
                fontSize={24}
                gap={4}
                mt={[16, 32]}
              >
                {selectedCountry && selectedCountry.borders && (
                  <Stack>
                    <Text>Border Countries:</Text>
                    <HStack>
                      {selectedCountry &&
                        selectedCountry.borders &&
                        selectedCountry.borders.map((borderCountryCode) => {
                          const borderCountry = data.find(
                            (country) => country.cca3 === borderCountryCode
                          );
                          return (
                            <Button
                              key={borderCountryCode}
                              bg={
                                colorMode === "dark"
                                  ? "dark.primary"
                                  : "light.primary"
                              }
                              boxShadow={"md"}
                            >
                              {borderCountry
                                ? borderCountry.name.common
                                : borderCountryCode}
                            </Button>
                          );
                        })}
                    </HStack>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default CountryDetails;
