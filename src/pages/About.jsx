import React from "react";

function About() {
    return (
        <div className="App-content" style={{ padding: "100px 20px", minHeight: "80vh" }}>
            <div className="container text-center">

                <h1 className="hero-title">About My-Duka</h1>
                <p className="hero-text">
                    My-Duka is a modern inventory and sales management platform designed for small businesses in Kenya. 
                    Our goal is to help shop owners track products, manage sales, and make data-driven decisions easily.
                </p>

                <div className="row justify-content-center mt-5">
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100 bg-light bg-opacity-75">
                            <div className="card-body">
                                <h5 className="card-title">Our Mission</h5>
                                <p className="card-text">
                                    To empower small businesses with easy-to-use technology for better sales and inventory management.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100 bg-light bg-opacity-75">
                            <div className="card-body">
                                <h5 className="card-title">Our Vision</h5>
                                <p className="card-text">
                                    To become the leading business management platform for local shops across Africa.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About;
