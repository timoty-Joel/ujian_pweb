interface IProductLayoutProps {
    children: React.ReactNode
}

export const metadata = {
    title: "products",
    description: "products layout"
}

export default function ProductLayout({ children }: IProductLayoutProps) {
    return (
        <div className="p-10">{children}</div>
    )
};
