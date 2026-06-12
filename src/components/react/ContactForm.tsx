import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

type Field = 'name' | 'email' | 'message';

const FRIENDLY_ERRORS: Record<Field, string> = {
  name: 'I\'d love to know what to call you.',
  email: 'Need a valid email so I can write back.',
  message: 'Don\'t leave me hanging — say something!',
};

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<Field | null>(null);

  function validate() {
    const next: Partial<Record<Field, string>> = {};
    if (!name.trim()) next.name = FRIENDLY_ERRORS.name;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = FRIENDLY_ERRORS.email;
    }
    if (!message.trim()) next.message = FRIENDLY_ERRORS.message;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        className="contact-form contact-form--success"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="contact-form__success-icon" aria-hidden="true">✦</span>
        <h2 className="contact-form__success-title">Message received.</h2>
        <p className="contact-form__success-text">
          I'll get back to you after I finish my current experiment.
        </p>
      </motion.div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className={`contact-field${focused === 'name' ? ' contact-field--focused' : ''}${errors.name ? ' contact-field--error' : ''}`}>
        <label htmlFor="contact-name" className="contact-field__label">Your name</label>
        <input
          id="contact-name"
          type="text"
          className="contact-field__input"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused(null)}
          autoComplete="name"
        />
        {errors.name && <p className="contact-field__error" role="alert">{errors.name}</p>}
      </div>

      <div className={`contact-field${focused === 'email' ? ' contact-field--focused' : ''}${errors.email ? ' contact-field--error' : ''}`}>
        <label htmlFor="contact-email" className="contact-field__label">Email</label>
        <input
          id="contact-email"
          type="email"
          className="contact-field__input"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
          autoComplete="email"
        />
        {errors.email && <p className="contact-field__error" role="alert">{errors.email}</p>}
      </div>

      <div className={`contact-field${focused === 'message' ? ' contact-field--focused' : ''}${errors.message ? ' contact-field--error' : ''}`}>
        <label htmlFor="contact-message" className="contact-field__label">Your message</label>
        <textarea
          id="contact-message"
          className="contact-field__input contact-field__textarea"
          rows={5}
          placeholder="Tell me what you're building..."
          value={message}
          onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: undefined })); }}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
        />
        {errors.message && <p className="contact-field__error" role="alert">{errors.message}</p>}
      </div>

      <MagneticButton type="submit" className="btn btn--primary contact-form__submit">
        Send a note →
      </MagneticButton>
    </form>
  );
}
