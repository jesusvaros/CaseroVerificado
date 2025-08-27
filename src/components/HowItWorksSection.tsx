import React from 'react';
import { MagnifyingGlassIcon, PencilSquareIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Busca la dirección',
    description: 'Encuentra el inmueble que quieres evaluar.',
    icon: MagnifyingGlassIcon,
  },
  {
    title: 'Comparte tu experiencia',
    description: 'Escribe una reseña anónima sobre tu casero.',
    icon: PencilSquareIcon,
  },
  {
    title: 'Ayuda a otros inquilinos',
    description: 'Contribuye a un mercado de alquiler más transparente.',
    icon: GlobeAltIcon,
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="mb-12 text-3xl font-bold">¿Cómo funciona?</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F97316] text-white">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

