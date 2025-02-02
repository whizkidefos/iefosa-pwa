"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ui/contact-form';
import { toast } from 'sonner';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section py-20 px-4 md:px-8 bg-muted/50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
          <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </motion.div>
      </div>
    </section>
  );
}