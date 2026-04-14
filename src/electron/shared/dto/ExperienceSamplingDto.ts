import type { ExperienceSamplingAnswerType } from '../StudyConfiguration';

export default interface ExperienceSamplingDto {
  id: string;
  question: string;
  answerType: ExperienceSamplingAnswerType;
  responseOptions: string | null;
  scale: number | null;
  response: string | null;
  question2: string | null;
  answerType2: ExperienceSamplingAnswerType | null;
  responseOptions2: string | null;
  scale2: number | null;
  response2: string | null;
  skipped: boolean;
  promptedAt: Date | string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null | undefined;
}
