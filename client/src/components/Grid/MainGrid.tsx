import { Text,GridItem, Grid, SimpleGrid, Box } from '@chakra-ui/react';
import {CompleteRow} from './CompleteRow'

type Props = {
    data:any,
    resp:Array<String>;
};

export const MainGrid = ({data,resp}:Props) => {
    return (
        <>
        {data.map((r:Array<Number>,index:number)=>{
            <CompleteRow crosscheck={r} value={resp[index]}/>
        })}
        </>
    );
};
