'use client'
import BestSelling from "@/components/BestSelling";
import HeroBanner from "@/components/HeroBanner";
import CategoriesMarquee from "@/components/CategoriesMarquee";
import Newsletter from "@/components/Newsletter";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import CategoryTiles from "@/components/CategoryTiles";

export default function Home() {
    return (
        <div>
            <HeroBanner />
            <CategoriesMarquee />
            <CategoryTiles />
            <LatestProducts />
            <BestSelling />
            <OurSpecs />
            <Newsletter />
        </div>
    );
}
