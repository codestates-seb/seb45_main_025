import { useState, useEffect } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';
import post5 from '../../common/image/post5.jpg';

import {
    Container,
    TitleInput,
    BackgroundImageContainer,
    EditorContainer,
    EditorWrapper,
    PublishButton,
    PublishButtonContainer,
    InputContainer
} from './WritePost.styled';

function WritePost() {
    const URI = process.env.REACT_APP_API_URL;
    const [title, setTitle] = useState('');
    const [editor, setEditor] = useState(null);
    const [selectedImage] = useState(null);
    const navigate = useNavigate();

    const handleContentChange = () => {
        if (editor) {
            const content = editor.getHTML();
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);

            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            let access_token = getAccessToken();

            axios.post(`${URI}/board`, formData, {
                headers: {
                    Authorization: access_token,
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    console.log('백엔드 응답:', response);
                    navigate('/CommunityList');
                })
                .catch((error) => {
                    console.error('에러 발생:', error);
                });
        }
    };

    const handlePublish = () => {
        handleContentChange();
    };



    useEffect(() => {
        const editorInstance = new Editor({
            el: document.querySelector('#editor'),
            height: '770px',
            initialEditType: 'wysiwyg',
            maxwidth: '800px',
            overflow: 'ellipsis',
            events: {
                change: () => handleContentChange(),
            },
        });

        setEditor(editorInstance);

        return () => {
            editorInstance.remove(); // 컴포넌트가 언마운트될 때 에디터 정리
        };
    }, []);

    return (
        <>
            <BackgroundImageContainer backgroundImage={`url(${post5})`}>
                POST
            </BackgroundImageContainer>
            <Container>
                <InputContainer>
                    <TitleInput
                        type="text"
                        placeholder=" Title, 35 characters or less"
                        value={title}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue.length <= 35) {
                                setTitle(inputValue);
                            }
                        }}
                    />
                </InputContainer>
                <EditorContainer>
                    <EditorWrapper>
                        <div id="editor" style={{ overflowY: 'auto' }} />

                    </EditorWrapper>
                </EditorContainer>





                <PublishButtonContainer>
                    <PublishButton onClick={handlePublish}>Post</PublishButton>
                </PublishButtonContainer>
            </Container>
        </>
    );
}

export default WritePost;
