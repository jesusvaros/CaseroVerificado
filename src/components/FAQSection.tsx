import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../i18n/useTranslations';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

  const FAQItem = ({ question, answer, index }: FAQItemProps) => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((prev) => !prev);
    const panelId = `faq-panel-${index}`;
    const buttonId = `faq-button-${index}`;

    return (
      <div className="border-b">
        <h3>
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={toggle}
            className="flex w-full items-center justify-between py-4 text-left text-lg font-medium focus:outline-none"
          >
            {question}
            <span
              className={`ml-2 transition-transform ${open ? 'rotate-45' : 'rotate-0'}`}
            >
              +
            </span>
          </button>
        </h3>
        <motion.div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="pb-4">
            <p className="text-base text-gray-700">{answer}</p>
          </div>
        </motion.div>
      </div>
    );
  };

  const FAQSection = () => {
    const { t } = useTranslations();
    const faqs = [
      {
        question: t('home.faq.q1'),
        answer: t('home.faq.a1'),
      },
      {
        question: t('home.faq.q2'),
        answer: t('home.faq.a2'),
      },
      {
        question: t('home.faq.q3'),
        answer: t('home.faq.a3'),
      },
      {
        question: t('home.faq.q4'),
        answer: t('home.faq.a4'),
      },
      {
        question: t('home.faq.q5'),
        answer: t('home.faq.a5'),
      },
    ];

    return (
      <section className="w-full bg-gradient-to-b from-white to-green-50 py-12">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-left text-3xl font-bold">{t('home.faq.title')}</h2>
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <FAQItem key={item.question} index={idx} {...item} />
            ))}
          </div>
        </div>
      </section>
    );
  };

export default FAQSection;
