import React, { useEffect, useState } from "react";
import { Box, Button, Container, Text, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState([]);
  const [data, setData] = useState([]);

  const history = useHistory();
  const toast = useToast();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authToken"));

    if (!user) history.push("/");
  }, [history]);
  const authToken =
    localStorage?.authToken && JSON.parse(localStorage?.authToken)?.token;
  const submitHandler = async () => {
    if (title.length === 0) {
      toast({
        title: "Please provide a title",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "x-access-token": authToken,
          },
        };

        const { data } = await axios.get(
          `/api/titles?token=${authToken}&title=${title}`,
          config
        );

        setLoading(false);
        setData(data);
        history.push("/search");
        console.log(data);
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          toast({
            title: "No Auth Token",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        } else {
          toast({
            title: error.Error || "No Titles found!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }

        setLoading(false);
      }
    }
  };

  return (
    <Container maxW="xl" centerContent>
      <Button
        onClick={() => {
          localStorage.removeItem("authToken");
          window.location.reload();
        }}
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
      >
        Logout
      </Button>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Search for titles
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <VStack spacing="10px">
          <FormControl id="email" isRequired>
            <FormLabel>Enter Title Name</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="email"
              placeholder="Enter Your Title Name here"
            />
          </FormControl>

          <Button
            onClick={submitHandler}
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
          >
            Search
          </Button>
        </VStack>
        {data.length !== 0 && (
          <div class="card">
            <img src={data.Poster} alt={data.Title} />
            <div class="container">
              <h4>
                <b>{data.Title} </b>
              </h4>
              <p>{data.Year}</p>
              <p>{data.Actors}</p>
            </div>
          </div>
        )}
      </Box>
    </Container>
  );
};

export default Search;
