import {
  CreateCourseDto,
  UpdateCourseDto,
  UploadAttachmentDto,
} from "../../dto/request";
import {
  CourseCreateResponseDto,
  CourseUpdateResponseDto,
  CourseDeleteResponseDto,
  CourseDetailResponseDto,
  CourseListResponseDto,
  AttachmentUploadResponseDto,
} from "../../dto/response";

export const ICourseService = Symbol("ICourseService");

export interface ICourseService {
  /**
   * Créer un nouveau cours
   * @param createCourseDto - Données du cours à créer
   * @param creatorId - ID de l'utilisateur créateur
   * @returns Promise avec le cours créé
   */
  createCourse(
    createCourseDto: CreateCourseDto,
    creatorId: string,
  ): Promise<CourseCreateResponseDto>;

  /**
   * Récupérer tous les cours
   * @returns Promise avec la liste des cours
   */
  findAllCourses(): Promise<CourseListResponseDto>;

  /**
   * Récupérer un cours par son ID
   * @param id - ID du cours
   * @returns Promise avec le cours
   */
  findCourseById(id: string): Promise<CourseDetailResponseDto>;

  /**
   * Mettre à jour un cours
   * @param id - ID du cours à mettre à jour
   * @param updateCourseDto - Données de mise à jour
   * @param userId - ID de l'utilisateur effectuant la mise à jour
   * @returns Promise avec le cours mis à jour
   */
  updateCourse(
    id: string,
    updateCourseDto: UpdateCourseDto,
    userId: string,
  ): Promise<CourseUpdateResponseDto>;

  /**
   * Supprimer un cours
   * @param id - ID du cours à supprimer
   * @param userId - ID de l'utilisateur effectuant la suppression
   * @returns Promise avec le résultat de la suppression
   */
  deleteCourse(id: string, userId: string): Promise<CourseDeleteResponseDto>;

  /**
   * Uploader une pièce jointe pour un cours
   * @param courseId - ID du cours
   * @param file - Fichier à uploader
   * @param uploadDto - Métadonnées de la pièce jointe
   * @param userId - ID de l'utilisateur effectuant l'upload
   * @returns Promise avec la pièce jointe uploadée
   */
  uploadAttachment(
    courseId: string,
    file: Express.Multer.File,
    uploadDto: UploadAttachmentDto,
    userId: string,
  ): Promise<AttachmentUploadResponseDto>;

  /**
   * Supprimer une pièce jointe d'un cours
   * @param courseId - ID du cours
   * @param attachmentId - ID de la pièce jointe
   * @param userId - ID de l'utilisateur effectuant la suppression
   * @returns Promise avec le résultat de la suppression
   */
  deleteAttachment(
    courseId: string,
    attachmentId: string,
    userId: string,
  ): Promise<CourseUpdateResponseDto>;

  /**
   * Vérifier si un utilisateur peut modifier un cours
   * @param id - ID du cours
   * @param userId - ID de l'utilisateur
   * @returns Promise avec le résultat de la vérification
   */
  canUserModifyCourse(id: string, userId: string): Promise<boolean>;
}
