import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6 pt-24">
      <div className="text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          Error 404
        </p>
        <h1 className="mt-5 font-display text-[48px] font-medium leading-tight tracking-[-0.035em] md:text-[72px]">
          <GradientText>Page not found.</GradientText>
        </h1>
        <p className="mx-auto mt-5 max-w-[420px] text-[17px] text-[var(--color-text-muted)]">
          That page does not exist, or it has moved. Let&apos;s get you back.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" variant="primary">
            Back home
          </Button>
        </div>
      </div>
    </section>
  );
}
