import { DoctorCard } from '@/components/dashboard/recommended-doctor'
import React from 'react'

const page = () => {
  return (
    <>
      <div className="p-4 flex flex-col lg:flex-row justify-between h-20 lg:items-center gap-4">
      <h2 className=' text-2xl font-medium'>All Doctors</h2>
      <span className=' text-primary font-medium'>Filter</span>
    </div>
    <div className='grid grid-cols-6 gap-3 p-4'>
      {dummyData.map((data,ind) => (
        <DoctorCard key={ind} data={data} />
      ))}
    </div>
    </>
  )
}

export default page


const dummyData = [
    {
      "name": "Dr. Madhukar",
      "specialization": "Gynecologist",
      "experience": "12 years",
      "available_days": ["Tue", "Thu", "Fri", "Sat"],
      "timing": "10:00 AM - 01:00 PM",
      "fee": "Rs. 300"
    },
    {
      "name": "Dr. Aditi Sharma",
      "specialization": "Pediatrician",
      "experience": "8 years",
      "available_days": ["Mon", "Wed"],
      "timing": "09:00 AM - 12:00 PM",
      "fee": "Rs. 250"
    },
    {
      "name": "Dr. Rohan Mehta",
      "specialization": "Cardiologist",
      "experience": "15 years",
      "available_days": ["Mon", "Fri", "Sat"],
      "timing": "11:00 AM - 02:00 PM",
      "fee": "Rs. 500"
    },
    {
      "name": "Dr. Pooja Nair",
      "specialization": "Dermatologist",
      "experience": "10 years",
      "available_days": ["Wed", "Sat"],
      "timing": "10:00 AM - 01:00 PM",
      "fee": "Rs. 300"
    },
    {
      "name": "Dr. Arjun Kapoor",
      "specialization": "Orthopedic Surgeon",
      "experience": "18 years",
      "available_days": ["Tue", "Fri"],
      "timing": "12:00 PM - 03:00 PM",
      "fee": "Rs. 400"
    },
    {
      "name": "Dr. Sneha Verma",
      "specialization": "ENT Specialist",
      "experience": "9 years",
      "available_days": ["Mon", "Thu"],
      "timing": "10:00 AM - 12:30 PM",
      "fee": "Rs. 350"
    },
    {
      "name": "Dr. Abhishek Rao",
      "specialization": "Neurologist",
      "experience": "14 years",
      "available_days": ["Wed", "Fri"],
      "timing": "11:00 AM - 02:00 PM",
      "fee": "Rs. 600"
    },
    {
      "name": "Dr. Priya Malhotra",
      "specialization": "Psychiatrist",
      "experience": "11 years",
      "available_days": ["Tue", "Thu"],
      "timing": "09:00 AM - 12:00 PM",
      "fee": "Rs. 400"
    },
    {
      "name": "Dr. Karan Singh",
      "specialization": "Urologist",
      "experience": "16 years",
      "available_days": ["Mon", "Wed"],
      "timing": "10:30 AM - 01:30 PM",
      "fee": "Rs. 450"
    },
    {
      "name": "Dr. Meera Patel",
      "specialization": "Endocrinologist",
      "experience": "13 years",
      "available_days": ["Tue", "Fri"],
      "timing": "11:00 AM - 01:00 PM",
      "fee": "Rs. 500"
    },
    {
      "name": "Dr. Rajat Khanna",
      "specialization": "Oncologist",
      "experience": "20 years",
      "available_days": ["Mon", "Thu"],
      "timing": "10:00 AM - 12:00 PM",
      "fee": "Rs. 700"
    },
    {
      "name": "Dr. Shalini Gupta",
      "specialization": "Ophthalmologist",
      "experience": "10 years",
      "available_days": ["Wed", "Fri"],
      "timing": "09:30 AM - 12:30 PM",
      "fee": "Rs. 300"
    },
    {
      "name": "Dr. Ankit Jain",
      "specialization": "Gastroenterologist",
      "experience": "17 years",
      "available_days": ["Tue", "Thu"],
      "timing": "12:00 PM - 03:00 PM",
      "fee": "Rs. 550"
    },
    {
      "name": "Dr. Neha Desai",
      "specialization": "Pulmonologist",
      "experience": "12 years",
      "available_days": ["Mon", "Fri"],
      "timing": "10:00 AM - 01:00 PM",
      "fee": "Rs. 400"
    },
    {
      "name": "Dr. Vivek Kumar",
      "specialization": "Nephrologist",
      "experience": "14 years",
      "available_days": ["Wed", "Sat"],
      "timing": "11:00 AM - 02:00 PM",
      "fee": "Rs. 600"
    },
    {
      "name": "Dr. Reena Kapoor",
      "specialization": "Rheumatologist",
      "experience": "13 years",
      "available_days": ["Tue", "Thu"],
      "timing": "09:00 AM - 12:00 PM",
      "fee": "Rs. 450"
    },
    {
      "name": "Dr. Gaurav Sharma",
      "specialization": "Plastic Surgeon",
      "experience": "19 years",
      "available_days": ["Mon", "Wed"],
      "timing": "11:00 AM - 01:30 PM",
      "fee": "Rs. 800"
    },
    {
      "name": "Dr. Ritu Ahuja",
      "specialization": "Radiologist",
      "experience": "15 years",
      "available_days": ["Tue", "Fri"],
      "timing": "10:00 AM - 12:30 PM",
      "fee": "Rs. 500"
    },
    {
      "name": "Dr. Akash Pandey",
      "specialization": "Hematologist",
      "experience": "16 years",
      "available_days": ["Mon", "Thu"],
      "timing": "12:00 PM - 02:00 PM",
      "fee": "Rs. 550"
    },
    {
      "name": "Dr. Sanjana Nair",
      "specialization": "Allergist",
      "experience": "9 years",
      "available_days": ["Wed", "Fri"],
      "timing": "09:00 AM - 12:00 PM",
      "fee": "Rs. 350"
    }
  ]
  