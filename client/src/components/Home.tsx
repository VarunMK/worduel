import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { evaluate } from '../utils/eval';
import { makeToast } from '../utils/handleMsgs';
import { useForm } from 'react-hook-form';

const socket = io('http://localhost:8080');

const Home = () => {
    const [room, setRoom] = useState<String>('');
    const [conn, setConn] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [word, setWord] = useState<String>('');
    const [buttonIsLoading, setButtonLoading] = useState<boolean>(false);
    const { register, handleSubmit, control } = useForm();
    var tries = 0;
    const onSubmit = (formData: any) => {
        setButtonLoading(true);
        if (formData.roomId.length < 5) {
            makeToast('Invalid Room Code','Make sure your room code is 5 characters long.','warning');
            setButtonLoading(false);
        } else {
            setRoom(formData.roomId);
            socket.emit('addtoroom', formData.roomId);
        }
    };
    useEffect(() => {
        socket.on('connectionsuccessful', (message, no_of_users, resp) => {
            setButtonLoading(false);
            setConn(true);
            if (no_of_users == 1) {
                makeToast(message,'Invite others to the room!','success');
            } else {
                makeToast(message,'Both the players have joined the lobby!','success');
                setDisabled(false);
            }
            setWord(resp);
        });
        socket.on('secondplrjoined',(msg)=>{
            if(msg){
                setDisabled(false);
                makeToast('New Player Joined!','Both the players have joined the lobby!','success');
            }
        })
        socket.on('senderror', (message, code) => {
            makeToast(message,'Sadly the room is full :(','error');
            setButtonLoading(false);
        });
        socket.on('disconnect', () => {
            console.log('Socket disconnected Sadge');
        });
        socket.on('oppresp',(message)=>{
            makeToast(message,'','success');
        });
    }, []);
    const sendReq = (formData: any) => {
        var data = evaluate(formData.gameresp, word);
        tries += 1;
        socket.emit('sendresp',room,data);
        if (tries == 5 && data==[2,2,2,2,2]) {
            makeToast('Congrats!','The word was: '+word,'success');
            setDisabled(true);
        }
        else if(tries==5){
            makeToast("Sorry you didn't guess the word :(","The word was: "+word,"warning");
            setDisabled(true);
        }
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
                                htmlFor="roomId"
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
                        <Text fontWeight="bold" fontSize="md">
                            Your answer:
                        </Text>
                        <Input
                            htmlFor="gameresp"
                            type="text"
                            {...register('gameresp')}
                            flex={{ lg: '1', base: 'none' }}
                        />
                        <Button
                            marginTop="4"
                            size="lg"
                            textColor="whitesmoke"
                            _hover={{textColor: 'black' }}
                            bgColor="#e94560"
                            type="submit"
                            isLoading={buttonIsLoading}
                            isDisabled={disabled}
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
