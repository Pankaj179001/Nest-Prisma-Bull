/*
  Warnings:

  - Added the required column `body` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `body` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;
