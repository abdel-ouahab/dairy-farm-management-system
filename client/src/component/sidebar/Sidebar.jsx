import {useCookies} from 'react-cookie';
import { Box, Flex, List, ListItem, Text, Button, Heading, Avatar } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { SiHappycow } from 'react-icons/si';
import { LuMilk } from 'react-icons/lu';
import { FaBaby, FaStethoscope } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import  avatar  from "../../assest/avatar.jpg";

export default function Sidebar() {
  const sidebarItems = [
    { to: "/home", label: "Home", icon: <AiOutlineHome size={20} /> },
    { to: "/cows", label: "Cows", icon: <SiHappycow size={20} /> },
    { to: "/examinations", label: "Examinations", icon: <FaStethoscope size={20} /> },
    { to: "/births", label: "Births", icon: <FaBaby size={20} /> },
    { to: "/milk", label: "Milk", icon: <LuMilk size={20} /> },
  ];
  
  const firstName = localStorage.getItem('firstname');
  const lastName = localStorage.getItem('lastname');
  const [, removeCookie] = useCookies(['token']);

  const logout = () => {
    removeCookie("access_token","")
    window.localStorage.removeItem("userID")
    window.localStorage.removeItem("loggedIn")
    window.localStorage.removeItem("firstname")
    window.localStorage.removeItem("lastname")
    window.location.reload(false)
  };

  return (
    <List color="white" fontSize="1.2em" pt={2} spacing={2} minW="full">
      {sidebarItems.map((item) => (
        <ListItem
          key={item.to}
          _hover={{
            bg: "#6a3ace",
            borderRadius: "md",
            transition: "background-color 0.3s ease",
          }}
          px={6}
          py={2}
          minW="full"
        >
          <NavLink to={item.to}>
            <Flex alignItems="center">
              <Box as="span" mr={2}>{item.icon}</Box>
              <Text>{item.label}</Text>
            </Flex>
          </NavLink>
        </ListItem>
      ))}

    {/* Bottom Section (Profile & Logout) */}
    <Box pt={60}>
        {/* Profile */}
        <Flex
          align="center"
          bg="whiteAlpha.200"
          p={4}
          borderRadius="lg"
          _hover={{ bg: "whiteAlpha.300", transition: "background-color 0.3s ease" }}
        >
          <Avatar
            name= {`${firstName} ${lastName}`}
            size="md"
            src={avatar}
            borderWidth="2px"
            borderColor="white"
          />
          <Flex flexDir="column" ml={4}>
            <Heading as="h3" size="sm" color="white" fontWeight="semibold">
              {`${firstName}`}
            </Heading>
            <Text color="gray.300" fontSize="sm">
            {`${lastName}`}
            </Text>
          </Flex>
        </Flex>

        {/* Logout Button */}
        <Button
          variant="solid"
          colorScheme="blue"
          size="sm"
          width="full"
          mt={2}
          bg="#8b5cf6"
          _hover={{ bg: "#6a3ace" }}
          _active={{ bg: "#452199" }}
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </List>
  );
}





