/*
  Warnings:

  - You are about to drop the column `hostedProjectId` on the `App` table. All the data in the column will be lost.
  - Added the required column `hostProjectId` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_hostedProjectId_fkey";

-- AlterTable
ALTER TABLE "App" DROP COLUMN "hostedProjectId",
ADD COLUMN     "hostProjectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "App" ADD FOREIGN KEY ("hostProjectId") REFERENCES "HostedProject"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;
