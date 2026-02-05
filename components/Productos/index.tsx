

export default function Productos() {
  return (
    <div className="bg-white p-4">
        <div className="mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-6 sm:mb-8">Catálogo de productos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-3">
              <a href="javascript:void(0)" className="block">
                <div className="aspect-[12/11] bg-gray-100 rounded-lg p-4">
                  <img src="https://promart.vteximg.com.br/arquivos/ids/8118139-700-700/107418.jpg?v=638610998903230000" alt="Product 1"
                    className="w-full h-full object-contain" />
                </div>

                <div className="flex gap-2 mt-4">
                  <h5 className="text-base font-semibold text-slate-900">Sika Impermur</h5>
                  <h6 className="text-base text-slate-900 font-bold ml-auto">$10.00</h6>
                </div>
                <p className="text-slate-600 text-[13px] mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </a>
              <div className="flex items-center gap-2 mt-6">
                <div
                  className="bg-pink-200 hover:bg-pink-300 w-12 h-9 flex items-center justify-center rounded-lg cursor-pointer" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-pink-600 inline-block" viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
                <button type="button" className="text-sm px-2 py-2 font-medium cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide ml-auto outline-none border-none rounded-lg">Agregar</button>
              </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-3">
              <a href="javascript:void(0)" className="block">
                <div className="aspect-[12/11] bg-gray-100 rounded-lg p-4">
                  <img src="https://ferreteriadinova.com/wp-content/uploads/2023/09/CEMEN-EXTRAFORTE.jpeg" alt="Product 2"
                    className="w-full h-full object-contain" />
                </div>

                <div className="flex gap-2 mt-4">
                  <h5 className="text-base font-semibold text-slate-900">Cemento Extraforte</h5>
                  <h6 className="text-base text-slate-900 font-bold ml-auto">$12.00</h6>
                </div>
                <p className="text-slate-600 text-[13px] mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </a>
              <div className="flex items-center gap-2 mt-6">
                <div
                  className="bg-pink-200 hover:bg-pink-300 w-12 h-9 flex items-center justify-center rounded-lg cursor-pointer" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-pink-600 inline-block" viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
                <button type="button" className="text-sm px-2 py-2 font-medium cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide ml-auto outline-none border-none rounded-lg">Agregar</button>
              </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-3">
              <a href="javascript:void(0)" className="block">
                <div className="aspect-[12/11] bg-gray-100 rounded-lg p-4">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp4NaP2LiZtUH2DHpINacDI5974lz1Zu8j-Q&s" alt="Product 3"
                    className="w-full h-full object-contain" />
                </div>

                <div className="flex gap-2 mt-4">
                  <h5 className="text-base font-semibold text-slate-900">Cemento mochica</h5>
                  <h6 className="text-base text-slate-900 font-bold ml-auto">$14.00</h6>
                </div>
                <p className="text-slate-600 text-[13px] mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </a>
              <div className="flex items-center gap-2 mt-6">
                <div
                  className="bg-pink-200 hover:bg-pink-300 w-12 h-9 flex items-center justify-center rounded-lg cursor-pointer" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-pink-600 inline-block" viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
                <button type="button" className="text-sm px-2 py-2 font-medium cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide ml-auto outline-none border-none rounded-lg">Agregar</button>
              </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-3">
              <a href="javascript:void(0)" className="block">
                <div className="aspect-[12/11] bg-gray-100 rounded-lg p-4">
                  <img src="https://d34fyu2ua7aizz.cloudfront.net/images/product/8/large/ts_image_5d164630b43bf4_16775386.jpg" alt="Product 3"
                    className="w-full h-full object-contain" />
                </div>

                <div className="flex gap-2 mt-4">
                  <h5 className="text-base font-semibold text-slate-900">Cemento tipo 1</h5>
                  <h6 className="text-base text-slate-900 font-bold ml-auto">$12.00</h6>
                </div>
                <p className="text-slate-600 text-[13px] mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </a>
              <div className="flex items-center gap-2 mt-6">
                <div
                  className="bg-pink-200 hover:bg-pink-300 w-12 h-9 flex items-center justify-center rounded-lg cursor-pointer" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-pink-600 inline-block" viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
                <button type="button" className="text-sm px-2 py-2 font-medium cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide ml-auto outline-none border-none rounded-lg">Agregar</button>
              </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-3">
              <a href="javascript:void(0)" className="block">
                <div className="aspect-[12/11] bg-gray-100 rounded-lg p-4">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHE10nnA-l3uYYGnHWvdOEXiEnOh-hPZFwEQ&s" alt="Product 3"
                    className="w-full h-full object-contain" />
                </div>

                <div className="flex gap-2 mt-4">
                  <h5 className="text-base font-semibold text-slate-900">Tubo cuadrado 2.0*2.0mm*6mt</h5>
                  <h6 className="text-base text-slate-900 font-bold ml-auto">$15.00</h6>
                </div>
                <p className="text-slate-600 text-[13px] mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </a>
              <div className="flex items-center gap-2 mt-6">
                <div
                  className="bg-pink-200 hover:bg-pink-300 w-12 h-9 flex items-center justify-center rounded-lg cursor-pointer" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-pink-600 inline-block" viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
                <button type="button" className="text-sm px-2 py-2 font-medium cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide ml-auto outline-none border-none rounded-lg">Agregar</button>
              </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-3">
              <a href="javascript:void(0)" className="block">
                <div className="aspect-[12/11] bg-gray-100 rounded-lg p-4">
                  <img src="https://ferreteriadinova.com/wp-content/uploads/2025/09/CALAMINA-PREPINTADA-ROJO.jpeg" alt="Product 3"
                    className="w-full h-full object-contain" />
                </div>

                <div className="flex gap-2 mt-4">
                  <h5 className="text-base font-semibold text-slate-900">Calamina roja 0.3x0.8x3.60</h5>
                  <h6 className="text-base text-slate-900 font-bold ml-auto">$16.00</h6>
                </div>
                <p className="text-slate-600 text-[13px] mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </a>
              <div className="flex items-center gap-2 mt-6">
                <div
                  className="bg-pink-200 hover:bg-pink-300 w-12 h-9 flex items-center justify-center rounded-lg cursor-pointer" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-pink-600 inline-block" viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
                <button type="button" className="text-sm px-2 py-2 font-medium cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide ml-auto outline-none border-none rounded-lg">Agregar</button>
              </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-3">
              <a href="javascript:void(0)" className="block">
                <div className="aspect-[12/11] bg-gray-100 rounded-lg p-4">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwzNXR7unqfsAqha7psfPwfyvZpvvz6UTwyQ&s" alt="Product 3"
                    className="w-full h-full object-contain" />
                </div>

                <div className="flex gap-2 mt-4">
                  <h5 className="text-base font-semibold text-slate-900">Teja andina</h5>
                  <h6 className="text-base text-slate-900 font-bold ml-auto">$12.00</h6>
                </div>
                <p className="text-slate-600 text-[13px] mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </a>
              <div className="flex items-center gap-2 mt-6">
                <div
                  className="bg-pink-200 hover:bg-pink-300 w-12 h-9 flex items-center justify-center rounded-lg cursor-pointer" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-pink-600 inline-block" viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
                <button type="button" className="text-sm px-2 py-2 font-medium cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide ml-auto outline-none border-none rounded-lg">Agregar</button>
              </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-3">
              <a href="javascript:void(0)" className="block">
                <div className="aspect-[12/11] bg-gray-100 rounded-lg p-4">
                  <img src="https://media.falabella.com/sodimacPE/211230_01/w=800,h=800,fit=pad" alt="Product 3"
                    className="w-full h-full object-contain" />
                </div>

                <div className="flex gap-2 mt-4">
                  <h5 className="text-base font-semibold text-slate-900">Fierro de 1/2</h5>
                  <h6 className="text-base text-slate-900 font-bold ml-auto">$11.00</h6>
                </div>
                <p className="text-slate-600 text-[13px] mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </a>
              <div className="flex items-center gap-2 mt-6">
                <div
                  className="bg-pink-200 hover:bg-pink-300 w-12 h-9 flex items-center justify-center rounded-lg cursor-pointer" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-pink-600 inline-block" viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
                <button type="button" className="text-sm px-2 py-2 font-medium cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide ml-auto outline-none border-none rounded-lg">Agregar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
