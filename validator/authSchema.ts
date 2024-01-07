import vine from "@vinejs/vine";

export const registerSchema = vine.object({
    name: vine.string().trim().minLength(3).maxLength(30),
    email: vine.string().email(),
    password: vine.string().minLength(6).maxLength(25).confirmed()
})

export const loginSchema = vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6).maxLength(25)
})

export const resetSchema = vine.object({
    password:vine.string().minLength(6).maxLength(25).confirmed()
})

export const fotgotSchema= vine.object({
    email:vine.string().email()
})