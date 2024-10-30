import { useState } from "react";
import ReactModal from "react-modal";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const modalOpen = () => setIsOpen(true);
  const modalClose = () => {
    setIsOpen(false);
    setFormData({ username: "", email: "", dob: "", phone: "" });
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const { username, email, dob, phone } = formData;

    if (!username) {
      newErrors.username = "Please fill out the username field";
    }
    if (!email) {
      newErrors.email = "Please fill out the email field";
    } else if (!email.includes("@")) {
      newErrors.email = "Invalid email";
      alert("Invalid email. Please check your email address.");
    }
    if (!phone) {
      newErrors.phone = "Please fill out the Phone field";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Invalid phone number";
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }
    if (!dob) {
      newErrors.dob = "Please fill out the Date of Birth field.";
    } else if (new Date(dob) > new Date()) {
      newErrors.dob = "Invalid Date of Birth"; // Updated error message
      alert("Invalid date of birth"); // Updated alert message
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      modalClose();
    }
  };

  return (
    <>
      <h1>User Details Modal</h1>
      <button onClick={modalOpen}>Open Form</button>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={modalClose} 
        className="modal-content"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={true} 
        parentSelector={() => document.getElementById("root")}
      >
        <div className="modal"> {/* Ensure this wraps your form */}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p style={{ color: "red" }}>{errors.username}</p>
              )}
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="dob">Date of Birth:</label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && <p style={{ color: "red" }}>{errors.dob}</p>}
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </ReactModal>
    </>
  );
}

export default App;