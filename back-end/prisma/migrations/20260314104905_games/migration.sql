-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "first_release_date" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "min_requirements" TEXT NOT NULL,
    "max_requirements" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "genres" JSONB,
    "platforms" JSONB,
    "screenshots" JSONB,
    "videos" JSONB,
    "companies" JSONB,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
