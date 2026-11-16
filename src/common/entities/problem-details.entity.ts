import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Опис помилки у форматі RFC 9457 (application/problem+json). */
export class ProblemDetailsEntity {
  /**
   * URI типу проблеми
   * @example "about:blank"
   */
  @ApiProperty({ example: 'about:blank' })
  type!: string;

  /**
   * Короткий заголовок класу помилки
   * @example "Помилка валідації даних"
   */
  @ApiProperty({ example: 'Помилка валідації даних' })
  title!: string;

  /**
   * Числовий HTTP-код стану
   * @example 422
   */
  @ApiProperty({ type: 'integer', example: 422 })
  status!: number;

  /**
   * Детальний опис конкретної помилки
   * @example "Дані не відповідають вимогам"
   */
  @ApiProperty({ example: 'Дані не відповідають вимогам' })
  detail!: string;

  /**
   * Шлях запиту, під час якого виникла помилка
   * @example "/api/v1/tickets"
   */
  @ApiProperty({ example: '/api/v1/tickets' })
  instance!: string;

  /**
   * Ідентифікатор запиту для трасування в журналі
   * @example "9f3c2a10-4b7d-4e1a-8c3b-1234567890ab"
   */
  @ApiPropertyOptional({ example: '9f3c2a10-4b7d-4e1a-8c3b-1234567890ab' })
  requestId?: string;
}
