import { Box, Flex, Text, Button, VStack, Tag, useColorModeValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const developers = [
  { id: '1', name: 'Alice Johnson', location: 'New York, USA', technologies: ['React', 'Node.js'], bio: 'Experienced Frontend Developer with a demonstrated history of working in the internet industry.' },
  { id: '2', name: 'Bob Smith', location: 'Berlin, Germany', technologies: ['Vue', 'Django'], bio: 'Full Stack Developer specializing in Python and JavaScript frameworks.' },
  { id: '3', name: 'Carlos Ruiz', location: 'Madrid, Spain', technologies: ['Angular', 'Java'], bio: 'Senior Java Developer with extensive experience in enterprise-level applications.' }
];

const DeveloperProfile = () => {
  const { developerId } = useParams();
  const developer = developers.find(dev => dev.id === developerId);

  if (!developer) {
    return <Box p={5}><Text>No developer found.</Text></Box>;
  }

  return (
    <Box p={5}>
      <VStack spacing={5} align="left">
        <Text fontSize="2xl" fontWeight="bold">{developer.name}</Text>
        <Text>{developer.location}</Text>
        <Text>{developer.bio}</Text>
        <Flex wrap="wrap">
          {developer.technologies.map(tech => (
            <Tag key={tech} m={1} colorScheme={useColorModeValue({
              'React': 'blue',
              'Node.js': 'green',
              'Vue': 'teal',
              'Django': 'orange',
              'Angular': 'red',
              'Java': 'yellow'
            }[tech], 'gray')}>{tech}</Tag>
          ))}
        </Flex>
        <Button colorScheme="blue">Message {developer.name}</Button>
      </VStack>
    </Box>
  );
};

export default DeveloperProfile;