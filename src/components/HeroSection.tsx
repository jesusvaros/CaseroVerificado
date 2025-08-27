import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Casero Verificado</h1>
        <p className="mt-4 text-lg text-gray-600">
          Comparte y consulta experiencias reales de otros inquilinos.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

