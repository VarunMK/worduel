import { Box } from "@chakra-ui/react"
import { useState } from "react";

type Props={
    verd:any,
    strval:String
}

export const Cell=({verd,strval}:Props)=>{
    const [color,setColor]=useState<String>("");
    if(verd==0){
        setColor('white')
    }
    else if(verd==1){
        setColor('yellow');
    }
    else{
        setColor('green');
    }
    return(
        <Box bg={String(color)} w="14" h="14" border="solid" display="flex" justifyContent="center" mx="0.5" text="lg">
            {strval}
        </Box>
    );
}