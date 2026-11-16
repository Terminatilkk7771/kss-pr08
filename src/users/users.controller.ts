import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { Roles } from '../auth/roles.decorator.js';
import {
  ApiPageResponse,
  ApiProblemResponses,
} from '../common/api/api-docs.decorators.js';
import { ParsePositiveIntPipe } from '../common/http/parse-positive-int.pipe.js';
import { PageQueryDto } from '../common/page-query.dto.js';
import { paginate, type Page } from '../common/page.js';
import { UserEntity } from './entities/user.entity.js';
import type { User } from './user.model.js';
import { UsersService } from './users.service.js';

@ApiTags('users')
@ApiBearerAuth()
@ApiProblemResponses(401)
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'Список користувачів системи' })
  @ApiPageResponse(UserEntity, 'Сторінка користувачів')
  @ApiProblemResponses(403, 422)
  listUsers(@Query() query: PageQueryDto): Page<User> {
    return paginate(this.users.findAll(), query.page ?? 1, query.pageSize ?? 10);
  }

  /** Статичний маршрут оголошено ДО параметризованого :userId. */
  @Get('me')
  @ApiOperation({ summary: 'Поточний автентифікований користувач' })
  @ApiOkResponse({ description: 'Профіль поточного користувача', type: UserEntity })
  getCurrentUser(@CurrentUser() user: User): User {
    return user;
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Отримати користувача за ідентифікатором' })
  @ApiOkResponse({ description: 'Користувач', type: UserEntity })
  @ApiProblemResponses(400, 404)
  getUser(@Param('userId', ParsePositiveIntPipe) userId: number): User {
    return this.users.findOne(userId);
  }
}
