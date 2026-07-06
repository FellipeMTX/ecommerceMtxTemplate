'use client'
import { assets, categories } from "@/assets/assets"
import { addProduct } from "@/lib/features/product/productSlice"
import { PlusIcon, Trash2Icon, XIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-hot-toast"

export default function StoreAddProduct() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const dispatch = useDispatch()

    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
    const [imagePreviews, setImagePreviews] = useState({ 1: null, 2: null, 3: null, 4: null })
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        mrp: 0,
        price: 0,
        category: "",
    })
    const [hasVariations, setHasVariations] = useState(false)
    const [variations, setVariations] = useState([{ name: "", options: [{ label: "", priceDelta: "" }] }])
    const [loading, setLoading] = useState(false)

    const onChangeHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    // Create the preview object URL once when a file is chosen (revoking the
    // previous one for that slot) instead of on every render, to avoid leaking
    // blob URLs.
    const onImageChange = (key, file) => {
        setImagePreviews((prev) => {
            if (prev[key]) URL.revokeObjectURL(prev[key])
            return { ...prev, [key]: file ? URL.createObjectURL(file) : null }
        })
        setImages((prev) => ({ ...prev, [key]: file }))
    }

    // ----- variation builder -----
    const addVariationGroup = () =>
        setVariations((v) => [...v, { name: "", options: [{ label: "", priceDelta: "" }] }])

    const removeVariationGroup = (gi) =>
        setVariations((v) => v.filter((_, i) => i !== gi))

    const updateGroupName = (gi, name) =>
        setVariations((v) => v.map((g, i) => (i === gi ? { ...g, name } : g)))

    const addOption = (gi) =>
        setVariations((v) => v.map((g, i) => (i === gi ? { ...g, options: [...g.options, { label: "", priceDelta: "" }] } : g)))

    const removeOption = (gi, oi) =>
        setVariations((v) => v.map((g, i) => (i === gi ? { ...g, options: g.options.filter((_, j) => j !== oi) } : g)))

    const updateOption = (gi, oi, field, value) =>
        setVariations((v) => v.map((g, i) => (i === gi ? { ...g, options: g.options.map((o, j) => (j === oi ? { ...o, [field]: value } : o)) } : g)))

    const buildVariationsPayload = () => {
        if (!hasVariations) return []
        return variations
            .map((group) => ({
                name: group.name.trim(),
                options: group.options
                    .filter((o) => o.label.trim())
                    .map((o) => {
                        const delta = parseFloat(o.priceDelta)
                        return { label: o.label.trim(), priceDelta: Number.isFinite(delta) ? delta : 0 }
                    }),
            }))
            .filter((group) => group.name && group.options.length > 0)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const mrp = Number(productInfo.mrp)
        const price = Number(productInfo.price)
        if (!(mrp > 0)) throw new Error("Informe o preço original (maior que 0).")
        if (!(price >= 0)) throw new Error("Informe um preço de oferta válido.")
        if (price > mrp) throw new Error("O preço de oferta não pode ser maior que o original.")
        setLoading(true)
        try {
            const builtVariations = buildVariationsPayload()
            const uploadedPreviews = Object.values(imagePreviews).filter(Boolean)
            const productImages = uploadedPreviews.length ? uploadedPreviews : [assets.upload_area]

            const newProduct = {
                id: `prod_${Date.now()}`,
                name: productInfo.name,
                description: productInfo.description,
                mrp,
                price,
                images: productImages,
                category: productInfo.category,
                hasVariations: builtVariations.length > 0,
                variations: builtVariations,
                inStock: true,
                store: { name: "My Store", logo: assets.gs_logo, username: "mystore" },
                rating: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }

            dispatch(addProduct(newProduct))

            // reset the form. We intentionally do NOT revoke the preview object
            // URLs — they were handed to the new product's images.
            setProductInfo({ name: "", description: "", mrp: 0, price: 0, category: "" })
            setImages({ 1: null, 2: null, 3: null, 4: null })
            setImagePreviews({ 1: null, 2: null, 3: null, 4: null })
            setVariations([{ name: "", options: [{ label: "", priceDelta: "" }] }])
            setHasVariations(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={e => toast.promise(onSubmitHandler(e), { loading: "Adding Product...", success: "Produto adicionado!", error: (err) => err?.message || "Não foi possível adicionar" })} className="text-slate-500 mb-28">
            <h1 className="text-2xl">Add New <span className="text-slate-800 font-medium">Products</span></h1>
            <p className="mt-7">Product Images</p>

            <div className="flex gap-3 mt-4">
                {Object.keys(images).map((key) => (
                    <label key={key} htmlFor={`images${key}`}>
                        <Image width={300} height={300} className='h-15 w-auto border border-slate-200 rounded cursor-pointer' src={imagePreviews[key] ? imagePreviews[key] : assets.upload_area} alt="" />
                        <input type="file" accept='image/*' id={`images${key}`} onChange={e => onImageChange(key, e.target.files[0])} hidden />
                    </label>
                ))}
            </div>

            <label className="flex flex-col gap-2 my-6 ">
                Name
                <input type="text" name="name" onChange={onChangeHandler} value={productInfo.name} placeholder="Enter product name" className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded" required />
            </label>

            <label className="flex flex-col gap-2 my-6 ">
                Description
                <textarea name="description" onChange={onChangeHandler} value={productInfo.description} placeholder="Enter product description" rows={5} className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded resize-none" required />
            </label>

            <div className="flex gap-5">
                <label className="flex flex-col gap-2 ">
                    Actual Price ($)
                    <input type="number" name="mrp" min="0" onChange={onChangeHandler} value={productInfo.mrp} placeholder="0" className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded" required />
                </label>
                <label className="flex flex-col gap-2 ">
                    Offer Price ($)
                    <input type="number" name="price" min="0" onChange={onChangeHandler} value={productInfo.price} placeholder="0" className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded" required />
                </label>
            </div>

            <select onChange={e => setProductInfo({ ...productInfo, category: e.target.value })} value={productInfo.category} className="w-full max-w-sm p-2 px-4 my-6 outline-none border border-slate-200 rounded" required>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            {/* Variations builder */}
            <div className="max-w-2xl mt-2 border-t border-slate-200 pt-6">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" checked={hasVariations} onChange={e => setHasVariations(e.target.checked)} className="size-4 accent-slate-800" />
                    <span className="text-slate-700 font-medium">Este produto tem variações (ex.: memória, cor, tamanho)</span>
                </label>

                {hasVariations && (
                    <div className="mt-5 flex flex-col gap-5">
                        {variations.map((group, gi) => (
                            <div key={gi} className="border border-slate-200 rounded-lg p-4 bg-slate-50/40">
                                <div className="flex items-center gap-2">
                                    <input
                                        value={group.name}
                                        onChange={e => updateGroupName(gi, e.target.value)}
                                        placeholder="Nome do atributo (ex.: Memória)"
                                        className="flex-1 p-2 px-3 border border-slate-200 rounded outline-none bg-white"
                                    />
                                    {variations.length > 1 && (
                                        <button type="button" onClick={() => removeVariationGroup(gi)} className="text-red-500 hover:bg-red-50 p-1.5 rounded" aria-label="Remover atributo">
                                            <Trash2Icon size={18} />
                                        </button>
                                    )}
                                </div>

                                <div className="mt-3 flex flex-col gap-2">
                                    {group.options.map((opt, oi) => (
                                        <div key={oi} className="flex items-center gap-2">
                                            <input
                                                value={opt.label}
                                                onChange={e => updateOption(gi, oi, 'label', e.target.value)}
                                                placeholder="Opção (ex.: 512GB)"
                                                className="flex-1 p-2 px-3 border border-slate-200 rounded outline-none bg-white"
                                            />
                                            <div className="flex items-center gap-1">
                                                <span className="text-slate-400 text-sm">+{currency}</span>
                                                <input
                                                    type="number"
                                                    value={opt.priceDelta}
                                                    onChange={e => updateOption(gi, oi, 'priceDelta', e.target.value)}
                                                    placeholder="0"
                                                    className="w-24 p-2 px-3 border border-slate-200 rounded outline-none bg-white"
                                                />
                                            </div>
                                            {group.options.length > 1 && (
                                                <button type="button" onClick={() => removeOption(gi, oi)} className="text-slate-400 hover:text-red-500 p-1" aria-label="Remover opção">
                                                    <XIcon size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => addOption(gi)} className="flex items-center gap-1 text-sm text-brand mt-1 w-fit">
                                        <PlusIcon size={16} /> Adicionar opção
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button type="button" onClick={addVariationGroup} className="flex items-center gap-1 text-sm font-medium text-slate-700 w-fit">
                            <PlusIcon size={16} /> Adicionar atributo
                        </button>
                        <p className="text-xs text-slate-400 max-w-md">
                            O acréscimo de preço é opcional — deixe 0 se a opção não muda o preço.
                            Preço final = preço base + soma dos acréscimos das opções selecionadas.
                        </p>
                    </div>
                )}
            </div>

            <br />

            <button disabled={loading} className="bg-slate-800 text-white px-6 mt-7 py-2 hover:bg-slate-900 rounded transition disabled:opacity-60">Add Product</button>
        </form>
    )
}
