'use client'
import { SyntheticEvent, useState } from "react"
import { type Brand } from "@prisma/client";
import axios from 'axios';
import { useRouter } from "next/navigation";

export default function AddProduct({ brands }: { brands: Brand[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const router = useRouter()
    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('/api/products', {
            title: title,
            price: Number(price),
            brandId: Number(brand)
        })
        setTitle("");
        setPrice("");
        setBrand("");
        router.refresh();
        setIsOpen(false);
    }

    return (
        <div>
            <button className="btn" onClick={handleModal}>Add New</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>
                    <form onSubmit={handleSubmit}>
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
                                onChange={(e) => setPrice(e.target.value)}
                                type="text"
                                placeholder="Price"
                                className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select
                                className="select select-bordered"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            >
                                <option value="" disabled>Select brand</option>
                                {
                                    brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="button" onClick={handleModal}>Close</button>
                            <button className="btn btn-primary" type="submit" >Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};
