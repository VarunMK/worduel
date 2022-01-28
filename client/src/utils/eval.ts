
export const evaluate=(resp:String,word:String)=>{
    var arr=[0,0,0,0,0];
    for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
            if(resp[i]==word[j]){
                arr[i]=1;
            }
        }    
    }
    for(let i=0;i<5;i++){
        if(resp[i]==word[i]){
            arr[i]=2;
        }
    }
    return arr;
}

