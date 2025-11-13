'use client';

import { useState } from 'react';

export default function ContactForm({ day }: { day: boolean }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just log the form data. In a real app, you'd send this to a backend
        console.log('Form submitted:', formData);
        alert('Thank you for your message! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className={`nes-container is-rounded with-title ${day ? 'bg-gray-200' : 'is-dark'}`}>
            <p className="title">Send Me a Message</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="nes-input w-full"
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="nes-input w-full"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="nes-textarea w-full"
                        placeholder="Enter your message"
                    />
                </div>
                <button type="submit" className="nes-btn is-primary w-full">
                    Send Message
                </button>
            </form>
        </div>
    );
}