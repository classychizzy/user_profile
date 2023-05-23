/*
  Warnings:

  - You are about to drop the column `profile` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `userprofile` table. All the data in the column will be lost.
  - Added the required column `userprofileId` to the `address` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `USERID` to the `userprofile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `address_ibfk_1`;

-- DropForeignKey
ALTER TABLE `userprofile` DROP FOREIGN KEY `userprofile_ibfk_1`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `profile`,
    ADD COLUMN `userprofileId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `userprofile` DROP COLUMN `profile`,
    ADD COLUMN `USERID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_userprofileId_fkey` FOREIGN KEY (`userprofileId`) REFERENCES `userprofile`(`userprofile_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userprofile` ADD CONSTRAINT `userprofile_USERID_fkey` FOREIGN KEY (`USERID`) REFERENCES `user`(`USERID`) ON DELETE RESTRICT ON UPDATE CASCADE;
