import { Box, Flex, Text, Input, Button, VStack, HStack, Tag, useMediaQuery, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

const developers = [
  { id: 1, name: 'Alice Johnson', location: 'New York, USA', technologies: ['React', 'Node.js'] },
  { id: 2, name: 'Bob Smith', location: 'Berlin, Germany', technologies: ['Vue', 'Django'] },
  { id: 3, name: 'Carlos Ruiz', location: 'Madrid, Spain', technologies: ['Angular', 'Java'] }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const filteredDevelopers = developers.filter(dev =>
    dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dev.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dev.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box p={5}>
      <VStack spacing={5}>
        <Text fontSize="2xl" fontWeight="bold">Welcome to Particles Marketplace</Text>
        <Text>Discover top software talent specialized in web technologies.</Text>
        <Input
          placeholder="Search by name, location, or technology..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredDevelopers.map(dev => (
          <Flex key={dev.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" flexDirection={isLargerThan768 ? 'row' : 'column'} align="center" justify="space-between">
            <VStack align="left">
              <Text fontSize="lg" fontWeight="bold">{dev.name}</Text>
              <Text>{dev.location}</Text>
            </VStack>
            <HStack spacing={2}>
              {dev.technologies.map(tech => {
                const tagColor = useColorModeValue({
                  'React': 'blue',
                  'Node.js': 'green',
                  'Vue': 'teal',
                  'Django': 'orange',
                  'Angular': 'red',
                  'Java': 'yellow'
                }[tech], 'gray');
                return <Tag key={tech} colorScheme={tagColor}>{tech}</Tag>;
              })}
            </HStack>
            <Button colorScheme="blue">Message</Button>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;