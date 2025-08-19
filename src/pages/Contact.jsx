import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_9qdcj48",
        "template_ypa6yzb",
        form.current,
        "Xt4qvASTtBhMKZoqN"
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setIsSending(false);
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("❌ Failed to send. Try again.");
          setIsSending(false);
        }
      );
  };

  return (
    <section className="relative py-20 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side: Heading & text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-black dark:text-white">
            Get In Touch
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 text-lg sm:text-xl">
            I’d love to hear from you! Whether it’s a project, collaboration, or
            just a friendly hello — drop me a message 👋
          </p>
        </motion.div>

        {/* Right side: Form */}
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 shadow-lg rounded-2xl p-8 space-y-5 transition-colors duration-300"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-black/50 dark:focus:ring-white/50 transition-colors duration-300"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-black/50 dark:focus:ring-white/50 transition-colors duration-300"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            className="w-full p-3 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-black/50 dark:focus:ring-white/50 transition-colors duration-300"
          />
          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3 rounded-xl font-semibold text-black dark:text-white border border-black dark:border-white shadow-md transition-colors duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-50"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
          {status && (
            <p className="mt-4 text-sm text-neutral-700 dark:text-neutral-300">
              {status}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
