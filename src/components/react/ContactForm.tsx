import { useState } from 'react';
import MagneticButton from './MagneticButton';

type Field = 'name' | 'email' | 'message';

export default function ContactForm() {
  const [focused, setFocused] = useState<Field | null>(null);

  return (
    <form
      className="contact-form"
      name="connect"
      method="POST"
      action="/success"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="connect" />
      <p hidden>
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className={`contact-field${focused === 'name' ? ' contact-field--focused' : ''}`}>
        <label htmlFor="contact-name" className="contact-field__label">Your name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className="contact-field__input"
          required
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused(null)}
          autoComplete="name"
        />
      </div>

      <div className={`contact-field${focused === 'email' ? ' contact-field--focused' : ''}`}>
        <label htmlFor="contact-email" className="contact-field__label">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className="contact-field__input"
          required
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
          autoComplete="email"
        />
      </div>

      <div className={`contact-field${focused === 'message' ? ' contact-field--focused' : ''}`}>
        <label htmlFor="contact-message" className="contact-field__label">Your message</label>
        <textarea
          id="contact-message"
          name="message"
          className="contact-field__input contact-field__textarea"
          rows={5}
          placeholder="What is inside your mind?"
          required
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
        />
      </div>

      <MagneticButton type="submit" className="btn btn--primary contact-form__submit">
        Send a note →
      </MagneticButton>
    </form>
  );
}
