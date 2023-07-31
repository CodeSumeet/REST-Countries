import React from "react";
import {
  Box,
  Stack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useColorMode,
  Card,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Data } from "../App";

const Home = () => {
  const { colorMode } = useColorMode();

  return (
    <Data.Consumer>
      {(value) => {
        const {
          data,
          setName,
          uniqueData,
          selectedRegion,
          setSelectedRegion,
          setCurrentCountry,
        } = value;
        return (
          <Box>
            <Box
              bg={colorMode === "dark" ? "dark.secondary" : "light.secondary"}
              paddingY={["4vh", "6vh"]}
            >
              <Stack
                direction={["column", "row"]}
                paddingX={["4", "12", "20", "28"]}
                justifyContent={"space-between"}
                gap={12}
              >
                <InputGroup maxW={"500px"}>
                  <InputLeftElement
                    marginTop={"1.1em"}
                    marginLeft={"1.5em"}
                  >
                    <SearchIcon fontSize={"1.5em"} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search for a country..."
                    variant={"filled"}
                    padding={"30px 70px"}
                    fontSize={"lg"}
                    boxShadow="md"
                    bg={colorMode === "dark" ? "dark.primary" : "light.primary"}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>

                <Select
                  placeholder="Filter by Region"
                  variant={"filled"}
                  bg={colorMode === "dark" ? "dark.primary" : "light.primary"}
                  maxW={"200px"}
                  h={"62px"}
                  fontSize={"lg"}
                  boxShadow="md"
                  cursor={"pointer"}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  {uniqueData.map((region, index) => {
                    return (
                      <option
                        value={region}
                        key={index}
                      >
                        {region}
                      </option>
                    );
                  })}
                </Select>
              </Stack>
            </Box>

            <Box
              paddingX={["16", "12", "20", "28"]}
              paddingY={4}
              bg={colorMode === "dark" ? "dark.secondary" : "light.secondary"}
            >
              {data && data.length > 0 && (
                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                    "repeat(4, 1fr)",
                  ]}
                  gap={[10, 12, 20, 24]}
                  bg={
                    colorMode === "dark" ? "dark.secondary" : "light.secondary"
                  }
                >
                  {data
                    .filter((item) =>
                      selectedRegion ? item.region === selectedRegion : true
                    )
                    .map((item, index) => {
                      // Existing code...
                      return (
                        <Link
                          to={{
                            pathname:
                              "/countries/" +
                              item.name.common.toLowerCase().replace(" ", "-"),
                            state: { myData: "Hello, World!" },
                          }}
                          key={index}
                          onClick={() => setCurrentCountry(item.name.common)}
                        >
                          <Card h={"360px"}>
                            <Image
                              src={item.flags.svg}
                              alt={item.name.common}
                              h={"160px"}
                              w={"full"}
                              objectFit={"cover"}
                              borderTopRadius={"inherit"}
                            />
                            <Box
                              px={8}
                              py={8}
                            >
                              <Heading
                                as={"h3"}
                                fontSize={"20px"}
                              >
                                {item.name.common}
                              </Heading>

                              <Box mt={6}>
                                <Text
                                  fontSize={"14px"}
                                  display={"flex"}
                                  alignItems={"center"}
                                  gap={2}
                                >
                                  <Text
                                    fontWeight={"semibold"}
                                    fontSize={"16px"}
                                  >
                                    Population:
                                  </Text>
                                  {item.population}
                                </Text>

                                <Text
                                  fontSize={"14px"}
                                  display={"flex"}
                                  alignItems={"center"}
                                  gap={2}
                                >
                                  <Text
                                    fontWeight={"semibold"}
                                    fontSize={"16px"}
                                  >
                                    Region:
                                  </Text>
                                  {item.region}
                                </Text>

                                <Text
                                  fontSize={"14px"}
                                  display={"flex"}
                                  alignItems={"center"}
                                  gap={2}
                                >
                                  <Text
                                    fontWeight={"semibold"}
                                    fontSize={"16px"}
                                  >
                                    Capital:
                                  </Text>
                                  {item.capital}
                                </Text>
                              </Box>
                            </Box>
                          </Card>
                        </Link>
                      );
                    })}
                </Grid>
              )}
            </Box>
          </Box>
        );
      }}
    </Data.Consumer>
  );
};

export default Home;
