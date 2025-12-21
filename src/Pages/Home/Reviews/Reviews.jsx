// import React, { use } from 'react';
// import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import ReviewCard from './ReviewCard';

// const Reviews = ({reviewsPromise}) => {
//     const reviews=use(reviewsPromise)
    
//     return (
//         <div>
//             <h1 className='text-4xl font-bold text-purple-500'>Student Reviews</h1>
//  <Swiper
//             loop={true}
//         effect={'coverflow'}
//         grabCursor={true}
//         centeredSlides={true}
//         slidesPerView={'3'}
//         autoplay={{
//             delay:2000,
//             disableOnInteraction:false
//         }}
//         coverflowEffect={{
//           rotate: 50,
//           stretch:"50%",
//           depth: 200,
//           modifier: 1,
//           scale:0.75,
//           slideShadows: true,
//         }}
//         pagination={true}
//         modules={[EffectCoverflow, Pagination]}
//         className="mySwiper mt-10"
//       >
//         {
//             reviews.map(review=><SwiperSlide key={review.id}>
//          <ReviewCard review={review}></ReviewCard>
//         </SwiperSlide>)
//         }
       
//       </Swiper>
            
//         </div>
//     );
// };

// export default Reviews;
import React, { use } from 'react';
import 'swiper/css';


import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay, EffectCards, EffectCoverflow, EffectCreative, Pagination, } from 'swiper/modules';
import ReviewCard from './ReviewCard';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';



const Reviews = ({reviewsPromise}) => {
    const reviews =use(reviewsPromise)
    
    return (
        <div className='mt-10'>
            <div className='flex flex-col justify-center items-center'>
             
                <h1 className='text-3xl font-bold mt-4 text-purple-500 mb-6'>Student Reviews</h1>
                
            </div>
            <Swiper
            loop={true}
            effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'3'}
         autoplay={{
            delay:2000,
            disableOnInteraction:false
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination ,Autoplay]}
        className="mySwiper"

        
      >
        {
            reviews.map(review=><SwiperSlide key={review.id}>
         <ReviewCard review={review}></ReviewCard>
        </SwiperSlide>)
        }
       
      </Swiper>
      
        </div>
    );
};

export default Reviews;