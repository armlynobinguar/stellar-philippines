import PageHero from "../components/PageHero";
import { events } from "../data/events";
import "./EventsPage.css";

const typeColors: Record<string, string> = {
  Workshop: "var(--sds-clr-lilac-09)",
  Meetup: "var(--sds-clr-teal-09)",
  Hackathon: "var(--sds-clr-gold-09)",
  Webinar: "var(--sds-clr-navy-09)",
  Bootcamp: "var(--sds-clr-green-09)",
  Challenge: "var(--sds-clr-gold-11)",
};

export default function EventsPage() {
  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "past");

  return (
    <>
      <PageHero
        eyebrow="Community events"
        title="Workshops, meetups & hackathons"
        desc="Join Filipino Stellar builders at in-person and online events across the Philippines — learn, network, and ship together."
        stats={[
          { value: String(upcoming.length), label: "Upcoming events" },
          { value: String(past.length), label: "Past events" },
          { value: "4", label: "Cities covered" },
          { value: "Free", label: "Community access" },
        ]}
      />

      <section className="events-section">
        <div className="container">
          <div className="events-header">
            <h2 className="section-title">Upcoming events</h2>
            <p className="section-desc">
              Register early — spots fill up fast at our community workshops and meetups.
            </p>
          </div>

          <div className="events-list">
            {upcoming.map((event) => (
              <article key={event.id} className="event-card">
                <div className="event-date-block">
                  <span className="event-date">{event.date}</span>
                  <span className="event-time">{event.time}</span>
                </div>
                <div className="event-body">
                  <div className="event-image-wrapper">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="event-card-thumbnail" 
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="event-meta">
                    <span
                      className="event-type"
                      style={{ background: typeColors[event.type] }}
                    >
                      {event.type}
                    </span>
                    <span className="event-location">{event.location}</span>
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-desc">{event.desc}</p>
                  
                  <a 
                    href={event.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary event-register text-center display-block"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    Register interest
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="events-past-header">
            <h2 className="section-title">Past events</h2>
          </div>

          <div className="events-past-grid">
            {past.map((event) => (
              <article key={event.id} className="event-past-card">
                <div className="event-past-image-wrapper">
                  <img src={event.image} alt={event.title} className="event-past-thumbnail" loading="lazy" />
                </div>
                <span
                  className="event-type event-type-sm"
                  style={{ background: typeColors[event.type] }}
                >
                  {event.type}
                </span>
                <h3 className="event-past-title">{event.title}</h3>
                <p className="event-past-meta">
                  {event.date} · {event.location}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}