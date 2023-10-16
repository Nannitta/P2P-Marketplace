import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserAuthContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserAuthContextProvider>
);
