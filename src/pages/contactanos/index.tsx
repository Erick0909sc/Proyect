import Layout from "@/components/Layout/Layout";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Foto1 from "@/assets/pictures/1o.jpg";
import Foto2 from "@/assets/pictures/2o.jpg";
import Foto3 from "@/assets/pictures/3o.jpg";
import Foto4 from "@/assets/pictures/4o.jpg";
import Image from "next/image";

type Props = {
  frameborder: string;
};

const Contactanos = (props: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    AOS.init({
      duration: 2000, // Duración de las animaciones en milisegundos
      offset: 100, // Desplazamiento en píxeles desde el borde superior del elemento para activar la animación
    });
  }, []); // Asegúrate de ejecutar esto solo una vez después del montaje del componente

  return (
    <Layout title="Inicio">
      <div className="flex items-center justify-center mt-6">
        <section className="bg-white " data-aos="fade-up">
          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="font-light text-black sm:text-lg ">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray">
                Sobre Nosotros
              </h2>
              <p className="mb-4">
                Fundado en Tambogrande, Piura por Alexander Liviapoma en el
                2010. Es la principal distribuidora de Sider Perú y Cemento
                Pacasmayo. Mantiene precios mínimos para los pequeños
                comerciantes con la visión Creces tú, Camino Yo.
              </p>
              <p>
                En el 2015 logra su segundo local que funciona como almacén de
                despacho al por mayor, al lograr posicionarse como una empresa
                líder en la comercialización y distribución de productos de
                materiales de construcción. Organiza capacitaciones con el
                objetivo de actualizar y certificar a los maestros constructores
                de la zona y público en general.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Image className="w-full rounded-lg" src={Foto1} alt="1" />
              <Image
                className="mt-4 w-full lg:mt-10 rounded-lg"
                src={Foto4}
                alt="2"
              />
            </div>
          </div>
        </section>
      </div>
      <section
        className="flex flex-wrap items-center justify-center mt-6 gap-16 xs:gap-40"
        data-aoImage
      >
        <div className="block max-w-[24rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <Image className="rounded-t-lg" src={Foto2} alt="" />
          </div>
          <div className="p-6">
            <p className="text-base text-black font-bold">Vison</p>
            <p className="text-base text-black">
              Nos visualizamos como la fuerza impulsora detrás del crecimiento y
              desarrollo de la industria de la construcción en Tambogrande,
              Piura y más allá. Ser reconocidos como el socio confiable y líder
              en la distribución de materiales de construcción, fomentando el
              crecimiento de nuestros clientes mientras trascendemos juntos a
              los desafíos del sector.
            </p>
          </div>
        </div>
        <div className="block max-w-[24rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <Image className="rounded-t-lg" src={Foto3} alt="" />
          </div>
          <div className="p-6">
            <p className="text-base text-black font-bold">Mision</p>
            <p className="text-base text-black">
              Impulsamos el éxito de nuestros clientes y el desarrollo
              constructivo en la región al proporcionar productos de calidad a
              precios accesibles desde proveedores confiables. Respaldamos
              proyectos y la formación de maestros constructores mediante
              servicios excepcionales y herramientas especializadas,
              contribuyendo al crecimiento sostenible. Al trabajar en conjunto,
              cultivamos vínculos estrechos y dinamizamos el progreso de nuestra
              comunidad local.
            </p>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center bottom-1">
        <section className="bg-white mt-10 " data-aos="fade-up">
          <div className="container px-6 py-12 mx-auto">
            <div>
              <p className="font-medium text-black">Contactanos</p>

              <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl ">
                Ferreteria Liviapoma
              </h1>

              <p className="mt-3 text-gray-800 ">
                
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </span>

                  <h2 className="mt-4 text-base font-medium text-gray-800">
                    Email
                  </h2>
                  <p className="mt-2 text-sm text-black">
                    Envias tus dudas y sugerencias
                  </p>
                  <p className="mt-2 text-sm text-blue-500 ">
                    ferretería@gmail.com
                  </p>
                </div>

                <div>
                  <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </span>

                  <h2 className="mt-4 text-base font-medium text-gray-800">
                    Ubicanos
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Nos Ubicamos en :
                  </p>
                  <p className="mt-2 text-sm text-blue-500 ">
                    JR TUMBES MZA A LTE 8 A.H. BUENOS AIRES (FRENTE AL MERCADO)
                  </p>
                  <p className="mt-2 text-sm text-black font-bold ">
                    Tambogrande-Piura
                  </p>
                </div>

                <div>
                  <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </span>

                  <h2 className="mt-4 text-base font-medium text-gray-800 ">
                    Telefono
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 ">
                    Lun-Vier de 8am a 5pm.
                  </p>
                  <p className="mt-2 text-sm text-blue-500 ">
                    +(51) 999 999 999
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
                <iframe
                  width="100%"
                  height="100%"
                  title="map"
                  marginHeight={0}
                  marginWidth={0}
                  scrolling="no"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2810.806163493557!2d-80.34233080517421!3d-4.926244160107845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9035893e31e35f91%3A0x5f0a2b0427668629!2sFerreter%C3%ADa%20Liviapoma!5e0!3m2!1ses!2spe!4v1697480540633!5m2!1ses!2spe`}
                  frameBorder={0}
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contactanos;