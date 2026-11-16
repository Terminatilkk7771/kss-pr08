import { ApiProperty } from '@nestjs/swagger';
import type { Comment } from '../comment.model.js';

/** Коментар до заявки (схема для документації). */
export class CommentEntity implements Comment {
  /**
   * Ідентифікатор коментаря
   * @example 1
   */
  @ApiProperty({
    type: 'integer',
    readOnly: true,
    description: 'Ідентифікатор коментаря',
    example: 1,
  })
  readonly id!: number;

  /**
   * Ідентифікатор заявки, до якої належить коментар
   * @example 1
   */
  @ApiProperty({
    type: 'integer',
    readOnly: true,
    description: 'Ідентифікатор заявки',
    example: 1,
  })
  readonly ticketId!: number;

  /**
   * Ідентифікатор автора коментаря
   * @example 3
   */
  @ApiProperty({
    type: 'integer',
    readOnly: true,
    description: 'Ідентифікатор автора коментаря',
    example: 3,
  })
  readonly authorId!: number;

  /**
   * Текст коментаря
   * @example "Замінили кабель"
   */
  @ApiProperty({
    description: 'Текст коментаря',
    example: 'Замінили кабель',
  })
  text!: string;

  /**
   * Дата і час створення коментаря
   * @example "2026-09-01T09:00:00.000Z"
   */
  @ApiProperty({
    format: 'date-time',
    readOnly: true,
    description: 'Дата і час створення коментаря',
    example: '2026-09-01T09:00:00.000Z',
  })
  readonly createdAt!: string;
}
