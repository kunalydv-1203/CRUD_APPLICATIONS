import React from 'react';
import '../css/footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            <div className="footer-links">
                <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
                <a href="/terms-of-service" className="footer-link">Terms of Service</a>
            </div>
        </footer>
    );
};

export default Footer;
