import Image from "next/image";
import CropRecommender from "./page/crop-recommender";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <CropRecommender/>
    </div>
  );
}
