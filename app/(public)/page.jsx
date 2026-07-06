'use client'
import BestSelling from "@/components/BestSelling";
import Hero3DBanner from "@/components/Hero3DBanner";
import CategoriesMarquee from "@/components/CategoriesMarquee";
import Newsletter from "@/components/Newsletter";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import CategoryTiles from "@/components/CategoryTiles";

export default function Home() {
    return (
        <div>
            <Hero3DBanner modelUrl="/models/iphone.glb" title="iPhone 17 Pro" />
            <CategoriesMarquee />
            <CategoryTiles />
            <LatestProducts />
            <BestSelling />
            <OurSpecs />
            <Newsletter />
        </div>
    );
}
