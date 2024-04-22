/*
  Warnings:

  - You are about to drop the column `categoryId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categorieId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_categoryId_fkey`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `categoryId`,
    ADD COLUMN `categorieId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `images`;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
