import { Text, GridItem, Grid, SimpleGrid, Box } from '@chakra-ui/react';
import { CompleteRow } from './CompleteRow';

type Props = {
    data: any;
    resp: Array<String>;
};

export const MainGrid = ({ data, resp }: Props) => {
    var rem = 0;
    rem = 6 - data.length;
    var dummy = Array(rem).fill(0);
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
