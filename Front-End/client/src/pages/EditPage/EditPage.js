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

function EditorPage() {
	const URI = process.env.REACT_APP_API_URL;
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [editor, setEditor] = useState(null);
	const [selectedImage] = useState(null);
	const navigate = useNavigate();
	const param = useParams()
	const id = param.id;
	useEffect(() => {
		const fetchData = async () => {
			let access_token = getAccessToken();
			try {
				const response = await axios.get(`${URI}/board/${id}`, {
					headers: {
						Authorization: access_token
					}
				});
				setTitle(response.data.title);
				setContent(response.data.content);
				const editorInstance = new Editor({
					el: document.querySelector('#editor'),
					height: '770px',
					initialEditType: 'wysiwyg',
					maxWidth: '800px',
					overflow: 'ellipsis',
					events: {
						change: () => handleContentChange()
					}
				});
				editorInstance.setMarkdown(content);
				setEditor(editorInstance);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [id]);

	const handleContentChange = () => {
		if (editor) {
			const updatedContent = editor.getMarkdown();
			setContent(updatedContent);
		}
	};

	const editHandler = async () => {
		let access_token = getAccessToken();

		try {
			const formData = new FormData();
			formData.append('title', title);
			formData.append('content', content);
			if (selectedImage) {
				formData.append('image', selectedImage);
			}

			const response = await axios.patch(
				`${URI}/board/${id}/update`,
				formData,
				{
					headers: {
						Authorization: access_token,
						'Content-Type': 'multipart/form-data'
					}
				}
			);

			console.log('백엔드 응답:', response.data);
			navigate('/CommunityList');
		} catch (error) {
			console.error('에러 발생:', error);
			navigate('/CommunityList');
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
					<PublishButton onClick={editHandler}>Edit</PublishButton>
				</PublishButtonContainer>
			</Container>
		</>
	);
}

export default EditorPage;
