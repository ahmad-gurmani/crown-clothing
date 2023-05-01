import { signInWithGooglePopup, createUserDocumentFormAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFormAuth(user);
    }

    return (
        <div>
            <h1>Sign-in page</h1>
            <button onClick={logGoogleUser}>Sign im with Google Popup</button>
        </div>
    )
}

export default SignIn;