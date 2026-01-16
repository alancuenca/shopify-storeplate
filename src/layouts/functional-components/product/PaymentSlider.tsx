import { useRef, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PaymentSlider = ({ paymentMethods }: { paymentMethods: any }) => {
  const [_, setInit] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      // navigation={true}
      slidesPerView={5}
      spaceBetween={10}
      breakpoints={{
        640: {
          slidesPerView: 5,
        },
        768: {
          slidesPerView: 7,
        },
        1024: {
          slidesPerView: 7,
        },
      }}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      onInit={() => setInit(true)}
    >
      {paymentMethods.map((item: any) => (
        <SwiperSlide key={item.id}>
          <img
            src={item.paymentMethodLogo}
            width={44}
            height={32}
            alt={item.paymentMethodName}
          />
        </SwiperSlide>
      ))}

      <button ref={prevRef} className="hidden" title="Previous" type="button" />
      <button ref={nextRef} className="p-2 border rounded-md cursor-pointer" title="Next" type="button">
        <BsChevronRight />
      </button>
    </Swiper>
  );
};

export default PaymentSlider;
