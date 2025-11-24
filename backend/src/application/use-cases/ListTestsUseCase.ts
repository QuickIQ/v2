import { ITestRepository } from '../../domain/repositories/ITestRepository';
import { ITranslationRepository } from '../../domain/repositories/ITranslationRepository';
import { LanguageCode } from '../../domain/value-objects/LanguageCode';
import { TestResponseDTO } from '../dto/TestDTO';

/**
 * List Tests Use Case
 * Returns all enabled tests with translations
 */
export class ListTestsUseCase {
  constructor(
    private readonly testRepository: ITestRepository,
    private readonly translationRepository: ITranslationRepository
  ) {}

  async execute(languageCode: string): Promise<TestResponseDTO[]> {
    const langCode = new LanguageCode(languageCode);
    const tests = await this.testRepository.findAll(langCode);

    return tests.map(test => ({
      id: test.id,
      name: test.name,
      slug: test.slug.toString(),
      category: test.category,
      testType: test.testType,
      isPremium: test.isPremium,
      priceCents: test.price.getCents(),
      defaultLanguage: test.defaultLanguage,
      enabled: test.enabled,
      orderIndex: test.orderIndex,
    }));
  }
}

