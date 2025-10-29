import { Router } from "express";

const router = Router();

// /api/health
router.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

export default router;