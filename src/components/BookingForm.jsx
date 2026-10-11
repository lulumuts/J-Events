import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';
import { submitBooking } from '../lib/submitBooking';
import {
  DEFAULT_PHONE_COUNTRY,
  formatInternationalPhone,
  phoneCountries,
  phoneCountryByIso,
} from '../data/phoneCountries';

function PhoneCountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selected = phoneCountryByIso(value) || phoneCountryByIso(DEFAULT_PHONE_COUNTRY);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className={`bm-phone-country${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="bm-phone-country-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code ${selected.dial}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected.dial}
      </button>
      {open ? (
        <ul className="bm-phone-country-list" role="listbox" aria-label="Country">
          {phoneCountries.map((country) => (
            <li key={country.iso}>
              <button
                type="button"
                role="option"
                aria-selected={country.iso === selected.iso}
                onClick={() => {
                  onChange(country.iso);
                  setOpen(false);
                }}
              >
                {country.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

const initialForm = {
  name: '',
  email: '',
  phone: '',
  helpWith: [],
  eventDetails: [],
};

export default function BookingForm() {
  const { content } = useSiteContent();
  const book = content.bookPage;
  const helpOptions = book.helpOptions;
  const eventDetailOptions = book.eventDetailOptions;

  const [form, setForm] = useState(initialForm);
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_PHONE_COUNTRY);
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
      setErrorMessage('Please select at least one option for How can I help? and Event Details.');
      return;
    }

    setStatus('sending');

    try {
      await submitBooking({
        ...form,
        phone: formatInternationalPhone(phoneCountry, form.phone),
      });

      setStatus('success');
      setForm(initialForm);
      setPhoneCountry(DEFAULT_PHONE_COUNTRY);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Unable to send. Please try again.');
    }
  };

  return (
    <div className="bm-contact bm-contact--form">
      <Link to="/#contact" className="bm-book-back">
        {book.backLinkLabel}
      </Link>
      <div className="bm-contact-inner">
        {status === 'success' ? (
          <div className="bm-book-thanks" role="status">
            <h2 className="bm-book-thanks-title">Thank you for your message</h2>
            <p className="bm-book-thanks-copy">
              Your booking request was sent. I&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
        <>
        <div className="bm-book-intro">
          <div className="bm-sec-header">
            <div className="bm-sec-title">{book.pageTitle}</div>
          </div>
        </div>

        <div className="bm-book-scroll-wrap">
          <div className="bm-book-scroll">
          <form className="bm-booking-form" onSubmit={handleSubmit} noValidate>
              <fieldset className="bm-form-section" aria-labelledby="booking-your-details">
                <h3 id="booking-your-details" className="bm-form-legend">{book.yourDetailsLegend}</h3>
                <div className="bm-form-group">
                  <label htmlFor="name">{book.nameLabel}</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder={book.namePlaceholder}
                    value={form.name}
                    onChange={update('name')}
                  />
                </div>
                <div className="bm-form-group">
                  <label htmlFor="email">{book.emailLabel}</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder={book.emailPlaceholder}
                    value={form.email}
                    onChange={update('email')}
                  />
                </div>
                <div className="bm-form-group">
                  <label htmlFor="phone">{book.phoneLabel}</label>
                  <div className="bm-phone-row">
                    <PhoneCountrySelect
                      value={phoneCountry}
                      onChange={setPhoneCountry}
                    />
                    <input
                      id="phone"
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel-national"
                      value={form.phone}
                      onChange={update('phone')}
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset className="bm-form-section" aria-labelledby="booking-help">
                <h3 id="booking-help" className="bm-form-legend">{book.helpLegend}</h3>
                <div className="bm-checkbox-group">
                  {helpOptions.map((option) => (
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
                <h3 id="booking-event-details" className="bm-form-legend">{book.eventLegend}</h3>
                <div className="bm-checkbox-group">
                  {eventDetailOptions.map((option) => (
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

              {status === 'error' ? (
                <p className="bm-form-error" role="alert">{errorMessage}</p>
              ) : null}

              <button
                type="submit"
                className="bm-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? book.submittingLabel : book.submitLabel}
              </button>

              <p className="bm-contact-privacy">
                {book.privacyNotice}
              </p>
          </form>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
