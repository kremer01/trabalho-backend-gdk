const z = require("zod");

const UserSchema = z.object({
  name: z.string({
    required_error: "Nome Obrigatorio",
    invalid_type_error: "O Nome deve ser no formato -STRING-",
  })
    .min(3),
  email: z.string({
    required_error: "Descrição Obrigatoria",
    invalid_type_error: "A Descrição deve ser no formato -STRING-",
  })
    .email("Email invalido"), 
  password: z.string({
    required_error: "Senha Obrigatoria",
    invalid_type_error: "A Senha deve ser no formato -STRING-",
  })
    .min(6, "Deve ter no minimo 6 caracteres")
    .regex(new RegExp('ex:[A-Z]'), "Um caracter maiusculo")
    .regex(new RegExp('ex:[a-z]'), "Um caracter minusculo")
    .regex(new RegExp('ex:[0-9]'), "Um numero")
    .regex(new RegExp('ex:[!@#$%^]'), "Um caracter especial"),
});

module.exports = {
  UserSchema
}