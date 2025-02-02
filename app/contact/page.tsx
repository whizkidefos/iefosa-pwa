"use client";

import { Canvas } from '@react-three/fiber';
import { ContactForm } from '@/components/sections/contact-form';
import { ContactHero } from '@/components/sections/contact-hero';
import { FloatingParticles } from '@/components/three/floating-particles';
import Footer from '@/components/sections/footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <section className="min-h-[40vh] relative overflow-hidden pt-32">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <FloatingParticles />
          </Canvas>
        </div>
        <ContactHero />
      </section>
      
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="bg-card rounded-xl border p-8 space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-muted-foreground">
                  Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Email</h4>
                <a href="mailto:me@iefosa.me" className="text-primary hover:underline">
                  me@iefosa.me
                </a>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-muted-foreground">Manchester, UK</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Social</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com/whizkidefos" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/efosaigbinehi/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    LinkedIn
                  </a>
                  <a href="https://twitter.com/whizkidefos" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-xl border p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}