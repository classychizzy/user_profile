/*
  Warnings:

  - You are about to drop the column `userprofileUserprofileId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `userprofile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `address_userprofileUserprofileId_fkey`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `userprofileUserprofileId`;

-- AlterTable
ALTER TABLE `userprofile` DROP COLUMN `email`;
