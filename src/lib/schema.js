import * as z from 'zod';

export const userProfileSchema = z.object({
  name: z.string().min(1, 'Tên là bắt buộc'),
  email: z.string().email('Email không hợp lệ'),
  location: z.string().optional(),
  language: z.string().optional(),
  description: z
    .string()
    .max(250, 'Mô tả không được vượt quá 250 ký tự')
    .optional(),
});
