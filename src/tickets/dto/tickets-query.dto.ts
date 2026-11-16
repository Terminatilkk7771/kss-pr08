import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { PageQueryDto } from '../../common/page-query.dto.js';
import {
  PRIORITIES,
  TICKET_STATUSES,
  type Priority,
  type TicketStatus,
} from '../ticket.model.js';

export const TICKET_SORTS = [
  'createdAt',
  '-createdAt',
  'priority',
  '-priority',
] as const;
export type TicketSort = (typeof TICKET_SORTS)[number];

/** Параметри фільтрації, сортування та пагінації колекції заявок. */
export class TicketsQueryDto extends PageQueryDto {
  /** Фільтр за станом заявки */
  @ApiPropertyOptional({
    enum: TICKET_STATUSES,
    enumName: 'TicketStatus',
    description: 'Фільтр за станом заявки',
  })
  @IsOptional()
  @IsIn(TICKET_STATUSES)
  status?: TicketStatus;

  /** Фільтр за пріоритетом */
  @ApiPropertyOptional({
    enum: PRIORITIES,
    enumName: 'Priority',
    description: 'Фільтр за пріоритетом',
  })
  @IsOptional()
  @IsIn(PRIORITIES)
  priority?: Priority;

  /** Фільтр за автором заявки */
  @ApiPropertyOptional({
    type: 'integer',
    minimum: 1,
    description: 'Фільтр за ідентифікатором автора',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  authorId?: number;

  /** Фільтр за виконавцем заявки */
  @ApiPropertyOptional({
    type: 'integer',
    minimum: 1,
    description: 'Фільтр за ідентифікатором виконавця',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  assigneeId?: number;

  /** Пошуковий рядок у назві та описі заявки */
  @ApiPropertyOptional({
    maxLength: 100,
    description: 'Пошук за підрядком у назві та описі',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string;

  /** Поле та напрям сортування */
  @ApiPropertyOptional({
    enum: TICKET_SORTS,
    default: '-createdAt',
    description: 'Поле та напрям сортування',
  })
  @IsOptional()
  @IsIn(TICKET_SORTS)
  sort?: TicketSort = '-createdAt';
}
