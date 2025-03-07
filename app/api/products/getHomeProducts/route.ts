import { ICategory } from "@/lib/models/ICategory";
import { IProduct } from "@/lib/models/IProduct";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
    try {
        const products = await prisma.product.findMany({
            take: 15,
            select: {
                id: true,
                name: true,
                content: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                images: {
                    select: {
                        src: true,
                        id: true
                    },
                },
                description: true,
                productCompositions: {
                    select: {
                        composition: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            },
        });

        // Map the Prisma result to the IProduct interface
        const mappedProducts: IProduct[] = products.map(product => ({
            id: product.id,
            name: product.name,
            content: product.content,
            category: product.category as ICategory,
            images: product.images.map(image => {
                return {
                    src: image.src,
                    id: image.id
                }
            }),
            description: product.description,
            compositions: product.productCompositions.map(productComposition => {
                return {
                    id: productComposition.composition.id,
                    name: productComposition.composition.name
                }
            })
        }));

        return NextResponse.json({
            products: mappedProducts,
        });
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}