import { Box, Flex } from '@chakra-ui/react';
import { Cell } from './Cell';

type Props = {
    crosscheck: Array<Number>;
    value: String;
};

export const CompleteRow = ({ crosscheck, value }: Props) => {
    if (crosscheck.length == 0 && value == '') {
        return (
            <Flex mb="1" justifyContent="center">
                <Cell verd={4} strval={' '} />
                <Cell verd={4} strval={' '} />
                <Cell verd={4} strval={' '} />
                <Cell verd={4} strval={' '} />
                <Cell verd={4} strval={' '} />
            </Flex>
        );
    }
    return (
        <Flex mb="1" justifyContent="center">
            {crosscheck.map((val, index) => {
                return <Cell key={index} verd={val} strval={value[index].toUpperCase()} />;
            })}
        </Flex>
    );
};
