import React, { useState } from "react";

function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        alert("Message sent! Thank you for contacting us.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="App-content" style={{ padding: "100px 20px", minHeight: "80vh" }}>
            <div className="container text-center">
                <h1 className="hero-title">Contact Us</h1>
                <p className="hero-text">
                    Have questions or feedback? Fill out the form below and we’ll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="mt-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <div className="mb-3 text-start">
                        <label className="form-label">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            className="form-control" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label className="form-label">Message</label>
                        <textarea 
                            name="message" 
                            className="form-control" 
                            rows="5" 
                            value={formData.message} 
                            onChange={handleChange} 
                            required
                        />
                    </div>

                    <button type="submit" className="hero-cta-btn">Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
