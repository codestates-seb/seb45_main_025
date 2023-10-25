// import { useState, useRef } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import axios from 'axios'
// import getAccessToken from '../../common/utils/getToken';
// import post5 from '../../common/image/post5.jpg';
// import {
//     Container,
//     InputContainer,
//     TitleInput,
//     EditorContainer,
//     EditorWrapper,
//     PublishButtonContainer,
//     PublishButton,
//     BackgroundImageContainer,
//     ImageInput,
//     ImageDelete
// } from './WritePost.styled';

// const Editor = ({ placeholder, value, onChange }) => {
//     const modules = {

//         toolbar: {
//             container: [
//                 ['link', 'video'],
//                 [{ header: [1, 2, 3, false] }],
//                 ['bold', 'italic', 'underline', 'strike'],
//                 ['blockquote'],
//                 [{ list: 'ordered' }, { list: 'bullet' }],
//                 [{ color: [] }, { background: [] }],
//                 [{ align: [] }],
//             ],
//         },
//     };

//     const formats = [
//         'header',
//         'font',
//         'size',
//         'bold',
//         'italic',
//         'underline',
//         'strike',
//         'align',
//         'blockquote',
//         'list',
//         'bullet',
//         'indent',
//         'background',
//         'color',
//         'link',

//         'width',
//     ];


//     return (
//         <ReactQuill
//             placeholder={placeholder}
//             value={value || ''}
//             theme="snow"
//             modules={modules}
//             formats={formats}
//             onChange={onChange}
//         />
//     );
// };

// Editor.propTypes = {
//     placeholder: PropTypes.string,
//     value: PropTypes.string,
//     onChange: PropTypes.func.isRequired,
// };

// function WritePost() {
//     const URI = process.env.REACT_APP_API_URL;
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [myImg, setMyImg] = useState([]);
//     const [myImgPost, setMyImgPost] = useState([]);
//     const handleContentChange = (newContent) => {
//         setContent(newContent);
//     };
//     const navigate = useNavigate();


//     const quillRef = useRef(); // Quill 에디터에 접근하기 위한 ref

//     const handlePublish = async () => {
//         let access_token = getAccessToken();

//         try {
//             const formData = new FormData();
//             formData.append("title", title);
//             formData.append("content", content);
//             for (let i = 0; i < myImgPost.length; i++) {
//                 formData.append("images", myImgPost[i]);
//             }
//             const response = await axios.post(`${URI}/board`, formData, {
//                 headers: {
//                     Authorization: access_token,
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             console.log('백엔드 응답:', response);
//             navigate('/CommunityList');
//         } catch (error) {
//             console.error('에러 발생:', error);
//         }
//     };

//     async function imgupload(e){
//         if(e.target.value !==''){
//           const reader = new FileReader();
//           reader.onload = (e) => {	
//             setMyImg([...myImg,e.target.result]); // 파일의 컨텐츠
//           };
//           reader.readAsDataURL(e.target.files[0]);
//           console.log(e.target.files[0])
//           setMyImgPost([...myImgPost,e.target.files[0]])
//       }
//     }

//     function imgdelete(){
//         setMyImg([])
//         setMyImgPost([])
//     }
//     return (
//         <>
//             <BackgroundImageContainer backgroundImage={`url(${post5})`}>
//                 POST
//             </BackgroundImageContainer>
//             <Container>

//                 <InputContainer>
//                     <TitleInput
//                         type="text"
//                         placeholder="Enter Title"
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
//                         <ReactQuill
//                             ref={quillRef}
//                             placeholder="Enter Content"
//                             value={content}
//                             onChange={handleContentChange}
//                             modules={{
//                                 toolbar: {
//                                     container: [
//                                         ['link'],
//                                         [{ header: [1, 2, 3, false] }],

//                                     ],

//                                 },
//                             }
//                             }
//                         />
//                     </EditorWrapper>
//                     <ImageInput>
//                 {myImg.map((ele)=><img key={ele} src={ele} alt='img'/>)}
//                 <div className='btn-bind'>
//                    <label htmlFor="upload">
//                 <div className="btn-upload">Select Image</div>
//                 </label>
//                 <input type="file" name="image" id="upload" accept="image/*" onChange={(e)=>imgupload(e)} />
//                 <ImageDelete onClick={imgdelete}>Delete Image</ImageDelete> 
//                 </div>
//                 </ImageInput>
//                 </EditorContainer>
//                 <PublishButtonContainer>
//                     <PublishButton
//                         onClick={handlePublish}
//                     >
//                         Post
//                     </PublishButton>
//                 </PublishButtonContainer>
//             </Container>
//         </>

//     );
// }

// export default WritePost;


// import { useState, useEffect } from 'react';
// import Editor from '@toast-ui/editor';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import getAccessToken from '../../common/utils/getToken';
// import post5 from '../../common/image/post5.jpg';
// import {
//     Container,
//     InputContainer,
//     TitleInput,
//     BackgroundImageContainer,
//     EditorContainer,
//     EditorWrapper,
//     PublishButton,
//     PublishButtonContainer
// } from './WritePost.styled';
// // import { PiHourglassSimpleMediumDuotone } from 'react-icons/pi';



// function WritePost() {
//     const URI = process.env.REACT_APP_API_URL;
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const navigate = useNavigate();

//     const handleContentChange = (editor) => {
//         setContent(editor.getMarkdown());
//     };

//     const handlePublish = async () => {
//         let access_token = getAccessToken();

//         try {
//             const formData = new FormData();
//             formData.append('title', title);
//             formData.append('content', content);

//             const response = await axios.post(`${URI}/board`, formData, {
//                 headers: {
//                     Authorization: access_token,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             console.log('백엔드 응답:', response);
//             navigate('/CommunityList');
//         } catch (error) {
//             console.error('에러 발생:', error);
//         }
//     };

//     useEffect(() => {
//         const editor = new Editor({
//             el: document.querySelector('#editor'),
//             height: '750px',
//             initialEditType: 'wysiwyg',
//             maxwidth: '800px',
//             overflow: 'ellipsis',
//             events: {
//                 change: () => handleContentChange(editor),
//             },
//         });

//         return () => {
//             editor.remove(); // 컴포넌트가 언마운트될 때 에디터 정리
//         };
//     }, []);

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
//                     <PublishButton onClick={handlePublish}>
//                         Post
//                     </PublishButton>
//                 </PublishButtonContainer>
//             </Container>
//         </>
//     );
// }

// export default WritePost;

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
                })
                .catch((error) => {
                    console.error('에러 발생:', error);
                });
        }
    };

    const handlePublish = () => {
        handleContentChange();
        navigate('/CommunityList');
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
