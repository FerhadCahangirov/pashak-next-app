import { ICategory } from "@/lib/models/ICategory";
import { IProductDetails } from "@/lib/models/IProduct";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request,
    { params }: { params: Promise<{ id: string }> }) {

    try {
        // Parse the `id` as an integer
        const id = parseInt((await params).id, 10);

        // If the `id` is not a valid number, return a 400 Bad Request response
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        // Find the existing product
        const product = await prisma.product.findFirst({
            where: {
                id: id,
            },
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
                        id: true,
                        src: true,
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

        // If the product doesn't exist, return a 404 response
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const relatedProducts = await prisma.product.findMany({
            where: {
                categoryId: product.category.id,
                id: {
                    not: product.id
                }
            },
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
                description: true,
                images: {
                    select: {
                        id: true,
                        src: true,
                    },
                },
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


        const mappedProductDetails: IProductDetails = {
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
            }),
            relatedProducts: relatedProducts.map(relatedProduct => {
                return {
                    id: relatedProduct.id,
                    name: relatedProduct.name,
                    content: relatedProduct.content,
                    category: relatedProduct.category as ICategory,
                    images: relatedProduct.images.map(image => {
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
                }
            })
        };

        return NextResponse.json(
            { product: mappedProductDetails },
            { status: 200 }
        );
    }
    catch (error) {
        console.error("Error deleting product image:", error);
        return NextResponse.json(
            { error: "Failed to delete product image" },
            { status: 500 }
        );
    }

}