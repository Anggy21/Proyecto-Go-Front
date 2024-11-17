export const authenticationRequest = async (body,url)=>{

    return await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
            'Accept':"application/json",
            
        },
        body:JSON.stringify(body)
    });

};

export default authenticationRequest