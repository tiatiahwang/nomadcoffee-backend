/*
  Warnings:

  - A unique constraint covering the columns `[coffeeShopId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_coffeeShopId_userId_key" ON "Like"("coffeeShopId", "userId");
