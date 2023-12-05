import React from 'react'

const Favoritos = () => {
  return (
    <div className="bg-slate-200">
      <div className=" bg-slate-200">
        <div className="relative">
          <img
            className="w-full h-80 object-cover"
            src='/public/puente-fav.jpg'
            alt='Banner'
          />
          <div class="absolute top-1/2 left-60 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <h1 class="text-6xl font-bold">Mis favoritos</h1>
          </div>
        </div>
      </div>
      </div>

  );
};

export default Favoritos