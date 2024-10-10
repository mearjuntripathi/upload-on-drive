import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const GoogleAuth = () => {
  useEffect(() => {
    const start = async () => {
      // Check if gapi.auth2 is already initialized
      const auth2 = gapi.auth2.getAuthInstance();
      if (!auth2) {
        // Initialize if not already done
        await gapi.auth2.init({
          client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
          scope: 'email',
        });
      }
    };

    gapi.load('client:auth2', start);
  }, []);

  const handleLogin = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then((user) => {
      console.log(user.getBasicProfile().getName());
    });
  };

  const handleLogout = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default GoogleAuth;
