import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string()
              .min(2, { message: 'First name must be at least 2 characters' })
              .max(10, { message: 'First name must be at most 10 characters' }),
  lastName: z.string()
              .min(2, { message: 'Last name must be at least 2 characters' })
              .max(10, { message: 'Last name must be at most 10 characters' }),
  email: z.string().email({ message: 'Enter a valid email' }),
  phone: z.string().min(10, { message: 'Enter a valid phone number' }),
  address: z.string()
            .min(10, { message: 'Enter a valid address' })
            .max(50, { message: 'Address must be at most 50 characters' }),
  comment: z.string().max(300, { message: 'Comment must be at most 300 characters' })
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
