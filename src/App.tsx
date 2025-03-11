import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Clock, Dumbbell as DumbBell, Users, Heart, Trophy, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

function App() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const testimonials = [
    {
      name: "João Silva",
      text: "Encontrei na Prime Fitness o ambiente perfeito para alcançar meus objetivos. O atendimento personalizado faz toda a diferença!",
      image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Maria Santos",
      text: "Os treinos diversificados mantêm a motivação sempre em alta. Cada dia é uma nova experiência!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Pedro Costa",
      text: "A combinação de diferentes modalidades tornou meus treinos muito mais eficientes e prazerosos.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/855828/855828-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-white px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">PRIME FITNESS</h1>
            <p className="text-xl md:text-2xl mb-4">Transforme sua vida com um programa exclusivo feito para você</p>
            <p className="text-lg md:text-xl mb-8 text-terracotta-200">Sua jornada para uma vida mais saudável e ativa começa aqui</p>
            <motion.a 
              href="#contato" 
              className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agende sua Aula Experimental Gratuita
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 bg-terracotta-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold mb-8 text-terracotta-800"
            >
              Depoimentos
            </motion.h2>
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              navigation={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="mySwiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index} className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-terracotta-800 mb-2">{testimonial.name}</h3>
                  <p className="text-gray-600 italic">{testimonial.text}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold mb-4 text-terracotta-800"
            >
              Por que escolher a Prime Fitness?
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="text-xl text-terracotta-600 max-w-2xl mx-auto"
            >
              Descubra um novo conceito em treinamento personalizado
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeIn}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-terracotta-600 transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <DumbBell className="w-16 h-16 mb-6 text-terracotta-600 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-4 text-terracotta-800">Atendimento Personalizado</h3>
              <p className="text-gray-600 leading-relaxed">No primeiro contato, realizamos uma avaliação física completa para entender seus objetivos e preferências.</p>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-terracotta-600 transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <Users className="w-16 h-16 mb-6 text-terracotta-600 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-4 text-terracotta-800">Mix de Atividades</h3>
              <p className="text-gray-600 leading-relaxed">Combinamos musculação, pilates, boxe, treinamento funcional e mobilidade articular em seu treino.</p>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-terracotta-600 transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <Heart className="w-16 h-16 mb-6 text-terracotta-600 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-4 text-terracotta-800">Treinos Dinâmicos</h3>
              <p className="text-gray-600 leading-relaxed">Atualizamos seu treino mensalmente para maximizar resultados e manter a motivação.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-terracotta-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1579126038374-6064e9370f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                className="rounded-lg shadow-xl"
                alt="Academia"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
              >
                <motion.h2 
                  variants={fadeIn}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  Como um Personal Trainer
                </motion.h2>
                <motion.p 
                  variants={fadeIn}
                  className="text-terracotta-100 mb-6 text-lg"
                >
                  Na Prime Fitness, você não precisa agendar horário para treinar. 
                  Nossos professores estão sempre disponíveis para atendê-lo de perto, 
                  garantindo atenção personalizada em todos os momentos.
                </motion.p>
                <motion.ul variants={staggerChildren} className="space-y-4">
                  {[
                    "Atendimento individual ou em pequenos grupos",
                    "Professores especializados sempre disponíveis",
                    "Treinos atualizados mensalmente"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      variants={fadeIn}
                      className="flex items-center text-lg"
                    >
                      <ChevronRight className="text-terracotta-300 mr-2" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-terracotta-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Entre em Contato
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-terracotta-100 text-xl"
            >
              Comece sua transformação hoje mesmo
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <Clock className="w-6 h-6 mr-4 text-terracotta-300" />
                <div>
                  <h3 className="font-semibold">Horário de Funcionamento</h3>
                  <div className="text-terracotta-100">
                    <p className="font-semibold text-terracotta-300">Segunda à Sexta:</p>
                    <p>06h00 - 13h00</p>
                    <p>14h00 - 21h00</p>
                    <p className="text-sm text-terracotta-300">(Fechamos para almoço das 13h às 14h)</p>
                    <p className="mt-2 font-semibold text-terracotta-300">Sábados:</p>
                    <p>08h00 - 12h00</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center"
              >
                <Phone className="w-6 h-6 mr-4 text-terracotta-300" />
                <div>
                  <h3 className="font-semibold">Telefone</h3>
                  <p className="text-terracotta-100">(81) 3719-2833</p>
                </div>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8"
            >
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-terracotta-600"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-terracotta-600"
                />
                <textarea
                  placeholder="Mensagem"
                  rows={4}
                  className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-terracotta-600"
                ></textarea>
                <motion.button
                  type="submit"
                  className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white py-3 rounded-lg transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Agendar Avaliação Gratuita
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/558137192833"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-current">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </motion.a>
    </div>
  );
}

export default App;