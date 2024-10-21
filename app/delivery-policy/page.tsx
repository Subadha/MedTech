'use client';
import { Footer } from '@/components/home/Footer';
import NavBar from '@/components/home/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const page = () => {
  const [policies] = useState([
    {
      title: 'Order Processing',
      content: `
        Our order processing for online doctor consultations involves the following steps:
        1. **Booking Confirmation:** Once you book a consultation, you will receive a confirmation via email or SMS within 5 minutes.
        2. **Doctor Assignment:** A doctor will be assigned to your case within 15-30 minutes based on availability.
        3. **Consultation Preparation:** You will be provided with a link to join the online session at the scheduled time.
        
        **Duration:** The entire process usually takes around 30-45 minutes from booking to consultation readiness.
        
        **Completion:** Once the consultation is completed, a summary report will be sent to you within 24 hours.
      `,
    },
    {
      title: 'Delivery Policy',
      content: `
        For online doctor consultancy, consultations are delivered immediately via video call or chat upon booking confirmation.
        You will receive an email or SMS with a link to the consultation session.
        Please make sure to join the session at the scheduled time.
      `,
    },
    {
      title: 'Refund Policy',
      content: `
        Refunds are available if the consultation is canceled 24 hours before the scheduled appointment.
        No refunds will be issued for no-shows or last-minute cancellations.
        For any issues regarding refunds, please contact our support team within 48 hours of your booking.
      `,
    },
  ]);

  return (
    <>
     <NavBar/>
     
   
    <div className="container mx-auto p-4">
       
      <h1 className="text-3xl font-bold mb-6 text-center">Our Delivery Policies</h1>
      <div className="space-y-6">
        {policies.map((policy, index) => (
          <Card key={index} className="bg-white shadow-md rounded-lg">
            <CardHeader>
              <CardTitle>{policy.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-line">{policy.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
      <Footer/>
    </>
  );
};

export default page;
