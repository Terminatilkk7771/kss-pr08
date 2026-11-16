import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { TICKET_STATUSES, type TicketStatus } from '../ticket.model.js';

/** Новий стан заявки для дії переходу стану. */
export class ChangeStatusDto {
  /**
   * Цільовий стан заявки
   * @example "in_progress"
   */
  @ApiProperty({
    enum: TICKET_STATUSES,
    enumName: 'TicketStatus',
    description: 'Цільовий стан заявки',
    example: 'in_progress',
  })
  @IsIn(TICKET_STATUSES)
  status!: TicketStatus;
}
