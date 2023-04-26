/*
  Warnings:

  - You are about to drop the column `first_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `userprofile` table. All the data in the column will be lost.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `userprofile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `userprofile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    ADD COLUMN `username` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `userprofile` DROP COLUMN `username`,
    ADD COLUMN `first_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(255) NOT NULL;
