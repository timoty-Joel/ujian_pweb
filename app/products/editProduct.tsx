'use client'
import { SyntheticEvent, useState } from "react"
import type { Brand } from "@prisma/client";
import axios from 'axios';
import { useRouter } from "next/navigation";

interface IProduct {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

export default function EditProduct({ product, brands }: { product: IProduct; brands: Brand[] }) {
    const [isOpen, setIsOPen] = useState(false);
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [brand, setBrand] = useState(product.brandId);
    const router = useRouter()
    const handleModal = () => {
        setIsOPen(!isOpen)
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.patch(`/api/products/${product.id}`, {
            title: title,
            price: Number(price),
            brandId: Number(brand)
        })
        router.refresh();
        setIsOPen(false);
    }

    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={handleModal}>Edit</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit {product.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Price</label>
                            <input
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                type="text"
                                placeholder="Price"
                                className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select
                                className="select select-bordered"
                                value={brand}
                                onChange={(e) => setBrand(Number(e.target.value))}
                            >
                                {
                                    brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="button" onClick={handleModal}>Close</button>
                            <button className="btn btn-primary" type="submit" >Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};
