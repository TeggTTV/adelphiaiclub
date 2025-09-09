import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import BoardMembers from '@/components/BoardMembers';
import Events from '@/components/Events';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <Hero />
      <BoardMembers />
      <Events />
      <Footer />
    </main>
  );
}
