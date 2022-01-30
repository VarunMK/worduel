import { Box, Flex } from '@chakra-ui/react';
import {Cell} from './Cell'

type Props={
    crosscheck:Array<Number>,
    value:String
}

export const CompleteRow=({crosscheck,value}:Props)=>{
    return(
        <Flex mb="1" justifyContent="center">
            {crosscheck.map((val,index)=>{
                <Cell verd={val} strval={value[index]}/>               
            })}
        </Flex>
    );
}