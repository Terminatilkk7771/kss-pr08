import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PRIORITIES,
  TICKET_STATUSES,
  type Priority,
  type Ticket,
  type TicketStatus,
} from '../ticket.model.js';

/** Заявка до служби технічної підтримки (схема для документації). */
export class TicketEntity implements Ticket {
  /**
   * Ідентифікатор заявки
   * @example 1
   */
  @ApiProperty({
    type: 'integer',
    readOnly: true,
    description: 'Ідентифікатор заявки',
    example: 1,
  })
  readonly id!: number;

  /**
   * Коротка назва проблеми
   * @example "Не працює проєктор в ауд. 214"
   */
  @ApiProperty({
    description: 'Коротка назва проблеми',
    example: 'Не працює проєктор в ауд. 214',
  })
  title!: string;

  /**
   * Докладний опис проблеми
   * @example "Немає сигналу з HDMI"
   */
  @ApiPropertyOptional({
    description: 'Докладний опис проблеми',
    example: 'Немає сигналу з HDMI',
  })
  description?: string;

  /**
   * Поточний стан заявки
   * @example "open"
   */
  @ApiProperty({
    enum: TICKET_STATUSES,
    enumName: 'TicketStatus',
    description: 'Поточний стан заявки',
    example: 'open',
  })
  status!: TicketStatus;

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
  priority!: Priority;

  /**
   * Ідентифікатор автора заявки
   * @example 2
   */
  @ApiProperty({
    type: 'integer',
    readOnly: true,
    description: 'Ідентифікатор автора заявки',
    example: 2,
  })
  authorId!: number;

  /**
   * Виконавець заявки; null – не призначено
   * @example 3
   */
  @ApiProperty({
    type: 'integer',
    nullable: true,
    description: 'Виконавець; null – не призначено',
    example: 3,
  })
  assigneeId!: number | null;

  /**
   * Дата і час створення заявки (ISO 8601)
   * @example "2026-09-01T08:15:00.000Z"
   */
  @ApiProperty({
    format: 'date-time',
    readOnly: true,
    description: 'Дата і час створення заявки',
    example: '2026-09-01T08:15:00.000Z',
  })
  createdAt!: string;

  /**
   * Дата і час останнього оновлення заявки (ISO 8601)
   * @example "2026-09-01T08:15:00.000Z"
   */
  @ApiProperty({
    format: 'date-time',
    readOnly: true,
    description: 'Дата і час останнього оновлення заявки',
    example: '2026-09-01T08:15:00.000Z',
  })
  updatedAt!: string;

  /**
   * Теги заявки
   * @example ["обладнання", "аудиторія"]
   */
  @ApiProperty({
    type: [String],
    description: 'Теги заявки',
    example: ['обладнання', 'аудиторія'],
  })
  tags!: string[];
}
