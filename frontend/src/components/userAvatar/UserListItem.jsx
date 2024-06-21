import { Avatar } from "@chakra-ui/avatar";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Flex
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={5}
      borderRadius="lg"
    >
      <Avatar
        mr={4}
        size="md"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Flex direction="column">
      <Text fontSize="md">
        <Text fontSize="xl">{user.name}</Text>
          <b>Email : </b>
          {user.email}
        </Text>
      </Flex>
    </Flex>
  );
};

export default UserListItem;