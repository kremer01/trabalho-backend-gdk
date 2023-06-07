const z = require("zod");

const RecipeSchema = z.object({
  name: z.string({
    required_error: "Nome Obrigatorio",
    invalid_type_error: "O Nome deve ser no formato -STRING- ",
  }),
  description: z.string({
    required_error: "Descrição Obrigatoria",
    invalid_type_error: "A Descrição deve ser no formato -STRING- ",
  }), 
  preparationTime: z.number({
    required_error: "Tempo de preparação Obrigatorio",
  }).min(0),
});

module.exports = {
  RecipeSchema
}