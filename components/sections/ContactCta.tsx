import { Mail, Linkedin } from "lucide-react";
import { contact, identity } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ContactCta() {
  return (
    <section id="contact" className="section">
      <div className="container-content">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-16 text-center md:px-10 md:py-24">
            {/* bottom glow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-[-40%] mx-auto h-[400px] w-[700px] max-w-[120%] blur-[90px]"
              style={{
                background:
                  "radial-gradient(50% 60% at 50% 100%, rgba(138,114,255,0.4), transparent 70%)",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-[620px] font-display text-[30px] font-medium leading-tight tracking-[-0.028em] md:text-[42px]">
                {contact.h2}
              </h2>
              <p className="mx-auto mt-5 max-w-[520px] text-[17px] text-[var(--color-text-muted)]">
                {contact.text}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href={`mailto:${identity.email}`} variant="primary">
                  <Mail size={16} />
                  {contact.emailLabel}
                </Button>
                <Button href={identity.linkedin} variant="ghost" external>
                  <Linkedin size={16} />
                  {contact.linkedinLabel}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
