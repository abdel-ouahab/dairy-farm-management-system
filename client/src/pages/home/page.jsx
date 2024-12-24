import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Text, Spinner, SimpleGrid, Card, CardBody, Icon, VStack } from "@chakra-ui/react";
import { SiHappycow } from 'react-icons/si';
import { FaBaby } from 'react-icons/fa';
import { LuMilk } from 'react-icons/lu';

const api = process.env.REACT_APP_API;
export default function Home() {
  const [cowCount, setCowCount] = useState(null);
  const [birthCount, setBirthCount] = useState(null);
  const [milkSum, setMilkSum] = useState(null);
  const [diseaseCounts, setDiseaseCounts] = useState(null);
  const [loadingCows, setLoadingCows] = useState(true);
  const [loadingBirths, setLoadingBirths] = useState(true);
  const [loadingMilkSum, setLoadingMilkSum] = useState(true);
  const [loadingDiseases, setLoadingDiseases] = useState(true);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchCowCount = async () => {
      try {
        const response = await fetch(`${api}/cows/count?userID=${userID}`);
        const data = await response.json();
        if (data.status === "success") {
          setCowCount(data.count);
        } else {
          console.error("Failed to fetch cow count");
        }
      } catch (error) {
        console.error("Error fetching cow count:", error);
      } finally {
        setLoadingCows(false);
      }
    };

    const fetchBirthCount = async () => {
      try {
        const response = await fetch(`${api}/births/countLastYear?userID=${userID}`);
        const data = await response.json();
        if (data.status === "success") {
          setBirthCount(data.count);
        } else {
          console.error("Failed to fetch birth count");
        }
      } catch (error) {
        console.error("Error fetching birth count:", error);
      } finally {
        setLoadingBirths(false);
      }
    };

    const fetchMilkSum = async () => {
      try {
        const response = await fetch(`${api}/milk/sum?userID=${userID}`);
        const data = await response.json();
        if (data.status === "success") {
          setMilkSum(data.totalMilkQuantity);
        } else {
          console.error("Failed to fetch milk sum");
        }
      } catch (error) {
        console.error("Error fetching milk sum:", error);
      } finally {
        setLoadingMilkSum(false);
      }
    };

    const fetchDiseaseCounts = async () => {
      try {
        const response = await fetch(`${api}/examinations/countByDisease?userID=${userID}`);
        const data = await response.json();
        if (data.status === "success") {
          setDiseaseCounts(data.data);
        } else {
          console.error("Failed to fetch disease counts");
        }
      } catch (error) {
        console.error("Error fetching disease counts:", error);
      } finally {
        setLoadingDiseases(false);
      }
    };

    if (userID) {
      fetchCowCount();
      fetchBirthCount();
      fetchMilkSum();
      fetchDiseaseCounts();
    }
  }, [userID]);

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <Flex direction="column" alignItems="center" justify="center" h="100%">
        <VStack spacing={4} align="center">
          <Heading as="h1" size="xl" color="#2B6CB0" fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
            Welcome to Milk Production Company Employee Portal
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color="#4A5568" textAlign="center" maxW="80%">
            Here, you can access various tools and information to enhance your productivity.
          </Text>

          {/* Cow Count */}
          {loadingCows ? (
            <Spinner size="lg" color="teal.500" />
          ) : (
            <Box p={4} borderRadius="md" boxShadow="lg" bg="white" width="100%" maxW="500px">
              <Flex alignItems="center">
                <Icon as={SiHappycow} color="teal.500" boxSize={8} mr={4} />
                <Text fontSize="xl" fontWeight="bold" color="#2B6CB0">
                  {cowCount !== null
                    ? `You have ${cowCount} cow(s) assigned to you.`
                    : "No cows found for your user ID."}
                </Text>
              </Flex>
            </Box>
          )}

          {/* Stats Cards */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={6}>
            {/* Birth Count Card */}
            <Card borderRadius="md" boxShadow="lg" bg="white">
              <CardBody>
                {loadingBirths ? (
                  <Spinner size="lg" color="teal.500" />
                ) : (
                  <Flex alignItems="center">
                    <Icon as={FaBaby} color="cyan.500" boxSize={8} mr={4} />
                    <Text fontSize="lg" color="#4A5568">
                      {birthCount !== null
                        ? `There were ${birthCount} birth(s) in the last year under your care.`
                        : "No births found for your user ID in the last year."}
                    </Text>
                  </Flex>
                )}
              </CardBody>
            </Card>

            {/* Milk Sum Card */}
            <Card borderRadius="md" boxShadow="lg" bg="white">
              <CardBody>
                {loadingMilkSum ? (
                  <Spinner size="lg" color="teal.500" />
                ) : (
                  <Flex alignItems="center">
                    <Icon as={LuMilk} color="orange.500" boxSize={8} mr={4} />
                    <Text fontSize="lg" color="#4A5568">
                      {milkSum !== null
                        ? `You have collected a total of ${milkSum} liters of milk.`
                        : "No milk data found for your user ID."}
                    </Text>
                  </Flex>
                )}
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Disease Examination Card */}
          {loadingDiseases ? (
            <Spinner size="lg" color="teal.500" mt={6} />
          ) : (
            <Box mt={6} width="100%" maxW="800px">
              <Heading as="h3" size="md" color="#2B6CB0" mb={4}>
                Disease Examination Counts:
              </Heading>
              {diseaseCounts ? (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {Object.entries(diseaseCounts).map(([disease, count]) => (
                    <Card key={disease} borderRadius="md" boxShadow="lg" bg="white">
                      <CardBody>
                        <Text fontSize="lg" color="#4A5568">
                          {disease}: {count} examination(s)
                        </Text>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <Text fontSize="lg" color="#4A5568">
                  No disease data found.
                </Text>
              )}
            </Box>
          )}
        </VStack>
      </Flex>
    </Box>
  );
}
