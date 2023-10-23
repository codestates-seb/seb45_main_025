
const Room = ({ room, onClickRoom }) => {

    const onRoom = () => {
        onClickRoom(room);
    };

    return (
          <button className="room" onClick={onRoom}>
              <div className="title">{room}</div>
          </button>
    );
};
export default Room;