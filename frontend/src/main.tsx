import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {CLIENT_GOOGLE_ID} from "./constants.ts";


createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={CLIENT_GOOGLE_ID}>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </GoogleOAuthProvider>,
)
