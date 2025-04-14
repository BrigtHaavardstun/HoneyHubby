// App.tsx
import React, { useState, useEffect } from 'react';
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
            <div className="content-wrapper">
                <div className="side-carousel left-carousel">
                    <ImageCarousel
                        totalImages={13}
                        displayCount={5}
                        vertical={true}
                        imageWidth={180}  // Set custom width
                        imageHeight={130} // Set custom height
                    />
                </div>
                <div className="main-content-area">
                    <Hero />
                    <MainContent />
                    <Registry />
                    <Gallery />
                    <Footer />
                </div>
                <div className="side-carousel right-carousel">
                    <ImageCarousel
                        totalImages={13}
                        displayCount={5}
                        vertical={true}
                        tickRate={4000}
                        startingIndex={7}
                        imageWidth={180}  // Set custom width
                        imageHeight={130} // Set custom height
                    />
                </div>
            </div>
            {showHearts && <FallingHearts toggleHearts={setShowHearts} />}
        </div>
    );
}

type HeaderProps = {
    onHeartClick: () => void;
};

const Header = ({ onHeartClick }: HeaderProps) => (
    <header className="App-header">
        <h1>Vårt Bryllup</h1>
        <nav>
            <ul>
                <li>
                    <a href="#welcome">Hjem</a>
                </li>
                <li>
                    <a href="#our-story">Vår Historie</a>
                </li>
                <li>
                    <a href="#details">Detaljer</a>
                </li>
                <li>
                    <a href="#registry">Gaveliste</a>
                </li>
                <li>
                    <a href="#gallery">Galleri</a>
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

const Hero = () => (
    <div className="hero">
        <h1>Brigt & Sanne</h1>
        <h2>skal gifte seg</h2>
        <div className="date">12. juni 2025</div>
        <a href="#rsvp" className="button">RSVP</a>
    </div>
);

const MainContent = () => (
    <main>
        <section id="welcome">
            <div className="section">
                <h2>Velkommen</h2>
                <p>Vi gleder oss til å dele vår spesielle dag med deg!</p>
            </div>
        </section>

        <section id="our-story">
            <div className="section">
                <h2>Vår Historie</h2>
                <p>Vi møttes for fem år siden på en venns bursdagsfest. Brigt sølte drikken sin på Sannes kjole, og resten er historie! Etter tre år med dating og utallige eventyr sammen, fridde Brigt under turen vår til Hawaii ved solnedgang på stranden.</p>
                <p>Vi er så glade for å feire vår spesielle dag med alle våre venner og familie.</p>
            </div>
        </section>

        <section id="details">
            <div className="section">
                <h2>Bryllupsdetaljer</h2>
                <div className="schedule">
                    <div className="schedule-item">
                        <h3>Vielse</h3>
                        <p><strong>Tid:</strong> 15:00</p>
                        <p><strong>Sted:</strong> Rosewood Gardens</p>
                        <p>Blomsterveien 123, Bergen</p>
                    </div>

                    <div className="schedule-item">
                        <h3>Mottakelse</h3>
                        <p><strong>Tid:</strong> 17:00</p>
                        <p><strong>Sted:</strong> Rosewood Gardens Festsal</p>
                        <p>Middag, dans og feiring følger etter seremonien</p>
                    </div>
                </div>

                <h3>Kart</h3>
                <div className="map">
                    <p>Kartplassering - Legg til veibeskrivelse her</p>
                </div>
            </div>
        </section>

        <section id="rsvp">
            <div className="section">
                <h2>RSVP</h2>
                <p>Vennligst gi oss beskjed om du kan delta ved å fylle ut skjemaet nedenfor:</p>
                <div className="rsvp-form">
                    <iframe
                        title="RSVP Skjema"
                        src="https://forms.gle/B97QDcto2AKEPKaA7"
                        width="640"
                        height="800"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                    >
                        Laster...
                    </iframe>
                </div>
            </div>
        </section>
    </main>
);

const Registry = () => (
    <section id="registry">
        <div className="section">
            <h2>Gaveliste</h2>
            <p>Din tilstedeværelse i bryllupet vårt er den største gaven. Men hvis du ønsker å hjelpe oss med å feire med en gave, har vi registrert oss på følgende steder:</p>
            <p>
                <a href="#" className="button">Gaveliste 1</a>
                <a href="#" className="button">Gaveliste 2</a>
            </p>
        </div>
    </section>
);

const Gallery = () => (
    <section id="gallery">
        <div className="section">
            <h2>Bildegalleri</h2>
            <p>Noen av våre favorittøyeblikk sammen</p>
            <div className="gallery">
                <div className="gallery-item"></div>
                <div className="gallery-item"></div>
                <div className="gallery-item"></div>
                <div className="gallery-item"></div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="App-footer">
        <p>Vi gleder oss til å feire med deg!</p>
        <p>Brigt Arve Toppe Håvardstun & Sanne Pooja Hauge</p>
    </footer>
);

type FallingHeartsProps = {
    toggleHearts: React.Dispatch<React.SetStateAction<boolean>>;
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
    }, [total_time, toggleHearts]);

    const NUM_HEARTS = 30;
    const hearts = Array.from({ length: NUM_HEARTS }, (_, i) => {
        const left = Math.random() * 100;
        const duration = 4 + Math.random() * 2; // 4-6 seconds
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