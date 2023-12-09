import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import EditProduct from "./editProduct";

const prisma = new PrismaClient();

const getProducts = async () => {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand: true
        },
    })
    return products;
}

const getBrands = async () => {
    const brands = prisma.brand.findMany()
    return brands;
}

export default async function Product() {
    const [products, brands] = await Promise.all([getProducts(), getBrands()])
    return (
        <div>
            <div className="mb-2">
                <AddProduct brands={brands} />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.brand.name}</td>
                            <td className="flex gap-5 justify-center space-x-2">
                                <EditProduct brands={brands} product={product}/>
                                <DeleteProduct product={product}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};
