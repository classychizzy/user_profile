/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `userprofile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `userprofile_id_key` ON `userprofile`(`id`);
