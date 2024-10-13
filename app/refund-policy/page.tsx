import { Footer } from "@/components/home/Footer";
import NavBar from "@/components/home/Navbar";
import React from "react";

const page = () => {
  return (
    <>
    <NavBar/>
    <div className="flex flex-col lg:px-10 px-10 py-8">
      <h1 className=" text-3xl font-bold">Refund Policy</h1>
      <p>
        {" "}
        We offer refund / exchange within first 30 days from the date of your
        purchase. If 30 days have passed since your purchase&apos; you will not
        be offered a return&apos; exchange or refund of any kind. In order to
        become eligible for a return or an exchange&apos; (i) the purchased item
        should be unused and in the same condition as you received it&apos; (ii)
        the item must have original packaging&apos; (iii) if the item that you
        purchased on a sale&apos; then the item may not be eligible for a return
        / exchange. Further&apos; only such items are replaced by us (based on
        an exchange request)&apos; if such items are found defective or damaged.
        You agree that there may be a certain category of products / items that
        are exempted from returns or refunds. Such categories of the products
        would be identified to you at the item of purchase. For exchange /
        return accepted request(s) (as applicable)&apos; once your returned
        product / item is received and inspected by us&apos; we will send you an
        email to notify you about receipt of the returned / exchanged product.
        Further. If the same has been approved after the quality check at our
        end&apos; your request (i.e. return / exchange) will be processed in
        accordance with our policies. ?</p>
        <h2 className=" font-semibold text-xl">Shipping Policy</h2>
       <p> The orders for the user are shipped through registered domestic courier
        companies and/or speed post only. Orders are shipped within 30 days from
        the date of the order and/or payment or as per the delivery date agreed
        at the time of order confirmation and delivering of the shipment&apos;
        subject to courier company / post office norms. Platform Owner shall not
        be liable for any delay in delivery by the courier company / postal
        authority. Delivery of all orders will be made to the address provided
        by the buyer at the time of purchase. Delivery of our services will be
        confirmed on your email ID as specified at the time of registration. If
        there are any shipping cost(s) levied by the seller or the Platform
        Owner (as the case be)&apos; the same is not refundable.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default page;
