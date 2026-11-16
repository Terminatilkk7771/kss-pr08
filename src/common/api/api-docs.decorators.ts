import { applyDecorators, type Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ProblemDetailsEntity } from '../entities/problem-details.entity.js';

const PROBLEM_DESCRIPTIONS: Readonly<Record<number, string>> = {
  400: 'Некоректний запит',
  401: 'Необхідна автентифікація',
  403: 'Доступ заборонено',
  404: 'Ресурс не знайдено',
  409: 'Конфлікт стану ресурсу',
  422: 'Помилка валідації вхідних даних',
};

export function ApiProblemResponses(...codes: number[]) {
  return applyDecorators(
    ApiExtraModels(ProblemDetailsEntity),
    ...codes.map((status) =>
      ApiResponse({
        status,
        description: PROBLEM_DESCRIPTIONS[status] ?? 'Помилка запиту',
        content: {
          'application/problem+json': {
            schema: { $ref: getSchemaPath(ProblemDetailsEntity) },
          },
        },
      }),
    ),
  );
}

export function ApiPageResponse<TModel extends Type<unknown>>(
  model: TModel,
  description = 'Сторінка елементів колекції',
) {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      description,
      schema: {
        type: 'object',
        required: ['items', 'page', 'pageSize', 'total'],
        properties: {
          items: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
          page: { type: 'integer', minimum: 1, example: 1 },
          pageSize: { type: 'integer', minimum: 1, maximum: 50, example: 10 },
          total: { type: 'integer', minimum: 0, example: 6 },
        },
      },
    }),
  );
}

export function ApiCreatedWithLocation<TModel extends Type<unknown>>(
  model: TModel,
  description = 'Ресурс успішно створено',
) {
  return applyDecorators(
    ApiExtraModels(model),
    ApiCreatedResponse({
      description,
      type: model,
      headers: {
        Location: {
          description: 'Адреса створеного ресурсу',
          schema: {
            type: 'string',
            format: 'uri-reference',
            example: '/api/v1/tickets/7',
          },
        },
      },
    }),
  );
}
