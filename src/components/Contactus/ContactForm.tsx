'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission logic
    console.log('Form submitted:', formData);
    // Reset form (optional)
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-16 bg-white dark:bg-black">
  <div className="container mx-auto px-4">
    <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
      Send Us A Message
    </h2>

    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
      
      {/* Row: Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Your name..."
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email..."
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          required
        />
      </div>

      {/* Row: Message Textarea */}
      <textarea
        name="message"
        placeholder="Your message..."
        value={formData.message}
        onChange={handleChange}
        rows={5}
        className="w-full bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        required
      />

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          SEND
        </button>
      </div>

    </form>
  </div>
</section>

  );
}
