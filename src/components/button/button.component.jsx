import "../button/button.styles.scss"
/*
types of buttons we use in this project 

1: default buttons

2: inverted buttons

3: google sign in
*/

const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted"
}

const Button = ({ children, buttonType, ...otherProps }) => {
    return <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>{children}</button >
};

export default Button; 