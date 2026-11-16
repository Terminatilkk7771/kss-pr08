import { ApiProperty } from '@nestjs/swagger';

/** Відповідь із токеном доступу після успішного входу. */
export class TokenEntity {
  /**
   * Токен доступу (UUID)
   * @example "2f1c9a54-8d3e-4b7a-9f1e-6c2d8a4b0e71"
   */
  @ApiProperty({
    description: 'Токен доступу',
    example: '2f1c9a54-8d3e-4b7a-9f1e-6c2d8a4b0e71',
  })
  accessToken!: string;

  /**
   * Тип схеми авторизації
   * @example "Bearer"
   */
  @ApiProperty({
    description: 'Схема авторизації',
    enum: ['Bearer'],
    example: 'Bearer',
  })
  tokenType!: 'Bearer';

  /**
   * Час дії токена в секундах
   * @example 3600
   */
  @ApiProperty({
    type: 'integer',
    description: 'Час дії токена в секундах',
    example: 3600,
  })
  expiresIn!: number;
}
