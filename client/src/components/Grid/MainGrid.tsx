import { GridItem, Grid, SimpleGrid, Box } from '@chakra-ui/react';
import { Cell } from './Cell';

type Props = {
    state: Number;
};

export const MainGrid = (data: any) => {
    return (
        <Grid templateColumns="repeat(5, 1fr)" gap={4} columnGap={1}>
        </Grid>
    );
};
