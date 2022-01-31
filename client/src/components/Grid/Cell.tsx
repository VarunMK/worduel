import { Box } from "@chakra-ui/react"
import { useState } from "react";

type Props={
    verd:any,
    strval:String
}

export const Cell=({verd,strval}:Props)=>{
    var color='';
    if(verd==0){
        color='white';
    }
    else if(verd==1){
        color='yellow';
    }
    else if(verd==2){
        color='green';
    }
    else{
        color='white';
    }
    return(
        <Box bg={String(color)} w="14" h="14" border="solid" display="inline-flex" justifyContent="center" mx="0.5" fontSize="2rem" fontWeight="bold">
            {strval}
        </Box>
    );
}