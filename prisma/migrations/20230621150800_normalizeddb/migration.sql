/*
  Warnings:

  - You are about to drop the column `user_Id` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[first_name,last_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `first_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_user_Id_fkey`;

-- DropIndex
DROP INDEX `User_addressId_key` ON `User`;

-- AlterTable
ALTER TABLE `Address` DROP COLUMN `user_Id`;

-- AlterTable
ALTER TABLE `User` MODIFY `first_name` VARCHAR(255) NOT NULL,
    MODIFY `last_name` VARCHAR(255) NOT NULL,
    MODIFY `username` VARCHAR(255) NOT NULL,
    MODIFY `phone_number` VARCHAR(25) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_first_name_last_name_key` ON `User`(`first_name`, `last_name`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`addressId`) ON DELETE SET NULL ON UPDATE CASCADE;
