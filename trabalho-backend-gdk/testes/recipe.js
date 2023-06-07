const {
    getAllRecipesByUser,
    createRecipe,
    updateUserRecipe,
    deleteUserRecipe
  } = require("../service/recipeService");
  const prisma = require("../db/prisma.js");
  
  jest.mock("../db/prisma.js", () => ({
    recipe: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      updateMany: jest.fn(),
      deleteMany: jest.fn(),
    },
  }));
  
  describe("Teste de receitas", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("retornando todas as receitas do usuario", async () => {
      const mockedRecipes = [
        { id: 1, name: "Receita-1" },
        { id: 2, name: "Receita-2" },
      ];
  
      prisma.recipe.findMany.mockResolvedValue(mockedRecipes);
  
      const userId = 123;
      const result = await getAllRecipesByUser(userId);
  
      expect(result).toEqual(mockedRecipes);
      expect(prisma.recipe.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.recipe.findMany).toHaveBeenCalledWith({
        where: { userId }
      });
    });
  
    it("Nova receita criada com sucesso", async () => {
      const newRecipe = {
        name: "Receita",
        description: "Descrição",
        preparationTime: 30,
      };
      const createdRecipe = { id: 1, ...newRecipe };
  
      prisma.recipe.create.mockResolvedValue(createdRecipe);
  
      const userId = 123;
      const result = await createRecipe(newRecipe, userId);
  
      expect(result).toEqual(createdRecipe);
      expect(prisma.recipe.create).toHaveBeenCalledTimes(1);
      expect(prisma.recipe.create).toHaveBeenCalledWith({
        data: {
          ...newRecipe,
          userId,
        }
      });
    });
  
    it("Receita atualizada com sucesso", async () => {
      const recipeId = 1;
      const updatedRecipe = {
        id: recipeId,
        name: "Receita",
        description: "Descrição",
        preparationTime: 30,
      };
    
      prisma.recipe.updateMany.mockResolvedValue(updatedRecipe);
    
      const userId = 123;
      const result = await updateUserRecipe(recipeId, updatedRecipe, userId);
    
      delete updatedRecipe.id;
    
      expect(result).toEqual(updatedRecipe);  
      expect(prisma.recipe.updateMany).toHaveBeenCalledTimes(1);
      expect(prisma.recipe.updateMany).toHaveBeenCalledWith({
        where: { id: recipeId, userId },
        data: updatedRecipe
      });
    });
  
    it("Receita excluida com sucesso", async () => {
      const recipeId = 1;
      const deletedRecipe = { id: recipeId, name: "Receita" };
  
      prisma.recipe.deleteMany.mockResolvedValue(deletedRecipe);
  
      const userId = 123;
      const result = await deleteUserRecipe(recipeId, userId);
  
      expect(result).toEqual(deletedRecipe);
      expect(prisma.recipe.deleteMany).toHaveBeenCalledTimes(1);
      expect(prisma.recipe.deleteMany).toHaveBeenCalledWith({
        where: { id: recipeId, userId }
      });
    });
  });