// Author Name : Hadiqa khan
// Date of generation : 29 April 2022
// Date of last revision : 19-May-2022
// Version number: 5
export const getSender =(loggedUser,users) => {
    // // purpose: The purpose of this function is to return the logged in users id and names

    return users[0]._id===loggedUser._id ? users[1].name:users[0].name;
};
export const getSenderFull =(loggedUser,users) => {
            // purpose: The purpose of this function is to return the logged in user id and their full information
    return users[0]._id===loggedUser._id ? users[1]:users[0];
};

export const isSameSender = (messages,m,i,userId)=>{
    // purpose: The purpose of this function is to check that send of the message is same as the logged in user or not 
    return(
        i < messages.length - 1 &&
        (messages [i+1].sender._id !==m.sender._id ||
            messages[i+1].sender._id === undefined) &&
            messages[i].sender._id !== userId
    );//m current msg i index of current msg
};


export const isLastMessage = (messages,i, userId) => {
    return( /// purpose: The purpose is to check the last message is not by the same sender
        i === messages.length -1 && 
        messages[messages.length-1].sender._id !== userId &&
        messages[messages.length-1].sender._id
    )
};

export const isSameSenderMargin = (messages,m,i,userId)=>{
    if(  // purpose: The purpose of this function is to draw the margains 
        i < messages.length -1 &&
        messages[i+1].sender._id === m.sender._id &&
        messages[i].sender._id !==userId
    )
    return 33;
    else if (
        (i < messages.length -1 &&
            messages[i+1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
            (i === messages.length -1 && messages[i].sender._id !== userId)
    )
    return 0;
    else return "auto";
}
export const isSameUser = (messages,m,i) =>{
    return i > 0 && messages[i-1].sender._id === m.sender._id //sender is of prev euqals to current
}