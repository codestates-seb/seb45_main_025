import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './style/Global.styled';
import { store } from './redux';
import HttpClient from './Service/http';
import ChatService from './Service/chat';

const baseURL = process.env.REACT_APP_BASE_URL;
const httpClient = new HttpClient(baseURL);
const chatService = new

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GlobalStyle />
      <App chatService={chatService} baseURL={baseURL} />
  </BrowserRouter>
);
