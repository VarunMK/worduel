import { createStandaloneToast } from "@chakra-ui/react";

const toast=createStandaloneToast();
export const makeToast=(title:String,desc:String,status:any)=>{
    return(
        toast({
            title: title,
            description: desc,
            status:status,
            duration: 6000,
            isClosable: true,
        })
    )
}