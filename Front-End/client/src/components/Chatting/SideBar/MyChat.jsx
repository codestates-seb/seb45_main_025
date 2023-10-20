import { useNavigate } from 'react-router-dom';

const MyChat = ({ title, onClickRoom, hasNew }) => {
    const navigate = useNavigate();
    const roomId = '1';
    const onRoom = () => {
        onClickRoom(title);
        navigate(`/chat/${roomId}`);
    };

    return (
        <button onClick={onRoom} className='mychat'>
            <span className='chat_title'>{title}</span>
            <span className={`isNew ${hasNew}`}>!</span>
        </button>
    );
};

export default MyChat;