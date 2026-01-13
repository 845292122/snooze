import { z } from 'zod'

export const createCustomerSchema = z.object({
  name: z.string().min(1, '姓名不能为空'),
  age: z.number().int().positive('年龄必须为正整数'),
  email: z.email('请输入有效的电子邮件地址'),
  phone: z.string('请输入正确格式的电话').min(11, '电话号码至少需要11位数字'),
  gender: z.enum(['0', '1', '2'], '请输入符合条件的性别').optional(), // 0: 未知, 1: 男, 2: 女
  address: z.string().max(255, '地址不能超过255个字符').optional()
})

export const updateCustomerSchema = createCustomerSchema.extend({
  id: z.number().int().positive('无效的客户ID')
})

export const createOrderSchema = z.object({
  customerId: z.number().int().positive('无效的客户ID'),
  orderDate: z.string().optional(),
  status: z.enum(['pending', 'completed', 'canceled'], '请输入符合条件的订单状态').optional(),
  totalAmount: z.number().int().nonnegative('总金额不能为负数').optional()
})

export const updateOrderSchema = createOrderSchema.extend({
  id: z.number().int().positive('无效的订单ID')
})

export const createCustomerWithOrdersSchema = z.object({
  customer: createCustomerSchema,
  orders: createOrderSchema.omit({ customerId: true }).optional()
})

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>
export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>
export type CreateCustomerWithOrdersInput = z.infer<typeof createCustomerWithOrdersSchema>
