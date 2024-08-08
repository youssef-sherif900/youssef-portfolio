import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTransition } from "react";
import Rive from "@rive-app/react-canvas";

function ContactSection() {
  const form = useRef(null);

  const [isPending, startTransition] = useTransition();

  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      await emailjs
        .sendForm(
          process.env.YOUR_SERVICE_ID,
          process.env.YOUR_TEMPLATE_ID,
          form.current,
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

      form?.current?.reset();
    });
  }

  return (
    <section
      id="contact"
      className="  sm:h-screen 2xl:h-[30vh]  p-10 sm:p-24 flex sm:flex-row flex-col  items-center justify-center"

    >

      <Rive
      style={{height:'600px' , width:'600px'}}
        src="/frame.riv"
        stateMachines="loop"
        className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]  sm:-translate-y-14"
      />
    

      <form
        ref={form}
        className="flex sm:h-[600px] flex-col w-[350px]  sm:w-1/2 sm:min-w-[400px] p-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl my-4">Get in touch</h1>
        <input
          name="name"
          autoComplete="off"
          type="text"
          className="  my-4 rounded-md border-2 border-green-800 p-2 bg-transparent"
          placeholder="Name"
        />
        <input
          name="email"
          autoComplete="off"
          type="email"
          className="my-4 rounded-md border-2 border-green-800 p-2 bg-transparent"
          placeholder="Email"
        />
        <textarea
          name="message"
          autoComplete="off"
          rows={5}
          placeholder="Message"
          className=" my-4 rounded-md border-2 border-green-800 p-2 bg-transparent"
        />
        { message === 'Message sent successfully!' ? <div className="text-sm text-green-600">{message}</div> : message === 'Failed to send message. Please try again.' ? <div className="text-sm text-red-700">{message}</div> : '' }
        <button
          className="mt-5 ml-auto mr-2 my-2 text-lg hover:text-black font-[700] border-2 border-green-800  hover:bg-[green] py-1 px-3 rounded-2xl bg-black text-green-800"
          type="submit"
        >
          {isPending ? "Loading..." : "Submit"}
        </button>
      </form>
    </section>
  );
}

export default ContactSection;
