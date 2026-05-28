import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const EVENT_TYPES = [
  'Wedding',
  'Corporate',
  'Social / private',
  'Conference',
  'Fashion / pop-up',
  'Other',
];

const GUEST_RANGES = [
  'Under 50',
  '50–100',
  '100–200',
  '200–500',
  '500+',
];

const SERVICES = [
  { value: 'full', label: 'Full event planning', note: 'From KES 80,000' },
  { value: 'day-of', label: 'Day-of coordination', note: 'From KES 35,000' },
  { value: 'corporate', label: 'Corporate event', note: 'Custom quote' },
  { value: 'styling', label: 'Styling & décor only', note: 'From KES 20,000' },
  { value: 'unsure', label: "Not sure yet — let's talk", note: '' },
];

const ADDONS = [
  'Floral design & arrangements',
  'Photography / videography referral',
  'Catering coordination',
  'Entertainment booking',
  'Lighting & audio setup',
];

const HEAR_ABOUT = [
  'Instagram',
  'Referral',
  'Google search',
  'Event / venue',
  'Other',
];

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  eventType: '',
  eventDate: '',
  guests: '',
  venue: '',
  service: '',
  addons: [],
  vision: '',
  hearAbout: '',
};

export default function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const toggleAddon = (addon) => {
    setForm((prev) => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter((a) => a !== addon)
        : [...prev.addons, addon],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Unable to send. Please try again.');
    }
  };

  return (
    <div className="bm-contact bm-contact--form">
      <div className="bm-contact-inner">
        <Reveal>
          <div className="bm-book-intro">
            <Link to="/#contact" className="bm-book-back">
              ← Back to contact
            </Link>
            <div className="bm-sec-header">
              <div className="bm-sec-title">Tell me about your event</div>
            </div>
          </div>
          <p className="bm-contact-sub">
            Fill in the details below and I&apos;ll be in touch within 24 hours to discuss your vision.
          </p>
        </Reveal>

        <div className="bm-contact-grid">
          <Reveal type="right" delay={1}>
            <form className="bm-booking-form" onSubmit={handleSubmit} noValidate>
              <fieldset className="bm-form-section" aria-labelledby="booking-your-details">
                <h3 id="booking-your-details" className="bm-form-legend">Your details</h3>
                <div className="bm-form-row">
                  <div className="bm-form-group">
                    <label htmlFor="firstName">First name *</label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={update('firstName')}
                    />
                  </div>
                  <div className="bm-form-group">
                    <label htmlFor="lastName">Last name *</label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      placeholder="Mwangi"
                      value={form.lastName}
                      onChange={update('lastName')}
                    />
                  </div>
                </div>
                <div className="bm-form-group">
                  <label htmlFor="email">Email address *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="jane@email.com"
                    value={form.email}
                    onChange={update('email')}
                  />
                  <span className="bm-field-hint">I&apos;ll send your booking confirmation here.</span>
                </div>
                <div className="bm-form-group">
                  <label htmlFor="phone">Phone number *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+254 700 000 000"
                    value={form.phone}
                    onChange={update('phone')}
                  />
                </div>
              </fieldset>

              <fieldset className="bm-form-section" aria-labelledby="booking-event-details">
                <h3 id="booking-event-details" className="bm-form-legend">Event details</h3>
                <div className="bm-form-group">
                  <label htmlFor="eventType">Type of event *</label>
                  <select
                    id="eventType"
                    required
                    value={form.eventType}
                    onChange={update('eventType')}
                  >
                    <option value="">Select event type</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="bm-form-row">
                  <div className="bm-form-group">
                    <label htmlFor="eventDate">Event date</label>
                    <input
                      id="eventDate"
                      type="date"
                      value={form.eventDate}
                      onChange={update('eventDate')}
                    />
                  </div>
                  <div className="bm-form-group">
                    <label htmlFor="guests">Estimated guests</label>
                    <select id="guests" value={form.guests} onChange={update('guests')}>
                      <option value="">Select range</option>
                      {GUEST_RANGES.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bm-form-group">
                  <label htmlFor="venue">Venue</label>
                  <input
                    id="venue"
                    type="text"
                    placeholder="Do you have a venue?"
                    value={form.venue}
                    onChange={update('venue')}
                  />
                </div>
              </fieldset>

              <fieldset className="bm-form-section" aria-labelledby="booking-service">
                <h3 id="booking-service" className="bm-form-legend">Service needed *</h3>
                <div className="bm-service-options">
                  {SERVICES.map((s) => (
                    <label key={s.value} className="bm-service-option">
                      <input
                        type="radio"
                        name="service"
                        required
                        value={s.value}
                        checked={form.service === s.value}
                        onChange={update('service')}
                      />
                      <span className="bm-service-option-text">
                        <span className="bm-service-option-label">{s.label}</span>
                        {s.note ? <span className="bm-service-option-note">{s.note}</span> : null}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="bm-form-section" aria-labelledby="booking-addons">
                <h3 id="booking-addons" className="bm-form-legend">Add-ons</h3>
                <p className="bm-field-hint bm-field-hint-block">What else might you need?</p>
                <div className="bm-checkbox-group">
                  {ADDONS.map((addon) => (
                    <label key={addon} className="bm-checkbox">
                      <input
                        type="checkbox"
                        checked={form.addons.includes(addon)}
                        onChange={() => toggleAddon(addon)}
                      />
                      <span>{addon}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="bm-form-section" aria-labelledby="booking-vision">
                <h3 id="booking-vision" className="bm-form-legend">Your vision</h3>
                <div className="bm-form-group">
                  <label htmlFor="vision">Tell me about your event</label>
                  <textarea
                    id="vision"
                    maxLength={400}
                    rows={5}
                    placeholder="Share your vision, theme ideas, must-haves, budget range, or anything else that will help me understand what you're looking for..."
                    value={form.vision}
                    onChange={update('vision')}
                  />
                  <span className="bm-field-hint">{form.vision.length} / 400</span>
                </div>
                <div className="bm-form-group">
                  <label htmlFor="hearAbout">How did you hear about me?</label>
                  <select id="hearAbout" value={form.hearAbout} onChange={update('hearAbout')}>
                    <option value="">Select an option</option>
                    {HEAR_ABOUT.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </fieldset>

              {status === 'success' ? (
                <p className="bm-form-success" role="status">
                  Thank you — your booking request was sent. I&apos;ll be in touch within 24 hours.
                </p>
              ) : null}

              {status === 'error' ? (
                <p className="bm-form-error" role="alert">{errorMessage}</p>
              ) : null}

              <button
                type="submit"
                className="bm-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Submit booking request'}
              </button>

              <p className="bm-contact-privacy">
                Your details are kept private and never shared with third parties.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
