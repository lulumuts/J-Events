import Section from '../components/Section';
import BookingForm from '../components/BookingForm';

export default function Book() {
  return (
    <div className="bm">
      <main className="bm-main">
        <Section className="bm-section--white bm-book-page">
          <BookingForm />
        </Section>
      </main>
    </div>
  );
}
