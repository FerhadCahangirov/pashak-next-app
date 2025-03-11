import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid product image ID format" },
        { status: 400 }
      );
    }

    const productImage = await prisma.productImage.findUnique({
      where: { id }
    });

    if (!productImage) {
      return NextResponse.json(
        { error: "Product image not found" },
        { status: 404 }
      );
    }

    const productImages = await prisma.productImage.findMany({
      where: { productId: productImage.productId }
    });

    if (productImages.length <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the last image of a product" },
        { status: 400 }
      );
    }

    const imagePath = path.resolve(process.cwd(), "public", productImage.src);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await prisma.productImage.delete({ where: { id } });

    return NextResponse.json(
      { message: "Product image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product image:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while deleting the product image" },
      { status: 500 }
    );
  }
}
