/*
  Warnings:

  - A unique constraint covering the columns `[driver_license]` on the table `drivers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[license_plate]` on the table `drivers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "drivers_driver_license_key" ON "drivers"("driver_license");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_license_plate_key" ON "drivers"("license_plate");
