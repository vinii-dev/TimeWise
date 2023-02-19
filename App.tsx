import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';

type status = 'paused' | 'playing' | 'stopped';

export default function App() {
  const [status, setStatus] = useState<status>('stopped');
  const [count, setCount] = useState<number>(0);

  const getTime = () => {
    const miliseconds = count * 1000;
    // const hours = (Math.floor(count / 3600000)).toString().padStart(2, '0');
    // const minutes = (Math.floor((count % 3600000) / 60000)).toString().padStart(2, '0');
    // const seconds = (Math.floor((count % 60000) / 1000)).toString().padStart(2, '0');

    // return `${hours}:${minutes}:${seconds}`;

    const time = new Date(miliseconds);
    const regex = /\d{2}:\d{2}:\d{2}/; // Get hh:mm:ss from string

    return time.toUTCString().match(regex)?.toString();
  }

  const toggleTimer = () => {
    let newStatus: status;

    switch (status) {
      case 'playing':
        newStatus = 'paused';
        break;
      case 'stopped':
        newStatus = 'playing'
        break;
      case 'paused':
        newStatus = 'playing';
        break
    }

    setStatus(newStatus);
  }

  const stopTimer = () => {
    setCount(0);
    setStatus('stopped');
  }

  useEffect(() => {
    let intervalId: NodeJS.Timer;

    if(status === 'playing') {
      intervalId = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [status]);

  return (
    <View style={styles.container}>
      <Text>{getTime()}</Text>
      <HStack>
        {status !== 'stopped' && (
            <Button onPress={stopTimer}>
              <Ionicons size={16} name='stop' color="white" />
            </Button>
          )
        }
        <Button onPress={toggleTimer}>
          <Ionicons size={16} name={status === 'playing' ? "pause" : "play"} color="white" />
        </Button>
      </HStack>
      <StatusBar style="auto" />
    </View>
  );
}

const HStack = styled.View`
  flex-direction: row;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Button = styled.TouchableOpacity`
  margin: 0px 5px;
  justify-content: center;
  align-items: center;
  background-color: #000;
  border-radius: 100000px;
  padding: 8px;
  width: 50px;
  height: 50px;
`;
