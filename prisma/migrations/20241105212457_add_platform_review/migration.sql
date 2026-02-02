/*
  Warnings:

  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ConversationType" AS ENUM ('PRIVATE', 'COMMUNITY', 'ADMIN_SUPPORT');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'DOCTOR';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email_verified",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "numberVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "socket_id" TEXT;

-- DropTable
DROP TABLE "Appointment";

-- CreateTable
CREATE TABLE "doctor_profiles" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "bookedAppointment" DOUBLE PRECISION NOT NULL,
    "specialization" TEXT NOT NULL,
    "subSpecialist" TEXT NOT NULL,
    "experienceYears" TEXT NOT NULL,
    "consultationFees" TEXT NOT NULL,

    CONSTRAINT "doctor_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "patientProfilePic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appointmentId" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_availability_details" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionFees" TEXT NOT NULL,
    "sessionLength" TEXT NOT NULL,
    "languages" TEXT[],
    "availableDays" TEXT[],
    "availableTimeFrom" TEXT NOT NULL,
    "availableTimeSlot" TEXT[],

    CONSTRAINT "doctor_availability_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_licenses" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl1" TEXT NOT NULL,
    "imageUrl2" TEXT NOT NULL,
    "registrationNumber1" TEXT NOT NULL,
    "registrationNumber2" TEXT NOT NULL,

    CONSTRAINT "doctor_licenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_report" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl1" TEXT NOT NULL,
    "imageUrl2" TEXT NOT NULL,

    CONSTRAINT "patient_report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activity" JSONB NOT NULL,
    "sleep" JSONB NOT NULL,
    "wellness" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Overview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "report" JSONB[],

    CONSTRAINT "Overview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthMonitoring" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "monthly_monitoring" JSONB NOT NULL,
    "weekly_monitoring" JSONB NOT NULL,
    "daily_monitoring" JSONB NOT NULL,

    CONSTRAINT "HealthMonitoring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthExpected" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "report" JSONB[],

    CONSTRAINT "HealthExpected_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emailOtp" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emailOtp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookedAppointment" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "doctorName" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "reschedule" TEXT NOT NULL,
    "reviewed" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "age" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "BookedAppointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "amount_paid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformReview" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" DOUBLE PRECISION NOT NULL,
    "review" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PlatformReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ConversationType" NOT NULL DEFAULT 'PRIVATE',
    "communityName" TEXT,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversationParticipant" (
    "id" SERIAL NOT NULL,
    "conversationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unreadCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ConversationParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileName" TEXT,
    "filePath" TEXT,
    "fileType" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeenMessage" (
    "id" SERIAL NOT NULL,
    "messageId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "seenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeenMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctor_profiles_userId_key" ON "doctor_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_availability_details_userId_key" ON "doctor_availability_details"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_licenses_userId_key" ON "doctor_licenses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "patient_report_userId_key" ON "patient_report"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Overview_userId_key" ON "Overview"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthMonitoring_userId_key" ON "HealthMonitoring"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthExpected_userId_key" ON "HealthExpected"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_phone_key" ON "Otp"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "emailOtp_email_key" ON "emailOtp"("email");

-- CreateIndex
CREATE UNIQUE INDEX "payments_appointmentId_key" ON "payments"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "ConversationParticipant_conversationId_userId_key" ON "ConversationParticipant"("conversationId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SeenMessage_messageId_userId_key" ON "SeenMessage"("messageId", "userId");

-- AddForeignKey
ALTER TABLE "doctor_profiles" ADD CONSTRAINT "doctor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_availability_details" ADD CONSTRAINT "doctor_availability_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_licenses" ADD CONSTRAINT "doctor_licenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_report" ADD CONSTRAINT "patient_report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookedAppointment" ADD CONSTRAINT "BookedAppointment_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookedAppointment" ADD CONSTRAINT "BookedAppointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "BookedAppointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeenMessage" ADD CONSTRAINT "SeenMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
