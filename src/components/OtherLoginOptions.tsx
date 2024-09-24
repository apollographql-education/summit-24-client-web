import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Link } from "react-router-dom";

const USERS = [
  "Athes - Guest",
  "Kelle - Host",
  "Renie - Host",
  "Flinson - Host",
  "Cara - Guest",
  "Wardy - Guest",
  "Brise - Guest",
  "Hendav - Guest",
];

interface OtherLoginOptionsProps {
  onClickLogin: (userId: string, type: "Guest" | "Host") => void;
}

export function OtherLoginOptions({ onClickLogin }: OtherLoginOptionsProps) {
  const [value, setValue] = useState<string>();

  return (
    <Accordion allowToggle width="500px">
      <AccordionItem borderTop={0} borderBottom={0}>
        {({ isExpanded }) => (
          <>
            <AccordionButton _hover={{ bgColor: "white" }} color="indigo.dark">
              <Flex flex="1" alignItems="center" justifyContent="center">
                <Button variant="link" mr={2}>
                  More login options
                </Button>
                {isExpanded ? <IoChevronUp /> : <IoChevronDown />}
              </Flex>
            </AccordionButton>
            <AccordionPanel py={4}>
              <Text fontSize="md" color="gray.600" mb={2}>
                Want to test out other accounts? Choose a user from the list!
              </Text>
              <Select
                onChange={(e) => setValue(e.target.value)}
                placeholder="Select a user"
                value={value}
              >
                {USERS.map((userId, index) => (
                  <option key={index + 3} value={`user-${index + 3}`}>
                    {userId}
                  </option>
                ))}
              </Select>
              <Button
                as={Link}
                to="/"
                onClick={(e) => {
                  if (value) {
                    return onClickLogin(
                      value,
                      value.includes("Guest") ? "Guest" : "Host",
                    );
                  }

                  e.preventDefault();
                }}
                isDisabled={!value}
                mt={4}
                w="100%"
              >
                Log in
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
