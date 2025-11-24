import { ITestRepository } from '../../domain/repositories/ITestRepository';
import { TestSlug } from '../../domain/value-objects/TestSlug';
import { LanguageCode } from '../../domain/value-objects/LanguageCode';
import { TestResponseDTO } from '../dto/TestDTO';

/**
 * Start Test Use Case
 * Returns test information by slug
 */
export class StartTestUseCase {
  constructor(private readonly testRepository: ITestRepository) {}

  async execute(slug: string, languageCode: string): Promise<TestResponseDTO> {
    const testSlug = new TestSlug(slug);
    const langCode = new LanguageCode(languageCode);
    
    const test = await this.testRepository.findBySlug(testSlug, langCode);
    
    if (!test) {
      throw new Error('Test not found');
    }

    return {
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
    };
  }
}

