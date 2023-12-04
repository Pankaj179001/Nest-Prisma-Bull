-- AlterTable
ALTER TABLE `user` ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL DEFAULT 'null',
    ADD COLUMN `token` VARCHAR(191) NOT NULL DEFAULT 'null';
