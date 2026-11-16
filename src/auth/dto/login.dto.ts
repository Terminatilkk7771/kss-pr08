import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/** Облікові дані для входу в систему. */
export class LoginDto {
  /**
   * Електронна пошта користувача
   * @example "a.petrenko@college.example.ua"
   */
  @ApiProperty({
    format: 'email',
    description: 'Електронна пошта користувача',
    example: 'a.petrenko@college.example.ua',
  })
  @IsEmail()
  email!: string;

  /**
   * Пароль користувача
   * @example "student123"
   */
  @ApiProperty({
    format: 'password',
    description: 'Пароль користувача',
    example: 'student123',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
