// import { useState, useEffect } from 'react';
// import Editor from '@toast-ui/editor';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import { useParams,useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import getAccessToken from '../../common/utils/getToken';
// import post5 from '../../common/image/post5.jpg';
// import {
//     Container,
//     TitleInput,
//     BackgroundImageContainer,
//     EditorContainer,
//     EditorWrapper,
//     PublishButton,
//     PublishButtonContainer,
//     InputContainer
// } from './EditPage.styled';

// function EditPage() {
//     const URI = process.env.REACT_APP_API_URL;
//     const [title, setTitle] = useState('');
//     const [editor, setEditor] = useState(null);
//     const [selectedImage] = useState(null);
//     const navigate = useNavigate();
//     const { boardId } = useParams();

//     const handleContentChange = () => {
//         if (editor) {
//             const content = editor.getHTML();
//             const formData = new FormData();
//             formData.append('title', title);
//             formData.append('content', content);
    
//             if (selectedImage) {
//                 formData.append('image', selectedImage);
//             }
    
//             let access_token = getAccessToken();
    
//             axios.patch(`${URI}/board/${boardId}/update`, formData, {
//                 headers: {
//                     Authorization: access_token,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             })
//                 .then((response) => {
//                     console.log('백엔드 응답:', response);
//                     // 수정 완료 후 CommunityList 페이지로 이동
//                     navigate('/CommunityList');
//                 })
//                 .catch((error) => {
//                     console.error('에러 발생:', error);
//                 });
//         }
//     };

    

//     useEffect(() => {
//         // 페이지가 로드될 때 글 데이터를 불러옴
//         const fetchData = async () => {
//             let access_token = getAccessToken();
//             try {
//                 const response = await axios.get(`${URI}/board/${boardId}`,
//                 {
//                     headers: {
//                         Authorization: access_token,
                        
//                     },
//                  }
//                 );
//                 setTitle(response.data.title);
//                 const content = response.data.content;

//                 const editorInstance = new Editor({
//                     el: document.querySelector('#editor'),
//                     height: '770px',
//                     initialEditType: 'wysiwyg',
//                     maxwidth: '800px',
//                     overflow: 'ellipsis',
//                     events: {
//                         change: () => handleContentChange(),
//                     },
//                 });
//                 editorInstance.setMarkdown(content);
//                 setEditor(editorInstance);

                
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchData(); // 데이터 불러오기
//         // handleContentChange, handlePublish 함수, 이미지 업로드 관련 코드 등 다른 부분은 그대로 유지
//     }, []);

//     const editHandler = async () => {
//         let access_token = getAccessToken();
    
//         try {
//             const formData = new FormData();
//             const content = response.data.content;
//             formData.append("title", title);
//             formData.append("content", content);
            
//             const response = await axios.patch(`${URI}/board/${boardId}/update`, formData, {
//                 headers: {
//                     Authorization: access_token,
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
    
//             // 응답 데이터 처리
//             console.log("백엔드 응답:", response.data);
    
//             // 수정 완료 후 CommunityList 페이지로 이동
//             navigate('/CommunityList');
//         } catch (error) {
//             // 에러 처리
//             console.error("에러 발생:", error);
//             navigate('/CommunityList')
//         }
//     };
//     return (
//         <>
//             <BackgroundImageContainer backgroundImage={`url(${post5})`}>
//                 POST
//             </BackgroundImageContainer>
//             <Container>
//                 <InputContainer>
//                     <TitleInput
//                         type="text"
//                         placeholder=" Title, 35 characters or less"
//                         value={title}
//                         onChange={(e) => {
//                             const inputValue = e.target.value;
//                             if (inputValue.length <= 35) {
//                                 setTitle(inputValue);
//                             }
//                         }}
//                     />
//                 </InputContainer>
//                 <EditorContainer>
//                     <EditorWrapper>
//                         <div id="editor" style={{ overflowY: 'auto' }} />
//                     </EditorWrapper>
//                 </EditorContainer>
//                 <PublishButtonContainer>
//                     <PublishButton onClick={editHandler}>Post</PublishButton>
//                 </PublishButtonContainer>
//             </Container>
//         </>
//     );
// }

// export default EditPage;
import { useState, useEffect } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useParams, useNavigate } from 'react-router-dom';
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
} from './EditPage.styled';

function EditorPage({ isNewPost }) {
    const URI = process.env.REACT_APP_API_URL;
    const [title, setTitle] = useState('');
    const [editor, setEditor] = useState(null);
    const [selectedImage] = useState(null);
    const navigate = useNavigate();
    const { boardId } = useParams();

    useEffect(() => {
        const editorInstance = new Editor({
            el: document.querySelector('#editor'),
            height: '770px',
            initialEditType: 'wysiwyg',
            maxWidth: '800px', 
            overflow: 'ellipsis',
            events: {
                change: () => handleContentChange(),
            },
        });

        setEditor(editorInstance);
    }, []);

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
            const axiosMethod = isNewPost ? axios.post : axios.patch;
            const endpoint = isNewPost ? `${URI}/board` : `${URI}/board/${boardId}/update`;

            axiosMethod(endpoint, formData, {
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
                    <PublishButton onClick={handleContentChange}>
                        {isNewPost ? 'Post' : 'Edit'}
                    </PublishButton>
                </PublishButtonContainer>
            </Container>
        </>
    );
}

export default EditorPage;
