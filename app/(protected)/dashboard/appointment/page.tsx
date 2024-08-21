import { AppointmentTable } from '@/components/appointment/AppointmentTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
      
      <div className="p-5 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-2 justify-between items-end lg:items-center">
        <div className="flex gap-4">
            <Input placeholder='Search'></Input>
            <Button>Search</Button>
            </div>
        <Link href="consult"><Button>+ Book Appointment</Button></Link>
        </div>
        <AppointmentTable/>
        </div>
  )
}

export default Page