import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { Product } from "@prisma/client";
const prisma = new PrismaClient();

interface IParams {
    params: {
        id: string;
    };
}

export async function DELETE(req: Request, { params }: IParams) {
    const product = await prisma.product.delete({
        where: {
            id: Number(params.id),
        },
    });

    return NextResponse.json(product, { status: 200 });
}

export async function PATCH(req: Request, { params }: IParams) {
    const body: Product = await req.json();

    const product = await prisma.product.update({
        where: {
            id: Number(params.id),
        },
        data: {
            title: body.title,
            price: body.price,
            brandId: body.brandId,
        },
    });

    return NextResponse.json(product, { status: 200 });
}
