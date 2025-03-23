import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  age: z.number().min(18),
  dob: z.string().date(),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export type CreateUserDto = z.infer<typeof UserSchema>;
