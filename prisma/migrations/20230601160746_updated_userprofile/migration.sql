/*
  Warnings:

  - You are about to drop the column `id` on the `Userprofile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_Id]` on the table `Userprofile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_Id` to the `Userprofile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Userprofile` DROP FOREIGN KEY `Userprofile_id_fkey`;

-- AlterTable
ALTER TABLE `Userprofile` DROP COLUMN `id`,
    ADD COLUMN `user_Id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Userprofile_user_Id_key` ON `Userprofile`(`user_Id`);

-- CreateIndex
CREATE INDEX `userprofile_id_fkey` ON `Userprofile`(`user_Id`);

-- AddForeignKey
ALTER TABLE `Userprofile` ADD CONSTRAINT `Userprofile_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
