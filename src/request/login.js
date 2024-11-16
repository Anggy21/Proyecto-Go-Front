export const authenticationRequest = async (user,url)=>{

    return await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
            'Accept':"application/json",
            
        },
        body:JSON.stringify(user)
    });

};

export default authenticationRequest