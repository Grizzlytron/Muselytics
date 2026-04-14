import { ExperienceSamplingResponseEntity } from '../entities/ExperienceSamplingResponseEntity';
import getMainLogger from '../../config/Logger';
import ExperienceSamplingDto from '../../../shared/dto/ExperienceSamplingDto';
import type { ExperienceSamplingAnswerType } from '../../../shared/StudyConfiguration';

const LOG = getMainLogger('ExperienceSamplingService');

export class ExperienceSamplingService {
  public async createExperienceSample(
    promptedAt: Date,
    question: string,
    answerType: ExperienceSamplingAnswerType,
    responseOptions: string | null,
    scale: number | null,
    response: string | undefined,
    question2: string | null,
    answerType2: ExperienceSamplingAnswerType | null,
    responseOptions2: string | null,
    scale2: number | null,
    response2: string | undefined,
    skipped: boolean = false
  ): Promise<void> {
    LOG.debug(
      `createExperienceSample: promptedAt=${promptedAt}, question=${question}, response=${response}, question2=${question2}, response2=${response2}, skipped=${skipped}`
    );
    await ExperienceSamplingResponseEntity.save({
      question,
      answerType,
      responseOptions,
      scale,
      response: response ?? null,
      question2,
      answerType2,
      responseOptions2,
      scale2,
      response2: response2 ?? null,
      promptedAt,
      skipped
    });
  }

  public async getMostRecentExperienceSamplingDtos(
    itemCount: number
  ): Promise<ExperienceSamplingDto[]> {
    const experienceSamplingResponses = await ExperienceSamplingResponseEntity.find({
      order: { promptedAt: 'DESC' },
      take: itemCount
    });
    return experienceSamplingResponses.map((response) => ({
      id: response.id,
      question: response.question,
      answerType: response.answerType,
      responseOptions: response.responseOptions,
      scale: response.scale,
      response: response.response,
      question2: response.question2,
      answerType2: response.answerType2,
      responseOptions2: response.responseOptions2,
      scale2: response.scale2,
      response2: response.response2,
      promptedAt: response.promptedAt,
      skipped: response.skipped,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      deletedAt: response.deletedAt
    }));
  }
}
