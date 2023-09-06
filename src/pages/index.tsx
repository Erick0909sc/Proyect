
import Card from '@/components/CardCategory/Card'
import CardRating from '@/components/CardProductbyRating/CardRating'
import Layout from '@/components/Layout/Layout'
import categories from '@/data/categories'
import { EStateGeneric } from '@/shared/types'
import { getAllCategories, getAllProducts, selectAllCategoriesStatus, selectAllCategory, selectProductByrating, selectTopRatedProducts } from '@/states/products/productsSlice'
import { useAppDispatch } from '@/states/store'
import Image from 'next/image'
import img from 'public/portada02.jpg'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// import './styles.css';
import { Pagination, Autoplay } from 'swiper/modules';



export default function Home() {
  const dispatch = useAppDispatch()

  const topRatedProducts = useSelector(selectProductByrating);
  const categoriesProducts = useSelector(selectAllCategory)
  const categoryStatus = useSelector(selectAllCategoriesStatus)
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (categoryStatus === EStateGeneric.IDLE) {
        await dispatch(getAllCategories());
        await dispatch(getAllProducts());
        await dispatch(selectTopRatedProducts());
      }
    };



    fetchData();
  }, [dispatch, categoryStatus]);

  return (
    <Layout>
      <div className='w-full flex flex-col bg-slate-100'>
        <div className='relative flex flex-col w-full h-[15rem]  md:h-[30rem] lg:h-[30rem]'>
          <Image src={img} alt='img' className='aspect-video ' />
        </div>

        <div className=' gap-2 w-full justify-center h-14 items-center hidden sm:flex '>

          {categoryStatus === EStateGeneric.PENDING ? (
            <p>Loading...</p>
          ) : categoryStatus === EStateGeneric.FAILED ? (
            <p>Failed to load Categories</p>
          ) : (
            categories.map((category: any, index) => (
              <Card key={index} name={category.name} />
            ))
          )}

        </div>
        <div className=" block md:hidden lg:hidden h-14 w-full bg-white ">
          <Swiper
            slidesPerView={3}
            className="mySwiper swiper-h h-full bg-transparent"
            loop={true}
            spaceBetween={10}
            pagination={false}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {categoriesProducts.map((category, index) => (
              <SwiperSlide key={index} className='w-full '>
                <div className="flex justify-center h-full items-center text-[15px]"> 
                  <Card name={category.name} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className=' flex flex-col h-[30rem]  md:h-[30rem] lg:h-[40rem] pb-8'>
          <div className='w-full h-20 flex items-center justify-center p-5 text-[20px] font-bold'>
            <h2>PRODUCTOS MAS VENDIDOS</h2>
          </div>
          <Swiper
            slidesPerView={slidesPerView}
            className="mySwiper swiper-h w-[100%] md::w-[80%] lg:w-[80%]"
            spaceBetween={50}
            loop={true}
            pagination={false}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >

            {topRatedProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <CardRating name={product.name} image={product.image} rating={product.rating} description={product.description} />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </Layout>
  )
}
