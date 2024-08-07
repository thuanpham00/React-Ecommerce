import { useContext, useEffect, useState } from "react"
import { AppContext } from "src/contexts/auth.context"
import img1 from "src/img/banner4.png"
import img2 from "src/img/banner2.png"
import img3 from "src/img/banner3.png"
import slide1 from "src/img/slide1.jpg"
import slide2 from "src/img/slide2.jpg"
import slide3 from "src/img/slide4.jpg"
import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import { Link } from "react-router-dom"
import { path } from "src/constants/path"
import { queryParamConfig } from "src/Hooks/useQueryConfig"
import { useQuery } from "@tanstack/react-query"
import { productApi } from "src/apis/products.api"
import { ProductListConfig } from "src/types/product.type"
import SlideListProduct from "./components/SideListProduct"
import ProductItem2 from "./components/ProductItem2"
// image product
import productItem1 from "src/img/productItem1.png"
import productItem2 from "src/img/productItem2.png"
import productItem3 from "src/img/productItem3.png"
import productItem4 from "src/img/productItem4.png"
import productItem5 from "src/img/productItem5.png"
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet-async"
import SlideBanner from "./components/SideBanner"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { schema } from "src/utils/rules"
import { yupResolver } from "@hookform/resolvers/yup"

const buttonSlideList = {
  prevArrow: (
    <button aria-label="buttonLeft" className="ml-3 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#14213d"
        className="w-5 h-5 lg:h-8 lg:w-8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </button>
  ),
  nextArrow: (
    <button aria-label="buttonRight" className="mr-3 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#14213d"
        className="w-5 h-5 lg:w-8 lg:h-8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  )
}

const slideImages = [slide1, slide2, slide3]

const imageList = [img1, img2, img3]

export type ProductFeatured = {
  img: string
  name: string
  sold: number
  price: number
  priceBeforeDiscount: number
  link: string
}

const productFeatured: ProductFeatured[] = [
  {
    img: productItem1,
    name: "Điện thoại Apple Iphone 12 64GB - Hàng chính hãng VNA",
    sold: 482,
    price: 20990000,
    priceBeforeDiscount: 26990000,
    link: "/Điện-thoại-Apple-Iphone-12-64GB--Hàng-chính-hãng-VNA-i-60afb1c56ef5b902180aacb8"
  },
  {
    img: productItem2,
    name: "Đồng Hồ Nam CRRJU CR8940 Dây Thép Cao Cấp",
    sold: 2400,
    price: 300000,
    priceBeforeDiscount: 450000,
    link: "/Đồng-Hồ-Nam-CRRJU-CR8940-Dây-Thép-Cao-Cấp-i-60afaf286ef5b902180aacb3"
  },
  {
    img: productItem3,
    name: "Áo thun nam cổ tròn siêu đẹp- Áo phông nam với chất liệu thun lạnh cực kì mát mẻ",
    sold: 0,
    price: 106000,
    priceBeforeDiscount: 189000,
    link: "/Áo-thun-nam-cổ-tròn-POLOMAN-vải-Cotton-co-giãndày-dặn-form-regular-fit-thoải-mái-i-60abb7acdbfa6e153cb99630"
  },
  {
    img: productItem4,
    name: "Điện Thoại Xiaomi Redmi 9A 2GB/32GB - Hàng Chính Hãng",
    sold: 1000,
    price: 1949000,
    priceBeforeDiscount: 1990000,
    link: "/Điện-Thoại-Xiaomi-Redmi-9A-2GB32GB--Hàng-Chính-Hãng-i-60afb07e6ef5b902180aacb6"
  },
  {
    img: productItem5,
    name: "Áo thun nam nữ cotton co giãn unisex Giisel phông trơn basic tee tay lỡ oversize form rộng 10 màu",
    sold: 523,
    price: 98350,
    priceBeforeDiscount: 189000,
    link: "/Áo-thun-nam-nữ-cotton-co-giãn-unisex-Giisel-phông-trơn-basic-tee-tay-lỡ-oversize-form-rộng-10-màu-i-60ad03872fb52902585972ab"
  }
]

const schemaEmail = schema.pick(["email"])

type EmailType = {
  email: string
}

export default function Home() {
  const { t } = useTranslation(["header", "home"])
  const { darkMode } = useContext(AppContext)
  const { handleSubmit, register, reset } = useForm<EmailType>({
    resolver: yupResolver(schemaEmail)
  })

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData()
    formData.append("entry.2124961965", data.email) // Thay đổi ID này thành Entry ID của Google Form
    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSc6rZGuuM06mrLNHDSCNY9NvCv_emDvMvHh1m2QKCZ9urQuwQ/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        body: formData
      }
    ).then(() => {
      toast.success("gửi email thành công")
      reset()
    })
  })

  const [scrollYPosition, setScrollYPosition] = useState<number>(0)

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    setScrollYPosition(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const [modeAnimation, setModeAnimation] = useState<boolean>(true)
  useEffect(() => {
    if (scrollYPosition < 600) {
      setModeAnimation(true)
    } else {
      setModeAnimation(false)
    }
  }, [scrollYPosition]) // khi nào scrollYPosition thay đổi tham chiếu nó chạy lại hàm này

  const queryConfigCreatedAt: queryParamConfig = {
    page: "1",
    limit: "8",
    sort_by: "createdAt"
  }
  const getProductListCreatedAtQuery = useQuery({
    queryKey: ["productListHome", queryConfigCreatedAt],
    queryFn: () => {
      return productApi.getProductList(queryConfigCreatedAt as ProductListConfig)
    }
  })

  const queryConfigSold: queryParamConfig = {
    page: "1",
    limit: "8",
    sort_by: "sold"
  }
  const getProductListSoldQuery = useQuery({
    queryKey: ["productListHome", queryConfigSold],
    queryFn: () => {
      return productApi.getProductList(queryConfigSold as ProductListConfig)
    }
  })

  const productListCreatedAt = getProductListCreatedAtQuery.data?.data.data.products
  const productListSold = getProductListSoldQuery.data?.data.data.products

  const productListViewItem_one = productFeatured.slice(0, 1) // cắt từ mảng gốc
  const productListViewItem_four = productFeatured.slice(1, 5)

  if (!productListCreatedAt) return null
  if (!productListSold) return null
  return (
    <div
      className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345]" : "bg-[#fff]"} duration-200`}
    >
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Trang chủ - E-commerce shop" />
      </Helmet>

      <div className="w-full relative">
        <Slide {...buttonSlideList}>
          {slideImages.map((item, index) => {
            return (
              <div className="w-full h-[250px] md:h-[600px]" key={index}>
                <div
                  style={{
                    backgroundImage: `url(${item})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                  className="w-full h-full object-cover"
                ></div>
              </div>
            )
          })}
        </Slide>

        <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-[30%]">
          <div
            className={`${modeAnimation ? "animation" : ""} flex justify-center items-center flex-col`}
          >
            <h1 className="font_logo text-3xl md:text-8xl text-[#403d30]">Molla</h1>
            <h2 className="tracking-wider font_logo capitalize mt-0 md:mt-4 block text-black text-2xl md:text-5xl">
              {t("home:title")}
            </h2>
            <h3 className="text-sm md:text-lg text-gray-600 mt-0 md:mt-4 font-medium text-center">
              {t("home:desc")}
            </h3>
            <Link
              to={path.productList}
              className="text-sm md:text-lg tracking-widest uppercase mt-4 py-2 px-3 md:py-5 md:px-6 bg-primaryColor hover:bg-primaryColor/80 duration-200 rounded-sm shadow-sm text-white"
            >
              {t("home:buy")}
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className={`${darkMode ? "bg-[#252323] border-gray-500" : "bg-[#fff]"} mt-5 w-full duration-200 pt-2 md:pt-5 pb-2 md:pb-4 px-3 z-10 shadow-sm border`}
        >
          <div className="grid grid-cols-12 gap-4 flex-wrap">
            <div className="col-span-6 lg:col-span-3 border-r-2 border-gray-300 md:p-2">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0573f0"
                    className="w-4 h-4 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className={`${darkMode ? "text-white" : "text-black"} font-semibold text-sm md:text-lg md:line-clamp-1`}
                  >
                    {t("home:service.service_1.title")}
                  </span>
                  <span className="block font-light text-[10px] md:text-sm text-gray-500">
                    {t("home:service.service_1.desc")}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-3 lg:border-r-2 lg:border-gray-300 md:p-2">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0573f0"
                    className="w-4 h-4 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className={`${darkMode ? "text-white" : "text-black"} font-semibold text-sm md:text-lg md:line-clamp-1`}
                  >
                    {t("home:service.service_2.title")}
                  </span>
                  <span className="block font-light text-[10px] md:text-sm text-gray-500">
                    {t("home:service.service_2.desc")}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-3 border-r-2 border-gray-300 md:p-2">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0573f0"
                    className="w-4 h-4 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className={`${darkMode ? "text-white" : "text-black"} font-semibold text-xs md:text-lg md:line-clamp-1`}
                  >
                    {t("home:service.service_3.title")}
                  </span>
                  <span className="block font-light text-[10px] md:text-sm text-gray-500">
                    {t("home:service.service_3.desc")}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-3 md:p-2">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0573f0"
                    className="w-4 h-4 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className={`${darkMode ? "text-white" : "text-black"} font-semibold text-xs md:text-lg md:line-clamp-1`}
                  >
                    {t("home:service.service_4.title")}
                  </span>
                  <span className="block font-light text-[10px] md:text-sm text-gray-500">
                    {t("home:service.service_4.desc")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 lg:mt-8 p-4">
          <div className="flex items-center gap-4">
            <h2
              className={`flex-shrink-0 uppercase text-xl md:text-3xl font-semibold ${darkMode ? "text-[#fff]/80" : "text-[#000]"} text-left -tracking-normal`}
            >
              {t("home:productView")}
            </h2>
            <div className="flex-grow h-[1px] bg-gray-300"></div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid md:grid-cols-12 items-center gap-2 md:gap-4">
            <div className="col-span-6">
              {productListViewItem_one?.map((item, index) => (
                <div key={index}>
                  <ProductItem2 item={item} />
                </div>
              ))}
            </div>
            <div className="col-span-6">
              <div className="grid grid-cols-6 gap-2 md:gap-4">
                {productListViewItem_four.map((item, index) => (
                  <div className="col-span-3" key={index}>
                    <ProductItem2
                      item={item}
                      className={`h-[220px] md:h-[300px] flex flex-col pt-8 items-center rounded-sm shadow-sm px-4 py-2 ${darkMode ? " bg-[#252323]" : " bg-[#f9f9f9]"}`}
                      classNameImage="h-[80px] md:h-[150px] object-cover"
                      classNameTitle="mt-2 mr-auto font-medium text-sm line-clamp-2 h-[40px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <SlideBanner bannerList={imageList} timeScroll={2000} />

        <SlideListProduct
          title={t("home:productCreatedAt")}
          desc={t("home:productCreatedAtDesc")}
          productList={productListCreatedAt}
          timeScroll={3000}
        />

        <SlideListProduct
          title={t("home:productSold")}
          desc={t("home:productSoldDesc")}
          productList={productListSold}
          timeScroll={2000}
        />
      </div>

      <div className="mt-5 p-16 border-t border-t-gray-300">
        <div className="container">
          <h2 className="text-xl md:text-3xl text-center font-medium text-[#3a3a3a]">
            {t("home:signUp")}
          </h2>
          <span className="mt-5 mx-auto text-sm md:text-base text-center w-full max-w-[700px] block">
            {t("home:signUpDesc")}
          </span>

          <form onSubmit={onSubmit} className="mt-5 mx-auto flex items-center justify-center">
            <div className="flex items-center justify-center border-2 border-orange-500 pl-4 rounded-tl-full rounded-bl-full">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="flex-grow w-[180px] p-4 outline-none bg-transparent"
                placeholder="Your email address"
                autoComplete="on"
                {...register("email")}
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 border-2 border-orange-500 py-4 px-4 md:px-8 text-white rounded-tr-full rounded-br-full hover:bg-orange-300 hover:border-orange-300 duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
