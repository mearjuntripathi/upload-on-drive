// src/hooks/useGoogleDrive.js
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { CLIENT_ID, API_KEY, SCOPES } from '../config';

export const useGoogleDrive = (setIsLoggedIn, setUserEmail) => {
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          const user = authInstance.currentUser.get();
          setIsLoggedIn(true);
          setUserEmail(user.getBasicProfile().getEmail());
        }
      });
    };
    
    gapi.load('client:auth2', start);
  });

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      const user = gapi.auth2.getAuthInstance().currentUser.get();
      setIsLoggedIn(true);
      setUserEmail(user.getBasicProfile().getEmail());
    });
  };

  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      setIsLoggedIn(false);
      setUserEmail('');
    });
  };

  return { handleLogin, handleLogout };
};
