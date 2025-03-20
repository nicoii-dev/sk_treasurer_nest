import { z } from 'zod';

const CreateUserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().email(),
  age: z.number().min(18),
  dob: z.string().date(),
});

export default CreateUserSchema;
