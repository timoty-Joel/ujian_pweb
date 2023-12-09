'use client'
import { useState } from "react"
import type { Brand } from "@prisma/client";
import axios from 'axios';
import { useRouter } from "next/navigation";

interface IProduct {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

export default function DeleteProduct({ product }: { product: IProduct }) {
    const [isOpen, setIsOPen] = useState(false);
    const router = useRouter();

    const handleModal = () => {
        setIsOPen(!isOpen);
    }

    const handleDelete = async (productId: number) => {
        await axios.delete(`/api/products/${productId}`)
        router.refresh();
        setIsOPen(false);
    }

    return (
        <div>
            <button className="btn btn-error btn-sm" onClick={handleModal}>Delete</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure to delete {product.title}?</h3>
                    <div className="modal-action">
                        <button
                            className="btn"
                            type="button"
                            onClick={handleModal}>
                            No
                        </button>
                        <button
                            onClick={() => handleDelete(product.id)}
                            className="btn btn-primary"
                            type="button">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
