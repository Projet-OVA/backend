-- CreateTable
CREATE TABLE "public"."course_attachments" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "attachmentId" TEXT NOT NULL,

    CONSTRAINT "course_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_attachments_courseId_attachmentId_key" ON "public"."course_attachments"("courseId", "attachmentId");

-- AddForeignKey
ALTER TABLE "public"."course_attachments" ADD CONSTRAINT "course_attachments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."course_attachments" ADD CONSTRAINT "course_attachments_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "public"."attachments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
