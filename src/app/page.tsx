import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Events from '@/components/Events';
import BoardMembers from '@/components/BoardMembers';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <BoardMembers />
        <Events />
      </main>
      <Footer />
    </>
  );
}
