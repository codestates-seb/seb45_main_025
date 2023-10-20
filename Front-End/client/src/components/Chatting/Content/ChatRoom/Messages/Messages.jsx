import Message from "./Message.jsx";

const Messages = ({ messages, user }) => {
    return (
        <ul className="message">
            {messages && messages.map((msg) => <Message user={user} message={msg} key={msg} />)}
        </ul>
    );
};

export default Messages;