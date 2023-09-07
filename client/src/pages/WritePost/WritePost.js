import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import axios from 'axios'

const Editor = ({ placeholder, value, onChange }) => {
    const modules = {
        toolbar: {
            container: [
                ['link', 'image', 'video'],
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
            ],
        },
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'align',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'background',
        'color',
        'link',
        'image',
        'video',
        'width',
    ];


    return (
        <ReactQuill
            placeholder={placeholder}
            value={value || ''}
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={onChange}
        />
    );
};

Editor.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

function WritePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleContentChange = (newContent) => {
        setContent(newContent);
    };
    const handlePublish = async () => {
        try {
            // 데이터
            const response = await axios.post('/백엔드 엔드포인트', {
                title: title,
                content: content,
            });


            console.log('백엔드 응답:', response.data);
        } catch (error) {
            console.error('에러 발생:', error);

        }
    };
    return (
        <div style={{ height: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div
                style={{
                    height: '2px',
                    width: '40px',
                    backgroundColor: '#FFA500',
                    zIndex: 2,
                    marginTop: '20vh'
                }}
            ></div>

            <div
                style={{
                    height: '70px',
                    width: '300px',
                    backgroundColor: 'white',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    paddingBottom: '80px',
                    paddingTop: '35px',
                    fontSize: '2.5rem'
                }}
            >
                Community
            </div>

            <div
                style={{
                    height: '2px',
                    width: '1000px',
                    backgroundColor: '#FFA500',
                    zIndex: 2,
                }}
            ></div>
            <div
                style={{
                    width: '1000px',
                    height: '50px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    border: '1px solid gray',
                    display: 'flex',
                    marginBottom: '-2px'
                }}
            >
                <input
                    type="text"
                    placeholder="제목을 입력하세요."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '900px', height: '45px', padding: '5px', fontSize: '1.5rem' }}
                />
            </div>
            <div
                style={{
                    width: '1000px',
                    flex: '1',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid gray',
                    overflow: 'auto',
                    marginBottom: '20px'
                }}
            >
                <div style={{ marginBottom: '10px', width: '900px', height: '100%', marginTop: '3px' }}>
                    <Editor
                        placeholder="내용을 입력하세요."
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>

            </div>
            <div style={{
                width: '1000px',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <button
                    style={{
                        border: '1px solid gray',
                        padding: '5px 20px 5px 20px',
                    }}
                    onClick={handlePublish}
                >
                    등록
                </button>
            </div>
        </div >
    );
}

export default WritePost;
