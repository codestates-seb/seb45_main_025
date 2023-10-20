import MyChat from './MyChat.jsx';

const MyChatList = ({ 
    roomList,
    onClickRoom,
    addMyChat,
    username,
}) => {
    return (
        <ul className='myChatRoomList'>
            {roomList &&
              roomList.map((room) => (
                <MyChat
                  title={room.title}
                  onClickRoom={onClickRoom}
                  addMyChat={addMyChat}
                  username={username}
                  hasNew={room.hasNew}
                  key={room.roomID}
                />
              ))}
        </ul>
    )
};

export default MyChatList;