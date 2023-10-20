import { memo } from 'react';
import './Content.css';
import Header from './Header.jsx';
import RoomList from './RoomList/RoomList.jsx';
import ChatRoom from './ChatRoom/ChatRoom.jsx';

// eslint-disable-next-line react/display-name
const Content = memo(
    ({
        currentRoom,
        roomList,
        onClickRoom,
        user,
        sendMessage,
        users,
        message,
        myChatList
    }) => {
        return (
            <div className='content'>
                <Header currentRoom={currentRoom} user={user} />
                <div className='chatContainer'>
                    {currentRoom === 'list' ? (
                        <RoomList roomList={roomList} onClickRoom={onClickRoom} />
                    ) : (
                        <ChatRoom
                          message={message}
                          user={user}
                          users={users}
                          sendMessage={sendMessage}
                          currentRoom={currentRoom}
                          myChatList={myChatList}
                        />
                    )}
                </div>
            </div>
        );
    }
);

export default Content;