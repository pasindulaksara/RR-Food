"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import { Product, Nutrition, Specification } from "@/api/products";
import { useCart } from "@/context/CartContext";

interface ProductDetailProps {
  product: Product;
}

// ✅ Type Guards
function isNutritionArray(data: unknown): data is Nutrition[] {
  return (
    Array.isArray(data) &&
    data.every((item) => "info" in item && "unit" in item && "per100g" in item)
  );
}

function isSpecificationArray(data: unknown): data is Specification[] {
  return (
    Array.isArray(data) &&
    data.every((item) => "spec" in item && "value" in item)
  );
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const {
    id,
    name: productName,
    price,
    discount_price,
    ingredients,
    serves: cups,
    net_weight: weight,
    description,
    product_description_image_url,
    images,
    type,
    type_relation,
    certificate_image_url,
    video_link: videoUrl,
    similar_products,
  } = product;

  const productImages = images?.map((img) => img.image_url) || [];

  const productPrice = parseFloat(price || "0");
  const productOldPrice = discount_price ? parseFloat(discount_price) : null;

  const nutrition =
    type === "nutrition" && isNutritionArray(type_relation)
      ? type_relation
      : null;
  const specs =
    type === "specs" && isSpecificationArray(type_relation)
      ? type_relation
      : null;

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      id: id.toString(),
      name: productName,
      price: productPrice,
      image: productImages[0],
      quantity,
    });
  };

  const handleBuyNow = () => {
    const message = `Hi, I'm interested in buying ${quantity} of "${productName}".`;
    const whatsappURL = `https://wa.me/+94770562303?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <main className="bg-white dark:bg-black text-black dark:text-white">
      <div className="container mx-auto px-4 py-4 text-sm text-gray-500 dark:text-white">
        Home &gt;{" "}
        <span className="text-gray-700 font-medium dark:text-gray-200">
          {productName}
        </span>
      </div>

      <section className="container mx-auto px-4 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            navigation
            pagination={{ clickable: true }}
            thumbs={{ swiper: thumbsSwiper }}
            className="mb-4"
          >
            {productImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={img}
                  alt={`${productName} - slide ${idx}`}
                  width={600}
                  height={600}
                  className="object-contain w-full h-auto rounded"
                />
              </SwiperSlide>
            ))}
            {videoUrl && (
              <SwiperSlide>
                <div className="relative w-full h-64 md:h-96 rounded overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={videoUrl}
                    title="Product Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </SwiperSlide>
            )}
          </Swiper>

          <Swiper
            modules={[Thumbs]}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            spaceBetween={10}
            className="mb-4"
          >
            {productImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  width={60}
                  height={60}
                  className="object-contain w-full h-auto rounded"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="space-y-6 px-4">
          <h1 className="text-4xl font-extrabold">{productName}</h1>
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-[#c9a566] hidden">
              Rs.{productPrice.toFixed(2)}
            </span>
            {productOldPrice && (
              <>
                <span className="text-lg line-through text-white dark:text-gray-500 hidden">
                  Rs.{productOldPrice.toFixed(2)}
                </span>
                <span className="text-xs font-semibold uppercase bg-red-500 text-white px-2 py-1 rounded-full animate-pulse hidden">
                  Sale
                </span>
              </>
            )}
          </div>

          <div className="text-sm text-gray-600 dark:text-white space-y-2">
            {ingredients && (
              <p>
                <strong>Ingredients:</strong> {ingredients}
              </p>
            )}
            {cups && (
              <p>
                <strong>Serves:</strong> up to {cups} cups.
              </p>
            )}
            {weight && (
              <p>
                <strong>Net Weight:</strong> {weight}
              </p>
            )}
            {certificate_image_url && (
              <div className="mt-4">
                <Image
                  src={certificate_image_url}
                  alt="Certified Product"
                  width={300}
                  height={100}
                  className="object-contain rounded shadow-md"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <button onClick={decrementQty} className="px-4 py-2 text-xl">
                −
              </button>
              <span className="px-6">{quantity}</span>
              <button onClick={incrementQty} className="px-4 py-2 text-xl">
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-[#c9a566] text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 hidden"
            >
              ADD TO CART
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="inline-block w-auto bg-gray-900 dark:bg-white dark:text-black text-white px-6 py-2 rounded-lg hover:bg-black dark:hover:bg-gray-300 transition-transform hover:-translate-y-0.5"
          >
            BUY IT NOW
          </button>

          <p className="text-sm text-gray-600 dark:text-white leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Description</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
          {nutrition && (
            <table className="w-full table-auto border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="border px-3 py-2 text-left">Info</th>
                  <th className="border px-3 py-2 text-left">Unit</th>
                  <th className="border px-3 py-2 text-left">Per 100g</th>
                </tr>
              </thead>
              <tbody>
                {nutrition.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-3 py-2">{item.info}</td>
                    <td className="border px-3 py-2">{item.unit}</td>
                    <td className="border px-3 py-2">{item.per100g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {specs && (
            <table className="w-full table-auto border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="border px-3 py-2 text-left">Specification</th>
                  <th className="border px-3 py-2 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                {specs.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-3 py-2">{item.spec}</td>
                    <td className="border px-3 py-2">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      {product_description_image_url && (
  <div className="overflow-hidden rounded shadow-sm mt-6">
    <Image
      src={product_description_image_url}
      alt={`Rs.${productName} detail`}
      width={600}
      height={400}
      className="object-cover w-full h-full"
    />
  </div>
)}

        </div>

        <p className="text-gray-600 dark:text-white leading-relaxed">
          {description}
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6">
          You Might Also Like
        </h2>
        {similar_products && similar_products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {similar_products.map((item) => (
              <Link href={`/products/${item.slug}`} key={item.id}>
                <div className="cursor-pointer bg-white dark:bg-gray-900 rounded p-4 text-center shadow hover:shadow-lg transition">
                  <Image
                    src={item.feature_image_url}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="mx-auto mb-2 object-contain"
                  />
                  <h4 className="font-semibold text-sm text-black dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-300 hidden">
                    Rs. {parseFloat(item.price).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-300">
            No similar products found.
          </p>
        )}
      </section>
    </main>
  );
}
