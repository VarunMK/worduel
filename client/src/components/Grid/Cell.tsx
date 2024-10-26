import { Box,Text } from "@chakra-ui/react"
import { useState } from "react";

type Props={
    verd:any,
    strval:String
}

export const Cell=({verd,strval}:Props)=>{
    var color='';
    if(verd==0){
        color='#787c7e';
    }
    else if(verd==1){
        color='#FCD12A';
    }
    else if(verd==2){
        color='#6aaa64';
    }
    else{
        color='#FAFAFA';
    }
    return(
        <Box bg={String(color)} w="14" h="14" border="solid 2px" display="inline-flex" borderRadius="4" justifyContent="center" mx="0.5" fontSize="2rem" fontWeight="bold">
            <Text color="whitesmoke" mt="1">{strval}</Text>
        </Box>
    );
}