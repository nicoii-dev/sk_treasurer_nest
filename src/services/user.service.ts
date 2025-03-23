import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/zod-validation/user.schema';
import { User } from 'src/entities/user.entities';
import * as bcrypt from 'bcrypt';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      // customize error response
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Email is already taken',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }

    const { firstName, lastName, age, dob, email, password } = createUserDto;
    // Hash password

    let hashedPassword = '';
    try {
      const saltRounds = 10;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      hashedPassword = await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Password hashing failed'); // Ensure proper error handling
    }

    // Create user instance
    const newUser = this.userRepository.create({
      firstName,
      lastName,
      age,
      dob,
      email,
      password: hashedPassword,
    });

    // Save to database
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(existingUser, updateUserDto);
    return await this.userRepository.save(userData);
  }

  async remove(id: string): Promise<User> {
    const existingUser = await this.findOne(id);
    return await this.userRepository.remove(existingUser);
  }

  async validateEmail(email: string): Promise<User> {
    const userData = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }
}
