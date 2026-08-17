import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, registrationsTable } from "@workspace/db";
import {
  CreateRegistrationBody,
  CreateRegistrationResponse,
  ListRegistrationsResponse,
  GetRegistrationStatsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const SPOTS_TOTAL = 40;

function serialize(row: typeof registrationsTable.$inferSelect) {
  return {
    id: row.id,
    fullName: row.fullName,
    whatsapp: row.whatsapp,
    email: row.email,
    city: row.city,
    birthYear: row.birthYear,
    experienceLevel: row.experienceLevel,
    message: row.message,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  };
}

router.post("/registrations", async (req, res) => {
  const parsed = CreateRegistrationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Dados inválidos. Verifique o formulário." });
    return;
  }

  try {
    const [row] = await db
      .insert(registrationsTable)
      .values({
        fullName: parsed.data.fullName.trim(),
        whatsapp: parsed.data.whatsapp.trim(),
        email: parsed.data.email?.trim() || null,
        city: parsed.data.city?.trim() || null,
        birthYear: parsed.data.birthYear ?? null,
        experienceLevel: parsed.data.experienceLevel,
        message: parsed.data.message?.trim() || null,
      })
      .returning();

    res.status(201).json(CreateRegistrationResponse.parse(serialize(row!)));
  } catch (err) {
    req.log.error({ err }, "Failed to create registration");
    res.status(500).json({ error: "Erro ao enviar inscrição. Tente novamente." });
  }
});

router.get("/registrations", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(registrationsTable)
      .orderBy(desc(registrationsTable.createdAt));
    res.json(ListRegistrationsResponse.parse(rows.map(serialize)));
  } catch (err) {
    req.log.error({ err }, "Failed to list registrations");
    res.status(500).json({ error: "Erro ao listar inscrições." });
  }
});

router.get("/registrations/stats", async (req, res) => {
  try {
    const rows = await db.select({ id: registrationsTable.id }).from(registrationsTable);
    res.json(
      GetRegistrationStatsResponse.parse({
        total: rows.length,
        spotsTotal: SPOTS_TOTAL,
      }),
    );
  } catch (err) {
    req.log.error({ err }, "Failed to get registration stats");
    res.status(500).json({ error: "Erro ao carregar estatísticas." });
  }
});

export default router;
