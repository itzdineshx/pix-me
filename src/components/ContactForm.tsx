'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

interface ContactFormProps {
    day: boolean;
}

export default function ContactForm({ day }: ContactFormProps) {
    const form = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        phone: '',
        organization: '',
        contact_reason: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Format the message with all visitor details
            const formattedMessage = `
📬 NEW CONTACT FORM MESSAGE

👤 Name: ${formData.from_name}
📧 Email: ${formData.from_email}
${formData.phone ? `📞 Phone: ${formData.phone}` : ''}
${formData.organization ? `🏢 Organization: ${formData.organization}` : ''}
${formData.contact_reason ? `🎯 Reason for Contact: ${formData.contact_reason}` : ''}
📝 Subject: ${formData.subject}

💬 Message:
${formData.message}

---
Reply directly to: ${formData.from_email}
            `.trim();

            // Temporarily update the form's message field
            const messageTextarea = form.current?.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
            if (messageTextarea) {
                messageTextarea.value = formattedMessage;
            }

            const result = await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                form.current!,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            // Reset the message field back to original
            if (messageTextarea) {
                messageTextarea.value = formData.message;
            }

            if (result.text === 'OK') {
                setSubmitStatus('success');
                setFormData({
                    from_name: '',
                    from_email: '',
                    phone: '',
                    organization: '',
                    contact_reason: '',
                    subject: '',
                    message: ''
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('EmailJS error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = `nes-input ${day ? 'bg-white border-gray-300' : 'bg-gray-800 border-gray-600 text-white'}`;
    const textareaClass = `nes-textarea ${day ? 'bg-white border-gray-300' : 'bg-gray-800 border-gray-600 text-white'}`;

    return (
        <div className={`nes-container is-rounded ${day ? 'bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300' : 'is-dark bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600'} p-8 mb-6 shadow-xl`}>
            <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${day ? 'text-gray-800' : 'text-white'}`}>
                    📬 Let's Connect!
                </h3>
                <p className={`text-sm ${day ? 'text-gray-600' : 'text-gray-300'}`}>
                    I'd love to hear from you. Fill out the form below and I'll get back to you soon!
                </p>
            </div>

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
                {/* Personal Information Section */}
                <div className={`p-4 rounded-lg ${day ? 'bg-white/50 border border-gray-200' : 'bg-gray-700/50 border border-gray-600'}`}>
                    <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${day ? 'text-gray-800' : 'text-white'}`}>
                        <i className="nes-icon user"></i>
                        Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="from_name" className={`block text-sm font-medium mb-2 ${day ? 'text-gray-700' : 'text-gray-300'}`}>
                                👤 Full Name *
                            </label>
                            <input
                                type="text"
                                id="from_name"
                                name="from_name"
                                value={formData.from_name}
                                onChange={handleInputChange}
                                className={`${inputClass} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
                                required
                                placeholder="Your full name"
                            />
                        </div>
                        <div>
                            <label htmlFor="from_email" className={`block text-sm font-medium mb-2 ${day ? 'text-gray-700' : 'text-gray-300'}`}>
                                📧 Email Address *
                            </label>
                            <input
                                type="email"
                                id="from_email"
                                name="from_email"
                                value={formData.from_email}
                                onChange={handleInputChange}
                                className={`${inputClass} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
                                required
                                placeholder="your.email@example.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Details Section */}
                <div className={`p-4 rounded-lg ${day ? 'bg-white/50 border border-gray-200' : 'bg-gray-700/50 border border-gray-600'}`}>
                    <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${day ? 'text-gray-800' : 'text-white'}`}>
                        <i className="nes-icon phone"></i>
                        Contact Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${day ? 'text-gray-700' : 'text-gray-300'}`}>
                                📞 Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`${inputClass} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        <div>
                            <label htmlFor="organization" className={`block text-sm font-medium mb-2 ${day ? 'text-gray-700' : 'text-gray-300'}`}>
                                🏢 Organization / Company
                            </label>
                            <input
                                type="text"
                                id="organization"
                                name="organization"
                                value={formData.organization}
                                onChange={handleInputChange}
                                className={`${inputClass} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
                                placeholder="Your company or organization"
                            />
                        </div>
                    </div>
                </div>

                {/* Project Details Section */}
                <div className={`p-4 rounded-lg ${day ? 'bg-white/50 border border-gray-200' : 'bg-gray-700/50 border border-gray-600'}`}>
                    <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${day ? 'text-gray-800' : 'text-white'}`}>
                        <i className="nes-icon star"></i>
                        Project Details
                    </h4>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="contact_reason" className={`block text-sm font-medium mb-2 ${day ? 'text-gray-700' : 'text-gray-300'}`}>
                                🎯 Reason for Contact
                            </label>
                            <select
                                id="contact_reason"
                                name="contact_reason"
                                value={formData.contact_reason}
                                onChange={handleInputChange}
                                className={`nes-select w-full ${day ? 'bg-white border-gray-300' : 'bg-gray-800 border-gray-600 text-white'} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value="">Select a reason...</option>
                                <option value="Collaboration">🤝 Collaboration</option>
                                <option value="Internship / Job Opportunity">💼 Internship / Job Opportunity</option>
                                <option value="Project Request">🚀 Project Request</option>
                                <option value="Technical Help">🛠️ Technical Help</option>
                                <option value="Other">❓ Other</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${day ? 'text-gray-700' : 'text-gray-300'}`}>
                                📝 Subject *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className={`${inputClass} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
                                required
                                placeholder="What's this about?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className={`block text-sm font-medium mb-2 ${day ? 'text-gray-700' : 'text-gray-300'}`}>
                                💬 Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className={`${textareaClass} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
                                rows={6}
                                required
                                placeholder="Tell me about your project, idea, or how I can help you..."
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`nes-btn is-primary px-12 py-4 text-lg font-bold rounded-lg transform transition-all duration-300 ${
                            isSubmitting
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:scale-105 active:scale-95 hover:shadow-lg'
                        } touch-manipulation min-h-[52px] border-2 border-blue-600`}
                    >
                        {isSubmitting ? (
                            <>
                                <i className="nes-icon heart animate-pulse mr-2"></i>
                                Sending Message...
                            </>
                        ) : (
                            <>
                                <i className="nes-icon star mr-2"></i>
                                Send Message
                                <i className="nes-icon star ml-2"></i>
                            </>
                        )}
                    </button>
                </div>

                {submitStatus === 'success' && (
                    <div className="nes-container is-rounded is-success text-center p-6 mt-6 border-2 border-green-500 bg-green-50 dark:bg-green-900/20">
                        <i className="nes-icon trophy text-3xl mb-2"></i>
                        <h4 className="text-lg font-bold mb-2 text-green-800 dark:text-green-200">Message Sent Successfully! 🎉</h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                            Thank you for reaching out! I'll review your message and get back to you within 24 hours.
                        </p>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="nes-container is-rounded is-error text-center p-6 mt-6 border-2 border-red-500 bg-red-50 dark:bg-red-900/20">
                        <i className="nes-icon close text-3xl mb-2"></i>
                        <h4 className="text-lg font-bold mb-2 text-red-800 dark:text-red-200">Oops! Something went wrong 😞</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                            There was an error sending your message. Please try again or contact me directly.
                        </p>
                        <button
                            onClick={() => setSubmitStatus('idle')}
                            className="nes-btn is-error text-sm px-4 py-2"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}