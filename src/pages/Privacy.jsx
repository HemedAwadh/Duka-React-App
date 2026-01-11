import React from "react";

function Privacy() {
    return (
        <div className="App-content" style={{ padding: "100px 20px", minHeight: "80vh" }}>
            <div className="container text-center">

                <h1 className="hero-title">Privacy Policy</h1>
                <p className="hero-text">
                    Your privacy is important to us. My-Duka is committed to protecting the personal information of our users.
                </p>

                <div className="mt-5 text-start" style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <h5>Information We Collect</h5>
                    <p>
                        We collect data such as your name, email, and business information to provide a better experience. 
                        We never sell your information to third parties.
                    </p>

                    <h5>How We Use Information</h5>
                    <p>
                        Your information is used to manage your account, communicate updates, and improve the My-Duka platform.
                    </p>

                    <h5>Security</h5>
                    <p>
                        We implement appropriate measures to protect your data from unauthorized access or disclosure.
                    </p>

                    <h5>Contact</h5>
                    <p>
                        If you have any privacy concerns, please contact us via the <a href="/contact" className="footer-links">Contact</a> page.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Privacy;
