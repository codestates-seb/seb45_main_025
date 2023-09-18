import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import ImageResize from './imageResize/ImageResize';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios'
import getAccessToken from '../../common/utils/getToken';
// Quill.register('modules/imageResize');
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
        // imageResize: {
        //     parchment: Quill.import('parchment')
        //     // See optional "config" below
        // },
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
    const URI = process.env.REACT_APP_API_URL;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleContentChange = (newContent) => {
        setContent(newContent);
    };
    const navigate = useNavigate();

    const handlePublish = async () => {
        let access_token = getAccessToken();
        console.log(access_token)
        try {
            const response = await axios.post(
                `${URI}/board?title=${title}&content=${content}`,
                // {
                //     "title": title,
                //     "content": content,
                //     "image": null
                // },
                null,
                {
                    headers: { Authorization: access_token },

                }
            );

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
                    <Editor
                        placeholder="Enter content."
                        value={content}
                        onChange={handleContentChange}
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
