import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Events from '@/components/Events';
import BoardMembers from '@/components/BoardMembers';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';

export default function Home() {
  return (
    <>
      <StructuredData type="organization" />
      <StructuredData type="webpage" data={{
        title: 'Adelphi AI Society - Empowering Minds, Shaping Futures',
        description: 'Join Adelphi University\'s premier artificial intelligence society. Explore AI through workshops, hackathons, guest speakers, and hands-on learning experiences.'
      }} />
      <NavBar />
      <main className="relative">
        <Hero />
        <BoardMembers />
        <Events />
      </main>
      <Footer />
    </>
  );
}
