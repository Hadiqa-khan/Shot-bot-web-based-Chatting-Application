// Author Name : Hadiqa Khan
// Date of generation : 9 May 2022
// Date of last revision : 12-May-2022
// Version number: 1
import { Avatar, Tooltip } from '@chakra-ui/react';
import React from 'react';
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
const ScrollableChat = ({messages}) => { 
     // purpose: The purpose is to create a scrollable chat . checl the margins to align the chats of diffrent users
     // and check the last message in order to display properly
    const {user} = ChatState();
  return (
    <ScrollableFeed>
        {messages && messages.map((m,i)=>(
            <div style={{display:"flex"}} key={m._id}>
                {(isSameSender(messages,m,i,user._id)
                || isLastMessage(messages,i,user._id))
                && (
                    <Tooltip
                    label={m.sender.name}
                    placement="bottom-start"
                    hasArrow>
                        <Avatar
                        mt="7px"
                        mr={1}
                        size="sm"
                        cursor="pointer"
                        name={m.sender.name}
                        src={m.sender.pic}
                        />
                    </Tooltip>
                )}
                <span style={{
                    backgroundColor: `${m.sender._id === user._id ? "#BEE3F8":"#B9F5D0"
                }`,
                borderRadius:"12px",
                padding:"5px 15px",
                maxWidth:"75%",
                marginLeft: isSameSenderMargin(messages,m,i,user._id),
                marginTop: isSameUser(messages,m,i,user._id) ? 3: 10,

                }}>
                    {m.content}

                </span>
                
            </div>

        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat