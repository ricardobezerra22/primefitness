import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Clock,
  Dumbbell as DumbBell,
  Users,
  Heart,
  Trophy,
  ChevronRight,
  ChevronDown,
  Check,
  Menu,
  X,
} from "lucide-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function App() {
  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Accordion state for "Why Choose Us" section
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors: {
      name?: string;
      email?: string;
      message?: string;
    } = {};

    if (!formData.name.trim()) {
      errors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email inválido";
    }

    if (!formData.message.trim()) {
      errors.message = "Mensagem é obrigatória";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus("submitting");

    try {
      // In a real application, you would send this data to your backend
      // For now, we'll simulate a successful submission after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form after successful submission
      setFormData({ name: "", email: "", message: "" });
      setFormStatus("success");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
    }
  };

  // Toggle accordion
  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Smooth scroll function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="bg-dark min-h-screen">
      {/* Header/Navigation */}
      <header className="py-4 px-6 md:px-12 bg-dark sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-light">
                PRIME<span className="text-primary">FITNESS</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#inicio"
                className="text-light-secondary hover:text-primary transition-colors nav-link"
                onClick={(e) => scrollToSection(e, "inicio")}
              >
                Início
              </a>
              <a
                href="#servicos"
                className="text-light-secondary hover:text-primary transition-colors nav-link"
                onClick={(e) => scrollToSection(e, "servicos")}
              >
                Serviços
              </a>
              <a
                href="#porque"
                className="text-light-secondary hover:text-primary transition-colors nav-link"
                onClick={(e) => scrollToSection(e, "porque")}
              >
                Por que nós
              </a>
              <a
                href="#planos"
                className="text-light-secondary hover:text-primary transition-colors nav-link"
                onClick={(e) => scrollToSection(e, "planos")}
              >
                Planos
              </a>
              <a
                href="#contato"
                className="text-light-secondary hover:text-primary transition-colors nav-link"
                onClick={(e) => scrollToSection(e, "contato")}
              >
                Contato
              </a>
              <a
                href="#contato"
                className="bg-primary text-light px-4 py-2 rounded-full transition-colors nav-button hover:bg-primary-dark"
                onClick={(e) => scrollToSection(e, "contato")}
              >
                Começar Agora
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-light"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                className="md:hidden mt-4 py-4 flex flex-col space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <a
                  href="#inicio"
                  className="text-light-secondary hover:text-primary transition-colors nav-link"
                  onClick={(e) => scrollToSection(e, "inicio")}
                >
                  Início
                </a>
                <a
                  href="#servicos"
                  className="text-light-secondary hover:text-primary transition-colors nav-link"
                  onClick={(e) => scrollToSection(e, "servicos")}
                >
                  Serviços
                </a>
                <a
                  href="#porque"
                  className="text-light-secondary hover:text-primary transition-colors nav-link"
                  onClick={(e) => scrollToSection(e, "porque")}
                >
                  Por que nós
                </a>
                <a
                  href="#planos"
                  className="text-light-secondary hover:text-primary transition-colors nav-link"
                  onClick={(e) => scrollToSection(e, "planos")}
                >
                  Planos
                </a>
                <a
                  href="#contato"
                  className="text-light-secondary hover:text-primary transition-colors nav-link"
                  onClick={(e) => scrollToSection(e, "contato")}
                >
                  Contato
                </a>
                <a
                  href="#contato"
                  className="bg-primary text-light px-4 py-2 rounded-full transition-colors inline-block text-center nav-button hover:bg-primary-dark"
                  onClick={(e) => scrollToSection(e, "contato")}
                >
                  Começar Agora
                </a>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative py-20 md:py-32 overflow-hidden bg-dark"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="z-10"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Supere Seus <span className="text-primary">Limites</span>{" "}
                Conosco
              </h1>
              <p className="text-light-secondary text-lg mb-8">
                Transforme sua vida com um programa exclusivo feito para você.
                Sua jornada para uma vida mais saudável e ativa começa aqui.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contato"
                  className="bg-primary hover:bg-primary-dark text-light px-6 py-3 rounded-full transition-all"
                  onClick={(e) => scrollToSection(e, "contato")}
                >
                  Começar Agora
                </a>
                <a
                  href="#servicos"
                  className="text-light border border-light/30 hover:border-primary hover:text-primary hover:shadow-md px-6 py-3 rounded-full transition-all"
                  onClick={(e) => scrollToSection(e, "servicos")}
                >
                  Saiba Mais
                </a>
              </div>

              <div className="flex items-center mt-8 space-x-4">
                <div className="flex -space-x-2">
                  <img
                    src="https://media.istockphoto.com/id/2061739174/pt/foto/portrait-senior-woman-beach-tennis.jpg?s=2048x2048&w=is&k=20&c=UTaBNKuATrGjrf9X_v1p-SHl0HerLLGqhGgx0Z8iXnI="
                    className="w-10 h-10 rounded-full border-2 border-dark"
                    alt="Member"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    className="w-10 h-10 rounded-full border-2 border-dark"
                    alt="Member"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    className="w-10 h-10 rounded-full border-2 border-dark"
                    alt="Member"
                  />
                </div>
                <div className="text-sm text-light-secondary">
                  <span className="text-primary font-semibold">+500</span>{" "}
                  pessoas já transformaram suas vidas
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="rounded-lg overflow-hidden w-full h-full max-h-[600px] relative">
                <iframe
                  src="https://www.youtube.com/embed/pJ0O3Yzv3Ck"
                  title="Fitness Training Video"
                  className="w-full h-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark to-transparent opacity-30 rounded-lg"></div>
            </motion.div>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
      </section>

      {/* Statistics Section */}
      <section id="estatisticas" className="py-16 bg-dark-surface">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SUA JORNADA FITNESS{" "}
              <span className="text-primary">COMEÇA AQUI</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="stats-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="stats-number">
                97<span className="text-white">%</span>
              </div>
              <p className="text-light-secondary font-medium mt-2">
                Taxa de Satisfação
              </p>
            </motion.div>

            <motion.div
              className="stats-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="stats-number">
                45<span className="text-white">+</span>
              </div>
              <p className="text-light-secondary font-medium mt-2">
                Tipos de Treinos
              </p>
            </motion.div>

            <motion.div
              className="stats-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="stats-number">
                250<span className="text-white">+</span>
              </div>
              <p className="text-light-secondary font-medium mt-2">
                Membros Ativos
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-dark">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              LIBERE SEU POTENCIAL:{" "}
              <span className="text-primary">SERVIÇOS FITNESS</span> FEITOS PARA
              VOCÊ
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-light-secondary max-w-3xl mx-auto">
              Nossos programas de treinamento são desenvolvidos para atender a
              todas as necessidades e objetivos, independentemente do seu nível
              de condicionamento físico.
            </p>
          </div>

          {/* Desktop Services Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <motion.div
              className="service-card overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                  alt="Treinamento Funcional"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  Treinamento Funcional
                </h3>
                <p className="text-light-secondary mb-4">
                  Exercícios que simulam movimentos do dia a dia para melhorar
                  força, equilíbrio e mobilidade.
                </p>
                <a
                  href="#contato"
                  className="flex items-center text-primary font-medium hover:text-primary-light transition-colors"
                >
                  Saiba Mais <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Service Card 2 */}
            <motion.div
              className="service-card overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg"
                  alt="Musculação"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Musculação</h3>
                <p className="text-light-secondary mb-4">
                  Programas personalizados para ganho de massa muscular,
                  definição e força com acompanhamento especializado.
                </p>
                <a
                  href="#contato"
                  className="flex items-center text-primary font-medium hover:text-primary-light transition-colors"
                >
                  Saiba Mais <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Service Card 3 */}
            <motion.div
              className="service-card overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/2158946649/pt/foto/above-view-of-athletic-women-exercising-on-yoga-class.jpg?s=2048x2048&w=is&k=20&c=PFpYf70sNhp_uE5i8yLpxa5qY6m_Lmv7WWAS6UAtJ6w="
                  alt="Aulas Coletivas"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Aulas Coletivas</h3>
                <p className="text-light-secondary mb-4">
                  Diversas modalidades como Spinning, Zumba, Pilates e HIIT para
                  treinar em grupo e manter a motivação.
                </p>
                <a
                  href="#contato"
                  className="flex items-center text-primary font-medium hover:text-primary-light transition-colors"
                >
                  Saiba Mais <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Mobile Services Carousel */}
          <div className="md:hidden mb-12">
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="services-swiper"
            >
              {/* Service Card 1 */}
              <SwiperSlide>
                <div className="service-card overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                      alt="Treinamento Funcional"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      Treinamento Funcional
                    </h3>
                    <p className="text-light-secondary mb-4">
                      Exercícios que simulam movimentos do dia a dia para melhorar
                      força, equilíbrio e mobilidade.
                    </p>
                    <a
                      href="#contato"
                      className="flex items-center text-primary font-medium hover:text-primary-light transition-colors"
                    >
                      Saiba Mais <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </SwiperSlide>

              {/* Service Card 2 */}
              <SwiperSlide>
                <div className="service-card overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1571019613454-b5ef050c2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                      alt="Musculação"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">Musculação</h3>
                    <p className="text-light-secondary mb-4">
                      Programas personalizados para ganho de massa muscular,
                      definição e força com acompanhamento especializado.
                    </p>
                    <a
                      href="#contato"
                      className="flex items-center text-primary font-medium hover:text-primary-light transition-colors"
                    >
                      Saiba Mais <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </SwiperSlide>

              {/* Service Card 3 */}
              <SwiperSlide>
                <div className="service-card overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1518611012118-6064e9370f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                      alt="Aulas Coletivas"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">Aulas Coletivas</h3>
                    <p className="text-light-secondary mb-4">
                      Diversas modalidades como Spinning, Zumba, Pilates e HIIT para
                      treinar em grupo e manter a motivação.
                    </p>
                    <a
                      href="#contato"
                      className="flex items-center text-primary font-medium hover:text-primary-light transition-colors"
                    >
                      Saiba Mais <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="text-center mt-12">
            <a
              href="#contato"
              className="bg-primary hover:bg-primary-dark text-light px-6 py-3 rounded-full transition-colors inline-block"
            >
              Ver Todos os Serviços
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="porque" className="py-20 bg-dark-surface">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  POR QUE NOS ESCOLHER PARA SUA{" "}
                  <span className="text-primary">JORNADA FITNESS</span>?
                </h2>
                <div className="w-20 h-1 bg-primary mb-6"></div>
                <p className="text-light-secondary mb-8">
                  Na Prime Fitness, acreditamos que cada pessoa tem potencial
                  para alcançar seus objetivos. Nosso compromisso é fornecer um
                  ambiente motivador e recursos de alta qualidade para ajudá-lo
                  a chegar lá.
                </p>
              </motion.div>

              {/* Accordion Items */}
              <div className="space-y-4">
                {/* Accordion Item 1 */}
                <motion.div
                  className="accordion-item bg-dark-surface-2 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="accordion-header flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleAccordion(0)}
                  >
                    <div className="flex items-center">
                      <Users className="text-primary mr-3 h-5 w-5" />
                      <h3 className="font-semibold">
                        Instrutores Qualificados
                      </h3>
                    </div>
                    <ChevronDown
                      className={`accordion-icon h-5 w-5 ${
                        activeAccordion === 0 ? "open" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`accordion-content px-4 pb-4 text-light-secondary ${
                      activeAccordion === 0 ? "open" : ""
                    }`}
                  >
                    Nossa equipe é formada por profissionais certificados e
                    experientes, dedicados a ajudar você a alcançar seus
                    objetivos com segurança e eficiência.
                  </div>
                </motion.div>

                {/* Accordion Item 2 */}
                <motion.div
                  className="accordion-item bg-dark-surface-2 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="accordion-header flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleAccordion(1)}
                  >
                    <div className="flex items-center">
                      <DumbBell className="text-primary mr-3 h-5 w-5" />
                      <h3 className="font-semibold">Equipamentos Modernos</h3>
                    </div>
                    <ChevronDown
                      className={`accordion-icon h-5 w-5 ${
                        activeAccordion === 1 ? "open" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`accordion-content px-4 pb-4 text-light-secondary ${
                      activeAccordion === 1 ? "open" : ""
                    }`}
                  >
                    Investimos em tecnologia de ponta para oferecer a melhor
                    experiência de treino. Nossos equipamentos são renovados
                    regularmente para garantir qualidade e segurança.
                  </div>
                </motion.div>

                {/* Accordion Item 3 */}
                <motion.div
                  className="accordion-item bg-dark-surface-2 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="accordion-header flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleAccordion(2)}
                  >
                    <div className="flex items-center">
                      <Heart className="text-primary mr-3 h-5 w-5" />
                      <h3 className="font-semibold">Ambiente Acolhedor</h3>
                    </div>
                    <ChevronDown
                      className={`accordion-icon h-5 w-5 ${
                        activeAccordion === 2 ? "open" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`accordion-content px-4 pb-4 text-light-secondary ${
                      activeAccordion === 2 ? "open" : ""
                    }`}
                  >
                    Criamos um espaço onde todos se sentem bem-vindos,
                    independentemente do nível de condicionamento físico. Nossa
                    comunidade é inclusiva e motivadora.
                  </div>
                </motion.div>

                {/* Accordion Item 4 */}
                <motion.div
                  className="accordion-item bg-dark-surface-2 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="accordion-header flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleAccordion(3)}
                  >
                    <div className="flex items-center">
                      <Trophy className="text-primary mr-3 h-5 w-5" />
                      <h3 className="font-semibold">Resultados Comprovados</h3>
                    </div>
                    <ChevronDown
                      className={`accordion-icon h-5 w-5 ${
                        activeAccordion === 3 ? "open" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`accordion-content px-4 pb-4 text-light-secondary ${
                      activeAccordion === 3 ? "open" : ""
                    }`}
                  >
                    Nossos métodos são baseados em ciência e comprovados por
                    milhares de clientes satisfeitos. Acompanhamos seu progresso
                    de perto para garantir resultados reais.
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://cdn.pixabay.com/photo/2022/01/06/09/43/woman-6919074_1280.jpg"
                alt="Fitness Training"
                className="rounded-lg object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-30 rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Operating Hours Section */}
      <section className="py-20 bg-dark">
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
                  className="text-4xl md:text-5xl font-bold mb-6 text-light"
                >
                  Com um Personal Trainer
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-light-secondary mb-6 text-lg"
                >
                  Na Prime Fitness, você não precisa agendar horário para
                  treinar. Nossos professores estão sempre disponíveis para
                  atendê-lo de perto, garantindo atendimento personalizado em
                  todos os momentos.
                </motion.p>
                <motion.ul variants={staggerChildren} className="space-y-4">
                  {[
                    "Atendimento individual ou em pequenos grupos",
                    "Professores especializados sempre disponíveis",
                    "Treinos atualizados mensalmente",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      variants={fadeIn}
                      className="flex items-center text-lg"
                    >
                      <ChevronRight className="text-primary mr-2" />
                      <span className="text-light-secondary">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-20 bg-dark">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ESCOLHA SEU <span className="text-primary">PLANO</span> E COMECE
              HOJE
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-light-secondary max-w-3xl mx-auto">
              Oferecemos planos flexíveis para atender às suas necessidades.
              Todos os planos incluem acesso a equipamentos de alta qualidade e
              suporte de instrutores qualificados.
            </p>
          </div>

          {/* Desktop Pricing Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {/* Basic Plan */}
            <motion.div
              className="pricing-card relative overflow-hidden bg-dark-surface rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2">Plano Básico</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">R$99</span>
                  <span className="text-light-secondary ml-2">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Acesso à academia
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Horário comercial
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Equipamentos básicos
                    </span>
                  </li>
                  <li className="flex items-start opacity-50">
                    <Check className="text-gray-500 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">Aulas em grupo</span>
                  </li>
                  <li className="flex items-start opacity-50">
                    <Check className="text-gray-500 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Avaliação física mensal
                    </span>
                  </li>
                </ul>
                <a
                  href="#contato"
                  className="block text-center py-3 px-6 bg-dark-surface-2 hover:bg-primary hover:text-light text-light rounded-full transition-colors duration-300"
                >
                  Escolher Plano
                </a>
              </div>
            </motion.div>

            {/* Premium Plan - Highlighted */}
            <motion.div
              className="pricing-card relative overflow-hidden bg-dark-surface rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 bg-primary text-light px-4 py-1 text-sm font-semibold">
                MAIS POPULAR
              </div>
              <div className="p-8 border-2 border-primary rounded-lg">
                <h3 className="text-xl font-bold mb-2">Plano Premium</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">R$149</span>
                  <span className="text-light-secondary ml-2">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Acesso ilimitado 24/7
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Todos os equipamentos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Aulas em grupo ilimitadas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Avaliação física mensal
                    </span>
                  </li>
                  <li className="flex items-start opacity-50">
                    <Check className="text-gray-500 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Treinador pessoal
                    </span>
                  </li>
                </ul>
                <a
                  href="#contato"
                  className="block text-center py-3 px-6 bg-primary hover:bg-primary-dark text-light rounded-full transition-colors duration-300"
                >
                  Escolher Plano
                </a>
              </div>
            </motion.div>

            {/* Elite Plan */}
            <motion.div
              className="pricing-card relative overflow-hidden bg-dark-surface rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2">Plano Elite</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">R$249</span>
                  <span className="text-light-secondary ml-2">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Acesso ilimitado 24/7
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Todos os equipamentos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Aulas em grupo ilimitadas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Avaliação física semanal
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="text-light-secondary">
                      Treinador pessoal (2x semana)
                    </span>
                  </li>
                </ul>
                <a
                  href="#contato"
                  className="block text-center py-3 px-6 bg-dark-surface-2 hover:bg-primary hover:text-light text-light rounded-full transition-colors duration-300"
                >
                  Escolher Plano
                </a>
              </div>
            </motion.div>
          </div>

          {/* Mobile Pricing Carousel */}
          <div className="md:hidden mb-12">
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="pricing-swiper"
            >
              {/* Basic Plan */}
              <SwiperSlide>
                <div className="pricing-card relative overflow-hidden bg-dark-surface rounded-lg shadow-lg">
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-2">Plano Básico</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold">R$99</span>
                      <span className="text-light-secondary ml-2">/mês</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Acesso à academia
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Horário comercial
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Equipamentos básicos
                        </span>
                      </li>
                      <li className="flex items-start opacity-50">
                        <Check className="text-gray-500 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">Aulas em grupo</span>
                      </li>
                      <li className="flex items-start opacity-50">
                        <Check className="text-gray-500 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Avaliação física mensal
                        </span>
                      </li>
                    </ul>
                    <a
                      href="#contato"
                      className="block text-center py-3 px-6 bg-dark-surface-2 hover:bg-primary hover:text-light text-light rounded-full transition-colors duration-300"
                    >
                      Escolher Plano
                    </a>
                  </div>
                </div>
              </SwiperSlide>

              {/* Premium Plan */}
              <SwiperSlide>
                <div className="pricing-card relative overflow-hidden bg-dark-surface rounded-lg shadow-lg">
                  <div className="absolute top-0 right-0 bg-primary text-light px-4 py-1 text-sm font-semibold">
                    MAIS POPULAR
                  </div>
                  <div className="p-8 border-2 border-primary rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Plano Premium</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold">R$149</span>
                      <span className="text-light-secondary ml-2">/mês</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Acesso ilimitado 24/7
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Todos os equipamentos
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Aulas em grupo ilimitadas
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Avaliação física mensal
                        </span>
                      </li>
                      <li className="flex items-start opacity-50">
                        <Check className="text-gray-500 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Treinador pessoal
                        </span>
                      </li>
                    </ul>
                    <a
                      href="#contato"
                      className="block text-center py-3 px-6 bg-primary hover:bg-primary-dark text-light rounded-full transition-colors duration-300"
                    >
                      Escolher Plano
                    </a>
                  </div>
                </div>
              </SwiperSlide>

              {/* Elite Plan */}
              <SwiperSlide>
                <div className="pricing-card relative overflow-hidden bg-dark-surface rounded-lg shadow-lg">
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-2">Plano Elite</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold">R$249</span>
                      <span className="text-light-secondary ml-2">/mês</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Acesso ilimitado 24/7
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Todos os equipamentos
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Aulas em grupo ilimitadas
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Avaliação física semanal
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-light-secondary">
                          Treinador pessoal (2x semana)
                        </span>
                      </li>
                    </ul>
                    <a
                      href="#contato"
                      className="block text-center py-3 px-6 bg-dark-surface-2 hover:bg-primary hover:text-light text-light rounded-full transition-colors duration-300"
                    >
                      Escolher Plano
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="text-center mt-12">
            <p className="text-light-secondary mb-6">
              Não encontrou o plano ideal para você? Entre em contato para
              discutirmos opções personalizadas.
            </p>
            <a
              href="#contato"
              className="bg-primary hover:bg-primary-dark text-light px-6 py-3 rounded-full transition-colors duration-300 inline-block"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 text-light"
            >
              Entre em Contato
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-light-secondary text-xl"
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
                className="flex items-start"
              >
                <Clock className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    Horário de Funcionamento
                  </h3>
                  <div className="text-light-secondary grid grid-cols-2 gap-x-6 gap-y-2">
                    <div className="font-semibold">Segunda à Sexta:</div>
                    <div>
                      <div>06h00 - 13h00</div>
                      <div>14h00 - 21h00</div>
                    </div>
                    <div className="col-span-2 text-sm italic mb-3">
                      (Fechamos para almoço das 13h às 14h)
                    </div>

                    <div className="font-semibold">Sábados:</div>
                    <div>08h00 - 12h00</div>

                    <div className="font-semibold mt-2">Domingos:</div>
                    <div className="mt-2">Fechado</div>
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
                <Phone className="w-6 h-6 mr-4 text-primary" />
                <div>
                  <h3 className="font-semibold">Telefone</h3>
                  <p className="text-light-secondary">(81) 3719-2833</p>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark-surface rounded-lg p-8"
            >
              {formStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <h3 className="text-light text-2xl font-bold mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-light-secondary">
                    Entraremos em contato em breve.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="mt-6 bg-primary hover:bg-primary-dark text-light py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-light-secondary font-medium mb-1"
                    >
                      Nome
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded border bg-neutral text-dark-contrast focus:outline-none focus:ring-2 focus:ring-primary ${
                        formErrors.name
                          ? "border-red-500"
                          : "border-soft-highlight"
                      }`}
                      placeholder="Seu nome"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-light-secondary font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded border bg-neutral text-dark-contrast focus:outline-none focus:ring-2 focus:ring-primary ${
                        formErrors.email
                          ? "border-red-500"
                          : "border-soft-highlight"
                      }`}
                      placeholder="Seu email"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-light-secondary font-medium mb-1"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-2 rounded border bg-neutral text-dark-contrast focus:outline-none focus:ring-2 focus:ring-primary ${
                        formErrors.message
                          ? "border-red-500"
                          : "border-soft-highlight"
                      }`}
                      placeholder="Sua mensagem"
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.message}
                      </p>
                    )}
                  </div>
                  <motion.button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className={`w-full bg-primary hover:bg-primary-dark text-light py-3 rounded-lg transition-colors duration-300 ${
                      formStatus === "submitting"
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    }`}
                    whileHover={{
                      scale: formStatus !== "submitting" ? 1.02 : 1,
                    }}
                    whileTap={{ scale: formStatus !== "submitting" ? 0.98 : 1 }}
                  >
                    {formStatus === "submitting" ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-light"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      "Agendar Avaliação Gratuita"
                    )}
                  </motion.button>
                  {formStatus === "error" && (
                    <p className="text-red-500 text-center mt-2">
                      Ocorreu um erro ao enviar sua mensagem. Por favor, tente
                      novamente.
                    </p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/558182010150"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary-dark text-light p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-6 h-6 fill-current"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </motion.a>
    </div>
  );
}

export default App;
