import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

/** Параметри пагінації – базовий клас для DTO запитів до колекцій. */
export class PageQueryDto {
  /**
   * Номер сторінки (починаючи з 1)
   * @example 1
   */
  @ApiPropertyOptional({
    description: 'Номер сторінки (починаючи з 1)',
    minimum: 1,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  /**
   * Кількість елементів на сторінці
   * @example 10
   */
  @ApiPropertyOptional({
    description: 'Кількість елементів на сторінці',
    minimum: 1,
    maximum: 50,
    default: 10,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  pageSize?: number = 10;
}
