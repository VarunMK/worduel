import { Text, GridItem, Grid, SimpleGrid, Box } from '@chakra-ui/react';
import { CompleteRow } from './CompleteRow';

type Props = {
    data: any;
    resp: Array<String>;
    s:string,
};

export const MainGrid = ({ data, resp,s }: Props) => {
    var rem = 0;
    rem = 6 - data.length;
    var dummy = Array(rem).fill(0);
    if(s=="2nd"){
        for(let i=0;i<resp.length;i++){
            resp[i]="     ";
        }
    }
    return (
        <>
            {data.length > 0 ? (
                <>
                    {data.map((r: Array<Number>, index: number) => {
                        return (
                            <CompleteRow
                                key={index}
                                crosscheck={r}
                                value={resp[index]}
                            />
                        );
                    })}
                    {dummy.map((_, index) => {
                        return (
                            <CompleteRow
                                key={index}
                                crosscheck={[]}
                                value={''}
                            />
                        );
                    })}
                </>
            ) : (
                <>
                    {dummy.map((_, index) => {
                        return (
                            <CompleteRow
                                key={index}
                                crosscheck={[]}
                                value={''}
                            />
                        );
                    })}
                </>
            )}
        </>
    );
};
