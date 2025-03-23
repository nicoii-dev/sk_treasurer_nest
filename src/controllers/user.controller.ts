import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserDto, UserSchema } from 'src/zod-validation/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Validate request data using Zod
    const result = UserSchema.safeParse(createUserDto);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }

    await this.userService.register(createUserDto);
  }

  @Get()
  async findAll() {
    try {
      const data = await this.userService.findAll();
      return {
        success: true,
        data,
        message: 'User Fetched Successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      } else {
        return {
          success: false,
          message: 'An unknown error occurred',
        };
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(id);
      return {
        success: true,
        data,
        message: `User ${id}`,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      } else {
        return {
          success: false,
          message: 'An unknown error occurred',
        };
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    try {
      await this.userService.update(id, updateUserDto);
      return {
        success: true,
        message: 'User Updated Successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      } else {
        return {
          success: false,
          message: 'An unknown error occurred',
        };
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(id);
      return {
        success: true,
        message: 'User Deleted Successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      } else {
        return {
          success: false,
          message: 'An unknown error occurred',
        };
      }
    }
  }
}
