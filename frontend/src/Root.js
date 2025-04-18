import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

export default function Root() {
  return (
    <Flex h="100vh" direction="column">
      <NavBar />
      <main className="flex-shrink-0 flex-grow-1">
        <Outlet />
      </main>
    </Flex>
  );
}
