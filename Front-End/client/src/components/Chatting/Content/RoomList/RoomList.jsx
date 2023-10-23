import Room from './Room.jsx';

const RoomList = ({ roomList, onClickRoom }) => {
    return (
        <div>
            <ul className='rooms'>
                {roomList.map((room) => {
                    <Room room={room.title} onClickRoom={onClickRoom} key={room.title} />
                })}
            </ul>
        </div>
    );
};

export default RoomList;