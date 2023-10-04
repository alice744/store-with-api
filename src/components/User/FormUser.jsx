import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSignUpForm from '../User/UserSignUpForm'
import styles from "../../styles/User.module.css";
import { toggleForm, toggleFormType } from '../../feauters/user/userSlice';
import UserLogin from './UserLogin';


const FormUser = () => {
    const dispatch = useDispatch();
    const { showForm, formType } = useSelector(({ user }) => user);

    const closeForm = () => dispatch(toggleForm(false));
    const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));


    return (
        showForm ? (
            <>
                <div
                    className={styles.overlay}
                    onClick={closeForm}
                />
                {formType === 'signup' ? (
                    <UserSignUpForm
                        toggleCurrentFormType={toggleCurrentFormType}
                        closeForm={closeForm}
                    />
                ) : (
                    <UserLogin
                        toggleCurrentFormType={toggleCurrentFormType}
                        closeForm={closeForm}
                    />
                )}
            </>
        ) : <></>
    );
}

export default FormUser;
