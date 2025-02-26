/*
  Warnings:

  - Added the required column `name` to the `FlashSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlashSale" ADD COLUMN     "name" TEXT NOT NULL;
