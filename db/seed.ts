import { db } from "@/index.ts";
import { vendors } from "./schema";

for (let i = 0; i < 1000; i++) {
    db.insert(vendors).values({ name: "Vendor " + i });
}
