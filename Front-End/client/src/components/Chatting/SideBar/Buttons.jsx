import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faEdit } from '@fortawesome/free-regular-svg-icons';

const Buttons = ({ onRoomListBtn, setActiveStatus }) => {
    return (
        <div className='buttons'>
            <button className='btn_roomlist' onClick={onRoomListBtn}>
                <FontAwesomeIcon icon={faListAlt} size='lg' />
            </button>
            <button className='btn_newchat' onClick={setActiveStatus}>
                <FontAwesomeIcon icon={faEdit} size='lg' />
            </button>
        </div>
    );
};

export default Buttons;