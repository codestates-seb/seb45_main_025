import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios'
import getAccessToken from '../../common/utils/getToken';

import {
    Container,
    Line,
    Title,
    InputContainer,
    TitleInput,
    EditorContainer,
    EditorWrapper,
    PublishButtonContainer,
    PublishButton,
} from './WritePost.styled';

const Editor = ({ placeholder, value, onChange }) => {
    const modules = {

        toolbar: {
            container: [
                ['link', 'video'],
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
    const URI = process.env.REACT_APP_API_URL;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleContentChange = (newContent) => {
        setContent(newContent);
    };
    const navigate = useNavigate();


    const quillRef = useRef(); // Quill 에디터에 접근하기 위한 ref

    const handlePublish = async () => {
        let access_token = getAccessToken();
        console.log(access_token)
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);


            const response = await axios.post(`${URI}/board`, formData, {
                headers: {
                    Authorization: access_token,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log('백엔드 응답:', response.data);
            navigate('/CommunityList');
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };


    return (
        <Container>
            <Line />
            <Title>Community</Title>
            <InputContainer>
                <TitleInput
                    type="text"
                    placeholder="Enter title."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </InputContainer>
            <EditorContainer>
                <EditorWrapper>
                    <ReactQuill
                        ref={quillRef}
                        placeholder="Enter content."
                        value={content}
                        onChange={handleContentChange}
                        modules={{
                            toolbar: {
                                container: [
                                    ['link'],
                                    [{ header: [1, 2, 3, false] }],

                                ],

                            },
                        }
                        }
                    />
                </EditorWrapper>
            </EditorContainer>
            <PublishButtonContainer>
                <PublishButton
                    onClick={handlePublish}
                >
                    Post
                </PublishButton>
            </PublishButtonContainer>
        </Container>
    );
}

export default WritePost;
