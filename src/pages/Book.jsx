import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Section from '../components/Section';
import BookingForm from '../components/BookingForm';

export default function Book() {
  return (
    <div className="bm">
      <main className="bm-main">
        <Section className="bm-section--white bm-book-page">
          <Nav />
          <BookingForm />
        </Section>
        <Section className="bm-section--footer">
          <Footer />
        </Section>
      </main>
    </div>
  );
}
