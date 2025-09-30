import lampu from '../../assets/lampu.png';
import hiasanKoran from '../../assets/hiasan-koran.png';
import hiasan from '../../assets/hiasan.png';
import orangNikah1 from '../../assets/orang-nikah.svg';
import orangNikah2 from '../../assets/orang-nikah2.svg';
import orangNikah3 from '../../assets/orang-nikah3.svg';
import Navbar from './components/Navbar';
import Services from './components/Service';

const Home = () => {
  const handleOrder = () => {
    const email = 'rizalinggar19@gmail.com';
    const subject = 'Order Wedding Service';
    const body =
      'Hello, I would like to order your CATERING service.\n\nPlease send me more information about:\n- Pricing\n- Available packages\n- Requirements\n\nThank you.';

    // Langsung buka Gmail compose
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, '_blank');
  };
  return (
    <div className="mx-auto bg-[#F5F0ED] flex flex-col " id="about">
      {/* Navbar Section */}
      <Navbar />
      {/* Hero Content */}
      <section className="flex-1 relative flex flex-col items-center justify-center text-center px-6 py-12">
        {/* Hiasan kiri */}
        <img
          src={lampu}
          alt="hiasan kiri"
          className="absolute top-0 left-6 w-20 md:w-24 z-1"
        />
        <img
          src={lampu}
          alt="hiasan kiri"
          className="absolute top-0 left-32 w-20 md:w-12 z-1"
        />
        <img
          src={hiasanKoran}
          alt="hiasan kiri 2"
          className="absolute top-0 left-0 w-24 md:w-96"
        />

        {/* Hiasan kanan */}
        <img
          src={hiasan}
          alt="hiasan kanan"
          className="absolute top-0 right-0 w-28 md:w-80"
        />

        {/* Text */}
        <h1 className="text-2xl md:text-3xl font-bold text-pink-600 mb-2 ">
          Undangan Pernikahan Digital <br />
          Wedding Planner (Soon) – Invitation
        </h1>
        <p className="text-gray-700 mb-6 max-w-2xl font-bold">
          Undangan Pernikahan Digital Wedding Planner (Soon) – Invitation
        </p>
        <button onClick={handleOrder} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg shadow">
          Coba Sekarang
        </button>

        {/* Foto pasangan */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <img
            src={orangNikah1}
            alt="Pasangan 1"
            className="rounded-2xl object-cover h-96 w-full"
          />
          <img
            src={orangNikah2}
            alt="Pasangan 2"
            className="rounded-2xl object-cover h-80 w-full"
          />
          <img
            src={orangNikah3}
            alt="Pasangan 3"
            className="rounded-2xl object-cover h-96 w-full"
          />
        </div>
      </section>
      <Services />
    </div>
  );
};

export default Home;
