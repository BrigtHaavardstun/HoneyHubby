import React, { useState, useEffect} from 'react';
import './App.css';
import ImageCarousel from './ImageCarousel';

function App() {
    const [showHearts, setShowHearts] = useState(false);


    const toggleHearts = () => {
        setShowHearts(!showHearts);
    };

    return (
        <div className="page-container">
            <Header onHeartClick={toggleHearts} />
            <ImageCarousel />
            <MainContent />
            <Footer />
            {showHearts && <FallingHearts toggleHearts={toggleHearts} />}
        </div>
    );
}

type HeaderProps = {
    onHeartClick: () => void;
};

const Header = ({ onHeartClick }: HeaderProps) => (
    <header className="App-header">
        <h1>Our Wedding</h1>
        <nav>
            <ul>
                <li>
                    <a href="#welcome">Home</a>
                </li>
                <li>
                    <a href="#rsvp">RSVP</a>
                </li>
                <li>
                    <button onClick={onHeartClick}>Gi oss kjærlighet</button>
                </li>
            </ul>
        </nav>
    </header>
);

const MainContent = () => (
    <main>
        <section id="welcome">
            <h2>Welcome</h2>
            <p>We are excited to have you join us on our special day!</p>
        </section>
        <section id="rsvp">
            <h2>RSVP</h2>
            <p>Please let us know if you can join us by filling out the form below:</p>
            <div className="rsvp-form">
                <iframe
                    title="RSVP Form"
                    src="https://forms.gle/B97QDcto2AKEPKaA7"
                    width="640"
                    height="800"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                >
                    Loading…
                </iframe>
            </div>
        </section>
    </main>
);

const Footer = () => (
    <footer className="App-footer">
        <p>Thank you for being part of our journey!</p>
    </footer>
);
type SetBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

type FallingHeartsProps = {
    toggleHearts:SetBooleanState;
};
const FallingHearts = ({ toggleHearts }: FallingHeartsProps) => {

    const total_time = 5000; // Total time in milliseconds (e.g., 5000ms = 5 seconds)
    const [keepAlive, setKeepAlive] = useState(true);

    useEffect(() => {
        // Set a timer to trigger the fade-out effect after total_time has elapsed
        const timer = setTimeout(() => {
            setKeepAlive(false);
            toggleHearts(false);
        }, total_time);

        // Cleanup the timer if the component unmounts before the time is up
        return () => clearTimeout(timer);
    }, [total_time]);
    const NUM_HEARTS = 30;
    const hearts = Array.from({ length: NUM_HEARTS }, (_, i) => {
        const left = Math.random() * 100;
        const duration = 4 + Math.random() * 2; // 1-2 seconds
        const delay = Math.random() * 3;       // 0-3 seconds
        const size = 16 + Math.random() * 14;  // 16-30px

        const style: React.CSSProperties = {
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            fontSize: `${size}px`
        };

        return (
            <div key={i} className="falling-heart" style={style}>
                {keepAlive && "♥"}
            </div>
        );
    });

    return <div className="falling-hearts">{hearts}</div>;
};

export default App;
