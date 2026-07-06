import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTransition } from "react";
import Rive from "@rive-app/react-canvas";

function ContactSection() {
  const form = useRef<HTMLFormElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      await emailjs
        .sendForm(
          process.env.YOUR_SERVICE_ID!,
          process.env.YOUR_TEMPLATE_ID!,
          form.current!,
          {
            publicKey: process.env.YOUR_PUBLIC_KEY,
          }
        )
        .then(
          () => {
            setMessage("Message sent successfully!");
          },
          (error) => {
            setMessage("Failed to send message. Please try again.");
          }
        );

      form.current?.reset();
    });
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-6 sm:px-12 md:px-24 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16 max-w-6xl mx-auto w-full bg-black overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-emerald-950/10 blur-[100px] pointer-events-none" />

      {/* Rive Animation Container - styled responsively without hardcoded style widths */}
      <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] flex items-center justify-center relative select-none">
        <Rive
          src="/frame.riv"
          stateMachines="loop"
          className="w-full h-full"
        />
      </div>

      {/* Form Container */}
      <form
        ref={form}
        className="flex flex-col w-full max-w-[450px] md:w-1/2 bg-zinc-950/30 border border-zinc-900 rounded-3xl p-6 sm:p-8 relative"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-1">
            Get In Touch
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Let's build something cool
          </h2>
        </div>

        <input
          name="name"
          autoComplete="off"
          type="text"
          className="my-2 rounded-xl border border-zinc-800 bg-zinc-950/50 p-3.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          placeholder="Name"
          required
        />
        
        <input
          name="email"
          autoComplete="off"
          type="email"
          className="my-2 rounded-xl border border-zinc-800 bg-zinc-950/50 p-3.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          placeholder="Email"
          required
        />
        
        <textarea
          name="message"
          autoComplete="off"
          rows={4}
          placeholder="Message"
          className="my-2 rounded-xl border border-zinc-800 bg-zinc-950/50 p-3.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 resize-none"
          required
        />

        {message && (
          <div
            className={`mt-4 text-sm font-medium px-4 py-2.5 rounded-xl border ${
              message === "Message sent successfully!"
                ? "text-emerald-400 bg-emerald-950/10 border-emerald-900/30"
                : "text-rose-400 bg-rose-950/10 border-rose-900/30"
            }`}
          >
            {message}
          </div>
        )}

        <button
          className="mt-6 w-full px-6 py-3.5 rounded-xl border border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.05)] transition-all hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}

export default ContactSection;
