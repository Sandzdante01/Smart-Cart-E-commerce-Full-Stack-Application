import express from 'express';
import { Newsletter } from '../models/Newsletter.js';
import { Contact } from '../models/Contact.js';

const router = express.Router();

// Newsletter Subscription
router.post('/newsletter/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await Newsletter.findOne({ email: email.toLowerCase().trim() });
    if (!existing) {
      await Newsletter.create({ email });
    }
    res.json({ ok: true, email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Contact Form Message Submission
router.post('/contact', async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;
  const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Anonymous';

  try {
    const contactMessage = await Contact.create({
      name: fullName,
      email,
      subject: subject || 'Contact Form Submission',
      message
    });
    res.json({ ok: true, payload: contactMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
