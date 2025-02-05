import { withAuth } from "../middleware/with-auth";
import { procedure } from "../trpc";

export const authProcedure = procedure.use(withAuth);
