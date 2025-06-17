/*
  Warnings:

  - You are about to drop the column `url` on the `Pregunta` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Pregunta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pregunta" DROP COLUMN "url",
ADD COLUMN     "imagenUrl" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Respuesta" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "imagenUrl" TEXT,
    "preguntaId" INTEGER NOT NULL,

    CONSTRAINT "Respuesta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respuesta" ADD CONSTRAINT "Respuesta_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
