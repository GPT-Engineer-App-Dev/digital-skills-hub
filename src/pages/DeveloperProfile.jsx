import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, VStack, Tag, Input, useColorModeValue, HStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { client } from 'lib/crud';
import { FaEdit, FaTrash } from 'react-icons/fa';

const developers = [
  { id: '1', name: 'Alice Johnson', location: 'New York, USA', technologies: ['React', 'Node.js'], bio: 'Experienced Frontend Developer with a demonstrated history of working in the internet industry.' },
  { id: '2', name: 'Bob Smith', location: 'Berlin, Germany', technologies: ['Vue', 'Django'], bio: 'Full Stack Developer specializing in Python and JavaScript frameworks.' },
  { id: '3', name: 'Carlos Ruiz', location: 'Madrid, Spain', technologies: ['Angular', 'Java'], bio: 'Senior Java Developer with extensive experience in enterprise-level applications.' }
];

const DeveloperProfile = () => {
  const { developerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    client.getWithPrefix(`message:${developerId}`).then(data => {
      if (data) setMessages(data.map(item => item.value));
    });
  }, [developerId]);

  const developer = developers.find(dev => dev.id === developerId.toString());

  if (!developer) {
    console.error("Developer not found for ID:", developerId);
    return <Box p={5}><Text>No developer found.</Text></Box>;
  }

  const editMessage = (index) => {
    const newText = prompt('Edit your message:', messages[index].text);
    if (newText !== null && newText !== messages[index].text) {
      const updatedMessages = [...messages];
      updatedMessages[index].text = newText;
      setMessages(updatedMessages);
      const messageKey = `message:${developerId}:${messages[index].date}`;
      client.set(messageKey, { text: newText, date: messages[index].date });
    }
  };

  const deleteMessage = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
    const messageKey = `message:${developerId}:${messages[index].date}`;
    client.delete(messageKey);
  };

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
        <Input
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button colorScheme="blue" onClick={() => {
          const messageKey = `message:${developerId}:${new Date().toISOString()}`;
          client.set(messageKey, { text: newMessage, date: new Date().toISOString() })
            .then(success => {
              if (success) {
                setMessages([...messages, { text: newMessage, date: new Date().toISOString() }]);
                setNewMessage('');
              }
            });
        }}>Send Message</Button>
        {messages.map((msg, index) => (
          <Box key={index} p={2} shadow="md" borderWidth="1px" display="flex" justifyContent="space-between" alignItems="center">
            <Text>{msg.date}: {msg.text}</Text>
            <HStack>
              <Button size="sm" onClick={() => editMessage(index)}><FaEdit /></Button>
              <Button size="sm" colorScheme="red" onClick={() => deleteMessage(index)}><FaTrash /></Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default DeveloperProfile;