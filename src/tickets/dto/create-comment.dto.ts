import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

/** Текст нового коментаря до заявки. */
export class CreateCommentDto {
  /**
   * Текст коментаря (1–1000 символів після обрізання пробілів)
   * @example "Замінили кабель"
   */
  @ApiProperty({
    minLength: 1,
    maxLength: 1000,
    description: 'Текст коментаря',
    example: 'Замінили кабель',
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Length(1, 1000)
  text!: string;
}
