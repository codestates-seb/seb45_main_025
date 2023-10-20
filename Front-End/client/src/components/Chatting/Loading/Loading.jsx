import './Loading.css';

const Loading = () => {
    return (
    <div className='load'>
        <div className='loader'>Loading...</div>
        <span className='loading_message'>Server Loading...</span>
    </div>
    );
};

export default Loading;