import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Controller, useForm } from 'react-hook-form';
import { send } from 'process';

const socket = io('http://localhost:8080');

const Home = () => {
    const toast = useToast();
    const [room, setRoom] = useState<String>('');
    const [conn, setConn] = useState<boolean>(false);
    const [disabled,setDisabled]=useState<boolean>(true);
    const [resp,setResp]=useState<String>("");
    const [buttonIsLoading, setButtonLoading] = useState<boolean>(false);
    const { register, handleSubmit, control } = useForm();
    const onSubmit = (formData: any) => {
        setButtonLoading(true);
        if (formData.roomId.length < 5) {
            toast({
                title: 'Invalid Room Code',
                description: 'Make sure your room code is 5 characters long.',
                status: 'warning',
                duration: 6000,
                isClosable: true,
            });
            setButtonLoading(false);
        } else {
            setRoom(formData.roomId);
            socket.emit('addtoroom', formData.roomId);
        }
    };
    useEffect(() => {
        socket.on('connectionsuccessful', (message, no_of_users) => {
            setButtonLoading(false);
            setConn(true);
            if (no_of_users == 1) {
                toast({
                    title: message,
                    description: 'Invite others to the room!',
                    status: 'success',
                    duration: 6000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: message,
                    description: 'Both the players have joined the lobby!',
                    status: 'success',
                    duration: 6000,
                    isClosable: true,
                });
            }
        });
        socket.on('senderror', (message, code) => {
            toast({
                title: message,
                description: 'Sadly the room is full :(',
                status: 'error',
                duration: 6000,
                isClosable: true,
            });
            setButtonLoading(false);
        });
        socket.on('disconnect', () => {
            console.log('Socket disconnected Sadge');
        });
        socket.on('gameresp',(message)=>{
            console.log(message);
        })
    }, []);
    const sendReq = (formData:any) => {
        console.log(formData.gameresp);
        socket.emit('sendresp',room,formData.gameresp);
    };
    return (
        <>
            <Box backgroundColor="gray.100" py="3">
                <Heading textAlign="center">Worduel</Heading>
            </Box>
            <Box
                borderRadius="20"
                my="250"
                mx="auto"
                py="22"
                border="1px solid rgba(0, 0, 0, 0.05);"
                boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
                px="45"
                backgroundColor="#FAFAFA"
                width="35%"
                color="black.200"
                textAlign="center"
            >
                {!conn ? (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ textAlign: 'center', marginTop: '18px' }}
                    >
                        <FormControl id="roomId">
                            <FormLabel fontWeight="bold" fontSize="md">
                                Join a room / Create a room:
                            </FormLabel>
                            <Input
                                type="text"
                                {...register('roomId')}
                                flex={{ lg: '1', base: 'none' }}
                            />
                        </FormControl>
                        <Button
                            marginTop="4"
                            size="lg"
                            textColor="whitesmoke"
                            _hover={{ bg: '#b0152f', textColor: 'whitesmoke' }}
                            bgColor="#e94560"
                            type="submit"
                            isLoading={buttonIsLoading}
                            loadingText="Submitting"
                        >
                            Submit
                        </Button>
                    </form>
                ) : (
                    <form
                        onSubmit={handleSubmit(sendReq)}
                        style={{ textAlign: 'center', marginTop: '18px' }}
                    >
                        <FormControl id="gameresp">
                            <FormLabel fontWeight="bold" fontSize="md">
                                Your answer:
                            </FormLabel>
                            <Input
                                type="text"
                                {...register('gameresp')}
                                flex={{ lg: '1', base: 'none' }}
                            />
                        </FormControl>
                        <Button
                            marginTop="4"
                            size="lg"
                            textColor="whitesmoke"
                            _hover={{ bg: '#b0152f', textColor: 'whitesmoke' }}
                            bgColor="#e94560"
                            type="submit"
                            isLoading={buttonIsLoading}
                            loadingText="Submitting"
                        >
                            Send
                        </Button>
                    </form>
                )}
            </Box>
        </>
    );
};
export default Home;
