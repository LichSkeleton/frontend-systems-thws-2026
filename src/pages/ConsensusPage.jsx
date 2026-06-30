import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/consensus.css";

const GUARDIAN_API_KEY = "ae35c1dc-44c8-4fe5-a486-4c93d0f11f16";

const PEW_STATS = [
  {
    label: "Americans who feel more concerned than excited about AI in daily life",
    value: 52,
    citation: 'Pew Research Center, "Growing Public Concern About AI in Daily Life" (Aug. 2023)',
    sourceUrl: "https://www.pewresearch.org/short-reads/2023/08/28/growing-public-concern-about-the-role-of-artificial-intelligence-in-daily-life/",
  },
  {
    label: "U.S. adults highly worried about getting inaccurate information from AI",
    value: 66,
    citation: 'Pew Research Center, "AI Risks, Opportunities, and Regulation" (Apr. 2025)',
    sourceUrl: "https://www.pewresearch.org/internet/2025/04/03/views-of-risks-opportunities-and-regulation-of-ai/",
  },
  {
    label: "Americans who lack confidence the government can regulate AI effectively",
    value: 62,
    citation: 'Pew Research Center, "AI Risks, Opportunities, and Regulation" (Apr. 2025)',
    sourceUrl: "https://www.pewresearch.org/internet/2025/04/03/views-of-risks-opportunities-and-regulation-of-ai/",
  },
  {
    label: "Americans who interact with AI at least several times a day",
    value: 27,
    citation: 'Pew Research Center, "Public Awareness of AI in Everyday Activities" (Feb. 2023)',
    sourceUrl: "https://www.pewresearch.org/science/2023/02/15/public-awareness-of-artificial-intelligence-in-everyday-activities/",
  },
];

const EDELMAN_STATS = [
  {
    label: "People across 24 countries who trust AI companies to do what is right (down from 62% in 2019)",
    value: 54,
    citation: 'Edelman Trust Barometer, "Annual Global Report" (2024)',
    sourceUrl: "https://www.edelman.com/trust/2024/trust-barometer",
  },
  {
    label: "Global employees who fear job displacement due to AI and automation",
    value: 59,
    citation: 'Edelman Trust Barometer, "Annual Global Report" (2024)',
    sourceUrl: "https://www.edelman.com/trust/2024/trust-barometer",
  },
  {
    label: "Global respondents who say they embrace artificial intelligence",
    value: 30,
    citation: 'Edelman Trust Barometer, "Annual Global Report" (2024)',
    sourceUrl: "https://www.edelman.com/trust/2024/trust-barometer",
  },
];

function StatBar({ label, value, citation, sourceUrl }) {
  return (
    <div className="stat-item">
      <div className="stat-header">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}%</span>
      </div>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${value}%` }} />
      </div>
      <cite className="stat-cite">
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="stat-cite-link">
          {citation}
        </a>
      </cite>
    </div>
  );
}

function StatGroup({ title, stats, colorClass }) {
  return (
    <div className={`stat-group ${colorClass}`}>
      <h3 className="stat-group-title">{title}</h3>
      <div className="stat-list">
        {stats.map((s) => (
          <StatBar key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}

function EventCard({ article }) {
  const date = new Date(article.webPublicationDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="event-card">
      <span className="event-section">{article.sectionName}</span>
      <h3 className="event-title">{article.webTitle}</h3>
      <div className="event-footer">
        <span className="event-date">{date}</span>
        <a
          href={article.webUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="event-link"
        >
          Read more →
        </a>
      </div>
    </div>
  );
}

export default function ConsensusPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://content.guardianapis.com/search?q=artificial+intelligence&api-key=${GUARDIAN_API_KEY}&page-size=8&order-by=newest&section=technology`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setArticles(data.response.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <section className="consensus-section">
          <div className="consensus-inner">
            <div className="consensus-hero">
              <h2 className="consensus-title">Public Consensus on AI</h2>
              <p className="consensus-sub">
                How does the world actually feel? Aggregated research from leading institutions
                on public attitudes toward artificial intelligence.
              </p>
            </div>

            <div className="stats-grid">
              <StatGroup
                title="Pew Research Center (U.S.)"
                stats={PEW_STATS}
                colorClass="stat-group-pew"
              />
              <StatGroup
                title="Edelman Trust Barometer"
                stats={EDELMAN_STATS}
                colorClass="stat-group-edelman"
              />
            </div>

            <div className="recent-events">
              <div className="recent-events-header">
                <h2 className="recent-events-title">Recent Events</h2>
                <span className="recent-events-sub">Recent articles live from The Guardian on artificial intelligence</span>
              </div>
              {loading && (
                <div className="events-status">Loading latest AI news...</div>
              )}
              {error && (
                <div className="events-status events-error">
                  Could not load articles: {error}
                </div>
              )}
              {!loading && !error && (
                <div className="events-grid">
                  {articles.map((article) => (
                    <EventCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
