import { useState, useRef } from 'react';
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

    const [imageURL, setImageURL] = useState(''); // 이미지 URL을 관리하기 위한 상태
    const quillRef = useRef(); // Quill 에디터에 접근하기 위한 ref

    const handlePublish = async () => {
        let access_token = getAccessToken();
        console.log(access_token)
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            if (imageURL) {
                formData.append("image", imageURL); // 이미지 URL을 폼 데이터에 추가
            }

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
    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                try {
                    const formData = new FormData();
                    formData.append('image', file);
                    const response = await axios.post(`${URI}/upload-image`, formData);
                    const imageUrl = response.data.url;

                    // 이미지 URL을 에디터에 삽입
                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', imageUrl);

                    setImageURL(imageUrl); // 이미지 URL 상태 업데이트
                } catch (error) {
                    console.error('이미지 업로드 에러:', error);
                }
            }
        };
        input.click();
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
                                    ['link', 'image', 'video'],
                                    [{ header: [1, 2, 3, false] }],
                                    // ...
                                ],
                                handlers: {
                                    image: handleImageUpload, // 이미지 업로드 핸들러 연결
                                },
                            },
                        }}
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
