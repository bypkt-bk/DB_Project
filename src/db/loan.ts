import { Hono } from "hono";
import { PrismaClient, Loan } from "@prisma/client";

const loan = new Hono();
const prisma = new PrismaClient();

loan.get("/", async (c) => {
    const result = await prisma.loan.findMany();
    return c.json({ result });
  });

loan.get("/:id", async (c) => {
    const loanId = parseInt(c.req.param('id'));
    const loan = await prisma.loan.findUnique({
        where: {
            loan_id: loanId
        }
    });
    if (!loan) {
        return c.json({ error: 'Loan not found' }, 404);
    }
    return c.json({ loan });
});

  
loan.post("/", async (c) => {
  const input: Loan = await c.req.json();

  console.log(input)

  await prisma.loan.create({
    data: input,
  });

  return c.text("Create success");
});

loan.patch("/update/:id", async (c) => {
  const loanId = parseInt(c.req.param('id')); // Extract loan ID from URL params
  const input = await c.req.json();

  try {
      const updatedLoan = await prisma.loan.update({
          where: {
              loan_id: loanId // Use loan ID to identify the loan record
          },
          data: {
              // Check if each field is present in the input and update accordingly
              ...(input.user_id && { user_id: input.user_id }),
              ...(input.book_id && { book_id: input.book_id }),
              ...(input.loan_date && { loan_date: input.loan_date }),
              ...(input.due_date && { due_date: input.due_date }),
              ...(input.return_date && { return_date: input.return_date }),
              ...(input.loan_status && { loan_status: input.loan_status })
              // Add other fields you want to update here
          }
      });
      
      return c.json({ result: "Update success", updatedLoan }, 200);
  } catch (error) {
      // Handle errors, e.g., record not found, database error, etc.
      return c.json({ error: "Failed to update loan record" }, 500);
  }
});






export default loan;