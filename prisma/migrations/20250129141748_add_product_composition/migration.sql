/*
  Warnings:

  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `description` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `Compositions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductCompositions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `compositionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductCompositions` ADD CONSTRAINT `ProductCompositions_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCompositions` ADD CONSTRAINT `ProductCompositions_compositionId_fkey` FOREIGN KEY (`compositionId`) REFERENCES `Compositions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
