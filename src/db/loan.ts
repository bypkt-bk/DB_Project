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

loan.patch("/update", async (c) =>{
    const input : Loan = await c.req.json();

    const update_loan = await prisma.loan.update({
        where :{
            loan_id : input.loan_id
        },
        data : {
            loan_status : input.loan_status
        }
      
    })
    return c.json({result : "Update success"}, 200);
})




export default loan;