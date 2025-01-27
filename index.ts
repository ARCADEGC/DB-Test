import { drizzle } from "drizzle-orm/neon-http";
import { products, vendors } from "./db/schema";
import { sql, eq } from "drizzle-orm";

export const db = drizzle(process.env.DATABASE_URL!);

async function timed(func: Function) {
    const startTime = performance.now();

    console.log(await func());

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`${executionTime.toFixed(2)}ms`);
}

async function insert(n: number) {
    for (let i = 0; i < n; i++) {
        console.log(i);

        await db.insert(products).values({ name: "p", price: "1.00", vendorId: 2 });
    }
}

async function print() {
    return await db
        .select({
            vendorName: vendors.name,
            count: sql<number>`cast(count(${products.id}) as integer)`,
        })
        .from(vendors)
        .leftJoin(products, eq(products.vendorId, vendors.id))
        .groupBy(vendors.id);
}

async function main() {
    timed(() => insert(10));

    // timed(() => insert(100));

    // timed(() => insert(1_000));

    // timed(() => insert(10_000));

    // timed(() => insert(100_000));

    // timed(() => insert(1_000_000));

    // timed(() => insert(10_000_000));
}

main();
