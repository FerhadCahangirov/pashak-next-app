/*
  Warnings:

  - Added the required column `src` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blog` ADD COLUMN `src` VARCHAR(191) NOT NULL;
