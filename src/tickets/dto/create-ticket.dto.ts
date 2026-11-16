import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsIn,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { PRIORITIES, type Priority } from '../ticket.model.js';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

/** Дані для створення нової заявки. */
export class CreateTicketDto {
  /**
   * Коротка назва проблеми (1–80 символів після обрізання пробілів)
   * @example "Не працює проєктор в ауд. 214"
   */
  @ApiProperty({
    minLength: 1,
    maxLength: 80,
    description: 'Коротка назва проблеми',
    example: 'Не працює проєктор в ауд. 214',
  })
  @Transform(trim)
  @IsString()
  @Length(1, 80, { message: 'назва – від 1 до 80 символів' })
  title!: string;

  /**
   * Докладний опис проблеми (до 500 символів)
   * @example "Немає сигналу з HDMI"
   */
  @ApiPropertyOptional({
    maxLength: 500,
    description: 'Докладний опис проблеми',
    example: 'Немає сигналу з HDMI',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  /**
   * Пріоритет заявки
   * @example "high"
   */
  @ApiProperty({
    enum: PRIORITIES,
    enumName: 'Priority',
    description: 'Пріоритет заявки',
    example: 'high',
  })
  @IsIn(PRIORITIES, { message: `пріоритет – одне з: ${PRIORITIES.join(', ')}` })
  priority!: Priority;

  /**
   * Теги заявки (до 10 рядків)
   * @example ["обладнання", "аудиторія"]
   */
  @ApiPropertyOptional({
    type: [String],
    maxItems: 10,
    description: 'Теги заявки',
    example: ['обладнання', 'аудиторія'],
  })
  @IsOptional()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  tags?: string[];
}
