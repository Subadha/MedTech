import { Footer } from "@/components/home/Footer";
import NavBar from "@/components/home/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:px-10 px-10 py-8">
        <h1 className="text-3xl font-bold">Refund Policy</h1>
        <p>
          We strive to offer the best possible consultancy services from qualified doctors on our platform. However, if you are not satisfied with the service provided, we offer a refund or exchange within the first 30 days from the date of your purchase. If 30 days have passed since your purchase, we will not be able to offer a refund, exchange, or credit of any kind.
          <br /><br />
          To be eligible for a refund or exchange, the following conditions must be met:</p>
          <ol className="list-decimal ml-6">
            <li>The consultancy service should not have been fully utilized (e.g., incomplete consultation sessions).</li>
            <li>You must have a valid reason related to the quality of the service provided by the doctor.</li>
          </ol>
          <p>
          Please note that refunds will not be applicable for consultations that have been fully completed or if the dissatisfaction is due to factors outside of the doctor's control.
          <br /><br />
          <strong>Exceptions to Refund Policy</strong>
          <br />
          Certain services may be exempt from refunds, such as emergency consultations or special discounted packages. These exemptions will be clearly stated at the time of purchase.
          <br /><br />
          If your refund or exchange request is accepted, once we have reviewed your case and found it eligible for a refund, we will process the request in accordance with our policies. We will notify you via email once your request has been processed.
          <br /><br />
          For any questions or assistance regarding refunds or exchanges, please contact our support team.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default page;
