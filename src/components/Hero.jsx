function Hero() {
    return (
        <section style={{ backgroundColor: 'transparent', padding: '100px 0 150px 0' }}>
            <div className="container text-center">
                {/* Heading */}
                <h1 className="mb-4 fw-bold hero-title">
                    Welcome to My-Duka-System
                </h1>

                <p className="lead mb-5 hero-text" style={{ color: '#FFD700' }}>
                    Manage your shop efficiently with real-time product, sales, and inventory tracking.
                </p>

                {/* Feature Cards */}
                <div className="row justify-content-center staggered-cards">
                    {/* Card 1 */}
                    <div className="col-md-4 mb-4 staggered-card">
                        <div className="card shadow-sm h-100 bg-light bg-opacity-75">
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold">Inventory Control</h5>
                                <p className="card-text">
                                    Keep track of all your products, monitor stock levels, and avoid running out of items.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="col-md-4 mb-4 staggered-card">
                        <div className="card shadow-sm h-100 bg-light bg-opacity-75">
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold">Sales Analytics</h5>
                                <p className="card-text">
                                    View detailed sales reports, analyze trends, and track revenue across your shop.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="col-md-4 mb-4 staggered-card">
                        <div className="card shadow-sm h-100 bg-light bg-opacity-75">
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold">Customer Insights</h5>
                                <p className="card-text">
                                    Learn about your customers, their purchase behavior, and optimize your stock accordingly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Get Started Button */}
                <a
                    href="/register"
                    className="btn btn-primary btn-lg fw-bold mt-4 hero-cta-btn"
                    style={{ color: '#FFD700' }}
                >
                    Get Started
                </a>
            </div>
        </section>
    );
}

export default Hero;
