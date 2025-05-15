import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    title: "Happy Customer",
    text: `"Great service and an amazing selection of products. I always find what I need!"`,
    avatar: "https://randomuser.me/api/portraits/women/79.jpg"
  },
  {
    id: 2,
    name: "John Smith",
    title: "Regular Shopper",
    text: `"Fast delivery and top-quality products. Highly recommended!"`,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    id: 3,
    name: "Alice Johnson",
    title: "Loyal Client",
    text: `"Wonderful experience. The customer support team is top-notch!"`,
    avatar: "https://randomuser.me/api/portraits/women/35.jpg"
  },
  {
    id: 4,
    name: "Michael Brown",
    title: "Satisfied Customer",
    text: `"The product quality is outstanding! Will definitely be back."`,
    avatar: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    id: 5,
    name: "Sara Lee",
    title: "Frequent Buyer",
    text: `"Amazing experience shopping here. The support team is very responsive."`,
    avatar: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: 6,
    name: "James Bond",
    title: "Trusted Shopper",
    text: `"Excellent variety and prices! Highly recommend to all my friends."`,
    avatar: "https://randomuser.me/api/portraits/men/64.jpg"
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Slide every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-emerald-800 mb-6 text-center">What Our Customers Are Saying</h2>
      <div className="relative">
        <div className="flex overflow-hidden space-x-6 justify-center">
          {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial) => (
            <div key={testimonial.id} className="flex-shrink-0 w-72 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt="Customer Avatar"
                  className="w-12 h-12 rounded-full border-2 border-emerald-600"
                />
                <div>
                  <p className="text-lg font-semibold text-emerald-700">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
              <p className="italic text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
