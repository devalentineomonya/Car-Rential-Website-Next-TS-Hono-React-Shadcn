import {clerkMiddleware, getAuth} from "@hono/clerk-auth";
import {zValidator} from "@hono/zod-validator";
import {createId} from "@paralleldrive/cuid2";
import {eq, inArray, and, or} from "drizzle-orm";
import {Hono} from "hono";
import {z} from "zod";

import {db} from "@/db/drizzle";
import {insertCarSchema, cars, users} from "@/db/schema";

const app = new Hono()
    .get("/", clerkMiddleware(), async (c) => {
        const auth = getAuth(c);
        if (!auth?.userId) {
            return c.json({success: false, message: "Unauthorized user"}, 401);
        }
        const fetchedCars = await db.query.cars.findMany({
            with: {
                owner: {
                    columns: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });

        return c.json({success: true, data: fetchedCars}, 200);
    })
    .get("/list", async (c) => {
        const query = c.req.query();

        const filters = {
            purpose: query.for?.split(",").filter(Boolean) || [],
            colors: query.color?.split(",").filter(Boolean) || [],
            categories: query.category?.split(",").filter(Boolean) || [],
            models: query.model?.split(",").filter(Boolean) || [],
            makes: query.make?.split(",").filter(Boolean) || [],
            fuelTypes: query.fuelType?.split(",").filter(Boolean) || [],
            drivetrains: query.drivetrain?.split(",").filter(Boolean) || [],
            limit: Number(query.limit) || 20,
        };

        const conditions = [];

        if (filters.purpose.length > 0) {
            const purposeConditions = filters.purpose
                .map((purpose) => {
                    switch (purpose.toLowerCase()) {
                        case "hire":
                            return eq(cars.isForHire, true);
                        case "rent":
                            return eq(cars.isForRent, true);
                        case "delivery":
                            return eq(cars.isForDelivery, true);
                    }
                })
                .filter(Boolean);

            if (purposeConditions.length > 0) {
                conditions.push(or(...purposeConditions));
            }
        }

        if (filters.colors.length > 0) {
            conditions.push(inArray(cars.color, filters.colors));
        }

        if (filters.categories.length > 0) {
            conditions.push(inArray(cars.bodyType, filters.categories));
        }

        if (filters.models.length > 0) {
            conditions.push(inArray(cars.model, filters.models));
        }

        if (filters.makes.length > 0) {
            conditions.push(inArray(cars.make, filters.makes));
        }

        if (filters.fuelTypes.length > 0) {
            conditions.push(inArray(cars.fuelType, filters.fuelTypes));
        }

        if (filters.drivetrains.length > 0) {
            conditions.push(inArray(cars.driveType, filters.drivetrains));
        }

        const queryBuilder = db.query.cars.findMany({
            columns: {
                id: true,
                name: true,
                images: true,
                isAvailable: true,
                pricePerDay: true,
                bodyType: true,
                transmission: true,
                fuelType: true,
                doors: true,
                make: true,
                model: true,
                features: true,
            },
            where: and(...conditions),
            limit: filters.limit,
        });

        const listedCars = await queryBuilder;

        return c.json({
            success: true,
            data: listedCars.map((car) => ({
                ...car,
                displayName: `${car.make} ${car.model}`,
                seatCount: car.doors,
            })),
            meta: {
                results: listedCars.length,
                limit: filters.limit,
            },
        });
    })
    .get(
        "/:id",
        zValidator(
            "param",
            z.object({
                id: z.string().optional(),
            }),
        ),
        async (c) => {
            const {id} = c.req.valid("param");
            if (!id) {
                return c.json(
                    {success: false, message: "Car ID is required"},
                    400,
                );
            }
            const car = await db.query.cars.findFirst({
                where: eq(cars.id, id),
                with: {
                    owner: {
                        columns: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            });
            if (!car) {
                return c.json({success: false, message: "Car not found"}, 404);
            }
            return c.json({success: true, data: car}, 200);
        },
    )
    .post(
        "/",
        clerkMiddleware(),
        zValidator(
            "json",
            z
                .object(insertCarSchema._def.schema.shape)
                .omit({
                    images: true,
                    dateManufactured: true,
                })
                .merge(
                    z.object({
                        images: z
                            .array(z.string())
                            .min(2, "At least one image is required")
                            .default([]),
                        dateManufactured: z.string(),
                    }),
                ),
        ),
        async (c) => {
            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json(
                    {success: false, message: "Unauthorized user"},
                    401,
                );
            }

            const body = c.req.valid("json");

            const user = await db.query.users.findFirst({
                where: eq(users.clerk_id, auth.userId),
            });
            if (!user) {
                return c.json({success: false, message: "User not found"}, 404);
            }
            const values = {
                ...body,
                ownerId: user.id,
                id: createId(),
            };

            const car = await db
                .insert(cars)
                .values({
                    ...values,
                    dateManufactured: new Date(values.dateManufactured),
                })
                .returning();
            return c.json({success: true, car}, 200);
        },
    )
    .put(
        "/",
        clerkMiddleware(),
        zValidator(
            "json",
            z
                .object(insertCarSchema._def.schema.shape)
                .omit({
                    images: true,
                })
                .merge(
                    z.object({
                        images: z
                            .array(z.string())
                            .min(2, "At least one image is required")
                            .default([]),
                        id: z.string(),
                    }),
                ),
        ),
        async (c) => {
            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json(
                    {success: false, message: "Unauthorized user"},
                    401,
                );
            }
            const body = c.req.valid("json");
            if (!body.id) {
                return c.json(
                    {success: false, message: "Car id is required"},
                    400,
                );
            }
            const car = await db.query.cars.findFirst({
                where: eq(cars.id, body.id),
            });
            if (!car) {
                return c.json({success: false, message: "car not found"}, 404);
            }
            const [response] = await db
                .update(cars)
                .set(body)
                .where(eq(cars.id, body.id))
                .returning();
            if (!response) {
                return c.json(
                    {success: false, data: "Failed to update car"},
                    500,
                );
            }

            return c.json({success: false, data: response});
        },
    )
    .delete(
        "/:id?",
        clerkMiddleware(),
        zValidator("param", z.object({id: z.string().optional()})),
        async (c) => {
            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json(
                    {success: false, message: "Unauthorized user"},
                    401,
                );
            }
            const {id} = c.req.valid("param");
            if (!id) {
                return c.json(
                    {success: false, message: "Car ID is required"},
                    400,
                );
            }

            const car = await db
                .delete(cars)
                .where(eq(cars.id, id))
                .returning()
                .then((res) => res[0]);

            if (!car) {
                return c.json(
                    {
                        success: false,
                        message: "Car not found or already deleted",
                    },
                    404,
                );
            }

            return c.json({
                success: true,
                message: "Car deleted successfully",
                data: car,
            });
        },
    );

export default app;
