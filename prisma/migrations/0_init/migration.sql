-- CreateTable
CREATE TABLE `address` (
    `addressId` INTEGER NOT NULL AUTO_INCREMENT,
    `state` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `street` VARCHAR(255) NOT NULL,
    `profile` INTEGER NULL,

    UNIQUE INDEX `profile`(`profile`),
    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `created_at` DATE NULL,
    `updated_at` DATE NULL,
    `USERID` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`USERID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userprofile` (
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(25) NOT NULL,
    `profile` INTEGER NULL,
    `userprofile_Id` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `profile`(`profile`),
    PRIMARY KEY (`userprofile_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`profile`) REFERENCES `userprofile`(`profile`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `userprofile` ADD CONSTRAINT `userprofile_ibfk_1` FOREIGN KEY (`profile`) REFERENCES `user`(`USERID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

