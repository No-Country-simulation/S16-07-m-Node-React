const Footer = () => {
  return (
    <div className="footer">
      <div className="footer mx-auto flex w-full justify-center pb-3 pt-9 text-lg sm:gap-[200px] lg:gap-[400px] xl:gap-[600px]">
        <div className="flex">
          <div className="columna1">
            <h3 className="pb-3 font-bold underline underline-offset-2">
              Menú
            </h3>
            <div className="flex">
              <img src="./Vector.svg" alt="icono" className="pb-3" />
              <ul className="pb-3 pl-2">Servicios</ul>
            </div>
            <div className="flex">
              <img src="./Vector.svg" alt="icono" className="pb-3" />
              <ul className="pb-3 pl-2">Sobre Nosotros</ul>
            </div>
            <div className="flex">
              <img src="./Vector.svg" alt="icono" className="pb-3" />
              <ul className="pb-3 pl-2">Contacto</ul>
            </div>
          </div>

          <div className="columna2 ps-[60px]">
            <h3 className="pb-3 font-bold underline underline-offset-2">
              Información legal
            </h3>
            <div className="flex pl-2">
              <img src="./Vector.svg" alt="icono" className="pb-3" />
              <ul className="pb-3 pl-2">Aviso legal</ul>
            </div>
            <div className="flex pl-2">
              <img src="./Vector.svg" alt="icono" className="pb-3" />
              <ul className="pb-3 pl-2">Política de privacidad</ul>
            </div>
            <div className="flex pl-2">
              <img src="./Vector.svg" alt="icono" className="pb-3" />
              <ul className="pb-3 pl-2">Términos y condiciones</ul>
            </div>
          </div>
        </div>

        <div className="pt-12">
          <img
            src="./support_agent.svg"
            alt="Suport agent"
            className="h-[70px] w-[70px] rounded-full bg-[#F5ECD7] px-3 py-3"
          />
        </div>
      </div>

      {/*redes*/}
      <div className="footer redes px-4 py-3">
        <div className="flex flex-col items-center justify-center gap-10 px-8 sm:flex-row">
          <div>
            <img src="./Union.svg" alt="logo" className="h-[35px] w-[150px]" />
          </div>
          <div className="flex gap-2">
            <img src="./redes1.svg" alt="instagram" />
            <img src="./redes2.svg" alt="x" />
            <img src="./redes3.svg" alt="youtube" />
            <img src="./redes4.svg" alt="facebook" />
            <img src="./redes5.svg" alt="linkedin" />
          </div>
        </div>
        <div className="p-2 text-center text-sm">
          <div className="flex justify-center pt-3">
            <img
              src="./ph_copyright-bold.svg"
              alt="copyright"
              className="w-[20px]"
            />
            <p className="">2024 creado por GoEvent</p>
          </div>
          <p>-información adicional</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
