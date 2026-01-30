
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  
  const onSubmit: SubmitHandler<Inputs> = data => {
    // Simulate form submission
    console.log(data);
    alert('Thank you for your message! We will get back to you shortly.');
  };

  const inputClassName = "mt-1 block w-full rounded-lg border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelClassName = "block text-sm font-medium text-neutral-700";

  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight">Get in Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
          Have a question, suggestion, or need support? We're here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start">
            <MapPinIcon className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-slate-800">Our Office</h3>
              <p className="text-slate-600">123 Security Lane, Trustville, TX 75001</p>
            </div>
          </div>
          <div className="flex items-start">
            <EnvelopeIcon className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-slate-800">Email Us</h3>
              <p className="text-slate-600 hover:text-primary transition"><a href="mailto:support@scamguard.com">support@scamguard.com</a></p>
            </div>
          </div>
          <div className="flex items-start">
            <PhoneIcon className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-slate-800">Call Us</h3>
              <p className="text-slate-600">(555) 123-4567</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className={labelClassName}>Full Name</label>
            <input type="text" id="name" {...register('name', { required: true })} className={inputClassName}/>
            {errors.name && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
          </div>
          <div>
            <label htmlFor="email" className={labelClassName}>Email Address</label>
            <input type="email" id="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className={inputClassName}/>
            {errors.email && <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>}
          </div>
          <div>
            <label htmlFor="subject" className={labelClassName}>Subject</label>
            <input type="text" id="subject" {...register('subject', { required: true })} className={inputClassName}/>
            {errors.subject && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
          </div>
          <div>
            <label htmlFor="message" className={labelClassName}>Message</label>
            <textarea id="message" rows={5} {...register('message', { required: true })} className={inputClassName}></textarea>
            {errors.message && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
          </div>
          <div className="text-right">
            <button type="submit" className="inline-flex justify-center py-3 px-8 border border-transparent shadow-lg text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary to-primary-dark transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;