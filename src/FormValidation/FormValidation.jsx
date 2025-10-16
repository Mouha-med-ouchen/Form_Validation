import { useEffect, useRef, useState } from "react";

export default function FormValidation() {
    const nameField = useRef();
    const emailField = useRef();
    const messageField = useRef();
    const countryField = useRef();
    const acceptConditonField = useRef();

    const [errors, setErrors] = useState([]);
    const [isFormSent, setIsFormSent] = useState(false);

    const ValidationForm = () => {
        const nameValue = nameField.current.value;
        const emailValue = emailField.current.value;
        const messageValue = messageField.current.value;
        const countryValue = countryField.current.value;
        const acceptValue = acceptConditonField.current.checked;

        let isFormValid = true;
        setErrors([]);

        // Reset all borders
        [nameField, emailField, messageField, countryField].forEach(f => {
            f.current.style.border = "3px solid green";
        });

        if (nameValue.trim() === "") {
            nameField.current.style.border = "1px solid red";
            setErrors(prev => [...prev, "Name Required!"]);
            isFormValid = false;
        } else {
            nameField.current.style.border = "3px solid green";
        }

        if (emailValue.trim() === "") {
            emailField.current.style.border = "1px solid red";
            setErrors(prev => [...prev, "Email Required!"]);
            isFormValid = false;
        } else if (!emailValue.includes("@")) {
            emailField.current.style.border = "1px solid red";
            setErrors(prev => [...prev, "Email not correct!"]);
            isFormValid = false;
        } else {
            emailField.current.style.border = "3px solid green";
        }

        if (messageValue.trim() === "") {
            messageField.current.style.border = "1px solid red";
            setErrors(prev => [...prev, "Message Required!"]);
            isFormValid = false;
        } else {
            messageField.current.style.border = "3px solid green";
        }

        if (countryValue.trim() === "") {
            countryField.current.style.border = "1px solid red";
            setErrors(prev => [...prev, "Country Required!"]);
            isFormValid = false;
        } else {
            countryField.current.style.border = "3px solid green";
        }

        if (!acceptValue) {
            setErrors(prev => [...prev, "You must accept all conditions!"]);
            isFormValid = false;
        }

        return isFormValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (ValidationForm()) {
            setIsFormSent(true);

            // Reset form values
            nameField.current.value = "";
            emailField.current.value = "";
            messageField.current.value = "";
            countryField.current.value = "";
            acceptConditonField.current.checked = false;

            setErrors([]);

            // Auto hide success message after 3s
            setTimeout(() => setIsFormSent(false), 3000);
        }
    };

    return (
        <>
            {isFormSent && (
                <div className="container alert alert-success alert-dismissible fade show mt-3" role="alert">
                    <strong>Success!</strong> Message sent successfully!!
                </div>
            )}

            <div className="container mt-4">
                {errors.length > 0 && (
                    <div className="alert alert-danger" role="alert">
                        <strong>Error:</strong>
                        <ul className="mt-2 mb-0">
                            {errors.map((error, key) => (
                                <li key={key}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <h2 className="mb-3 text-center">Simple React Form</h2>

                <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" className="form-control" ref={nameField} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" ref={emailField} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Message:</label>
                        <textarea className="form-control" rows="3" ref={messageField}></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Country:</label>
                        <select className="form-select" ref={countryField}>
                            <option value="">-- Select your country --</option>
                            <option value="MA">Morocco 🇲🇦</option>
                            <option value="FR">France 🇫🇷</option>
                            <option value="US">USA 🇺🇸</option>
                            <option value="EG">Egypt 🇪🇬</option>
                            <option value="SA">Saudi Arabia 🇸🇦</option>
                        </select>
                    </div>

                    <div className="form-check mb-3">
                        <input type="checkbox" className="form-check-input" ref={acceptConditonField} />
                        <label className="form-check-label">I accept all terms and conditions</label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}
