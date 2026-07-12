import { useState } from 'react';
import { Link } from 'react-router-dom';

const HELP_OPTIONS = [
  'Event Management',
  'Project Management',
  'Speaker Management',
  'Event Consultancy',
];

const EVENT_DETAIL_OPTIONS = [
  'Corporate Party',
  'Conference/Summit',
  'Retreat',
  'Social Event',
  'Just an Idea',
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  helpWith: [],
  eventDetails: [],
};

export default function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const toggleOption = (field, option) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter((item) => item !== option)
        : [...prev[field], option],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!form.helpWith.length || !form.eventDetails.length) {
      setStatus('error');
      setErrorMessage('Please select at least one option for How Can I Help and Event Details.');
      return;
    }

    setStatus('sending');

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
      <Link to="/#contact" className="bm-book-back">
        ← Back
      </Link>
      <div className="bm-book-scroll">
        <div className="bm-contact-inner">
          <div className="bm-book-intro">
            <div className="bm-sec-header">
              <div className="bm-sec-title">Tell me about your event</div>
            </div>
          </div>
          <p className="bm-contact-sub">
            Fill in the details below and I&apos;ll be in touch within 24 hours to discuss your vision.
          </p>

          <form className="bm-booking-form" onSubmit={handleSubmit} noValidate>
              <fieldset className="bm-form-section" aria-labelledby="booking-your-details">
                <h3 id="booking-your-details" className="bm-form-legend">Your Details</h3>
                <div className="bm-form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={update('name')}
                  />
                </div>
                <div className="bm-form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="jane@email.com"
                    value={form.email}
                    onChange={update('email')}
                  />
                </div>
                <div className="bm-form-group">
                  <label htmlFor="phone">Phone Number *</label>
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

              <fieldset className="bm-form-section" aria-labelledby="booking-help">
                <h3 id="booking-help" className="bm-form-legend">How Can I Help *</h3>
                <div className="bm-checkbox-group">
                  {HELP_OPTIONS.map((option) => (
                    <label key={option} className="bm-checkbox">
                      <input
                        type="checkbox"
                        checked={form.helpWith.includes(option)}
                        onChange={() => toggleOption('helpWith', option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="bm-form-section" aria-labelledby="booking-event-details">
                <h3 id="booking-event-details" className="bm-form-legend">Event Details *</h3>
                <div className="bm-checkbox-group">
                  {EVENT_DETAIL_OPTIONS.map((option) => (
                    <label key={option} className="bm-checkbox">
                      <input
                        type="checkbox"
                        checked={form.eventDetails.includes(option)}
                        onChange={() => toggleOption('eventDetails', option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
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
        </div>
      </div>
    </div>
  );
}
