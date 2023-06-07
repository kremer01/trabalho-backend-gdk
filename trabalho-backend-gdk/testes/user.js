const { 
    getAllUsers,
    createUser, 
    getUserByEmail, 
    updateUser, 
    deleteUser 
  } = require("../service/userService");
  const prisma = require("../db/prisma.js");
  
  jest.mock("../db/prisma.js", () => ({
    user: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }));
  
  describe("Teste de usuario", () => {
    it("Retornando todos os usuarios", async () => {
      prisma.user.findMany.mockResolvedValue([
        { 
          id: 1, 
          name: "User1", 
          email: "user1@email.com", 
          password: "test123" 
        },
        { 
          id: 2, 
          name: "User2", 
          email: "user2@email.com", 
          password: "test321" 
        },
      ]);
  
      const result = await getAllUsers();
  
      expect(result.length).toBe(2);
      expect(result[0].name).toBe("User1");
      expect(result[1].name).toBe("User2");
    });
  
    it("Retornando email do usuario", async () => {
      prisma.user.findFirst.mockResolvedValue({ 
          id: 1, 
          name: "User",
          email: "user@email.com", 
          password: "test123" 
        });
  
      const result = await getUserByEmail("user@email.com");
  
      expect(result.name).toBe("User");
      expect(result.email).toBe("user@email.com");
    });
  
    it("Usuario criado com sucesso", async () => {
  
      prisma.user.create.mockResolvedValue({ 
        id: 1, 
        name: "User", 
        email: "user@email.com", 
        password: "test123"
      });
  
      const result = await createUser({ 
        name: "User", 
        email: "user@email.com", 
        password: "test123"
      });
  
      expect(result.name).toBe("User", );
      expect(result.email).toBe("user@email.com", );
    });
  
    it("Usuario atualizado com sucesso", async () => {
  
      prisma.user.update.mockResolvedValue({ 
        id: 1, 
        name: "User", 
        email: "user@email.com", 
        password: "test123"
      });
  
      const result = await updateUser(1, { 
        name: "User", 
        email: "user@email.com", 
        password: "test123"
      });
  
      expect(result.name).toBe("User");
      expect(result.email).toBe("user@email.com", );
    });
  
    it("Usuario excluido com sucesso", async () => {
  
      prisma.user.delete.mockResolvedValue({ 
        id: 1, 
        name: "User", 
        email: "user@email.com", 
        password: "test123" 
      });
  
      const result = await deleteUser(1);
  
      expect(result.name).toBe("User");
      expect(result.email).toBe("user@email.com");
    });
  });