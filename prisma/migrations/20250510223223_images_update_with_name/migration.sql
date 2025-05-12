-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "name" TEXT,
ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "Image_id_key";
