import { Footer } from "@/components/home/Footer";
import NavBar from "@/components/home/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:px-20 px-10 py-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p>
          This Privacy Policy outlines how Kaustubha Medtech Private Limited
          (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, discloses, and protects your
          information when you visit or interact with our website at
          <a
            href="https://www.kaustubhamedtech.com/"
            className="text-blue-500 underline ml-1"
          >
            https://www.kaustubhamedtech.com/
          </a>
          (the &quot;Platform&quot;).
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p>
          We collect your personal data when you use our Platform, services, or
          otherwise interact with us. This includes information you provide to
          us during registration, such as your name, date of birth, address,
          telephone/mobile number, email ID, and other details for
          identification. We may also collect sensitive information, like your
          payment details or biometric information, with your consent.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          2. Usage of Information
        </h2>
        <p>
          The personal data we collect is used to provide the services you
          request, enhance your experience on the Platform, resolve disputes,
          troubleshoot issues, improve our services, and for marketing purposes
          (with your consent). We also use the data to detect and prevent fraud
          or other criminal activities.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          3. Sharing of Information
        </h2>
        <p>
          We may share your information with our affiliates, third-party service
          providers, payment processors, and other partners to provide services
          to you. We may also disclose information to comply with legal
          obligations, enforce our terms, and protect the rights and safety of
          our users.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          4. Security Measures
        </h2>
        <p>
          We implement reasonable security practices to protect your personal
          data from unauthorized access or disclosure. However, no method of
          transmission over the internet is entirely secure, and we cannot
          guarantee absolute security of your data.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          5. Cookies and Tracking
        </h2>
        <p>
          We use cookies and similar tracking technologies to enhance your
          experience on our Platform. These technologies help us understand user
          preferences and improve the functionality of our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal data.
          You may also opt out of receiving marketing communications from us at
          any time.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          7. Changes to this Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in
          our data practices or relevant laws. We encourage you to review this
          page regularly to stay informed about how we are protecting your data.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">8. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at our registered office: Foundation for CfHE,
          Indian Institute of Hyderabad, Kandi, Medak, Sangareddy, TELANGANA,
          502285.
        </p>

        <p className="mt-6">
          By using our Platform, you agree to this Privacy Policy and the terms
          outlined herein. If you do not agree with our practices, please do not
          use our services.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default page;
