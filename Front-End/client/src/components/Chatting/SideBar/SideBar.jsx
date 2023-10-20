import { useRef, useState } from 'react';
import './SideBar.css';
import Buttons from './Buttons.jsx';
import MyChatList from './MyChatList.jsx';
import { useNavigate } from 'react-router-dom';

const SideBar = ({
    roomList,
    onClickRoom,
    onRoomListBtn,
    onNewChatBtn,
    addMyChat,
    username,
    message,
    currentRoom,
}) => {
    const [activeForm, setActiveForm] = useState(false);
    const inputRef = useRef();
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        setActiveForm(false);
        if (inputRef.current.value !== '') {
            onNewChatBtn(inputRef.current.value);
            navigate(`/chat/${inputRef.current.value}`);
        }
    };

    const onClose = (e) => {
        e.preventDefault();
        setActiveForm(false);
    };
    const setActiveStatus = () => {
        setActiveForm(!activeForm);
    };

    return (
        <div className='sideBar'>
            {activeForm ? (
                <form className='make-form'>
                    <input ref={inputRef} />
                    <div className='form-buttons'>
                        <button className='button make' onClick={onSubmit}>
                            <h3>Open</h3>
                        </button>
                        <button className='button close' onClick={onClose}>
                            <h3>Close</h3>
                        </button>
                    </div>
                </form>
            ) : (
                <Buttons
                  onRoomListBtn={onRoomListBtn}
                  setActiveStatus={setActiveStatus}
                  onClickRoom={onClickRoom}
                  username={username}
                />
            )}
            <MyChatList
              roomList={roomList}
              onClickRoom={onClickRoom}
              addMyChat={addMyChat}
              username={username}
              currentRoom={currentRoom}
              message={message}
            />
        </div>
    );
};

export default SideBar;