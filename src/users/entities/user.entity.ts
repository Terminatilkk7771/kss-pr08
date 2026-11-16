import { ApiProperty } from '@nestjs/swagger';
import type { Role, User } from '../user.model.js';

export const USER_ROLES: readonly Role[] = ['student', 'teacher', 'admin'];

/** Користувач системи технічної підтримки (схема для документації). */
export class UserEntity implements User {
  /**
   * Унікальний ідентифікатор користувача
   * @example 1
   */
  @ApiProperty({
    type: 'integer',
    readOnly: true,
    description: 'Унікальний ідентифікатор користувача',
    example: 1,
  })
  readonly id!: number;

  /**
   * Прізвище, ім’я та по батькові
   * @example "Петренко Андрій Іванович"
   */
  @ApiProperty({
    description: 'ПІБ користувача',
    example: 'Петренко Андрій Іванович',
  })
  fullName!: string;

  /**
   * Електронна пошта користувача
   * @example "a.petrenko@college.example.ua"
   */
  @ApiProperty({
    format: 'email',
    description: 'Електронна пошта користувача',
    example: 'a.petrenko@college.example.ua',
  })
  email!: string;

  /**
   * Роль користувача в системі
   * @example "student"
   */
  @ApiProperty({
    enum: USER_ROLES,
    enumName: 'UserRole',
    description: 'Роль користувача в системі',
    example: 'student',
  })
  role!: Role;
}
