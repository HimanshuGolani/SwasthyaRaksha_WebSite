import React from "react";
import Card from "../../Components/Card";
import mainCImg from "../../assets/images/image.png";
import cardImage from "../../assets/images/Card-image.jpg";
import cardImage2 from "../../assets/images/AppointmentReminderImg.jpg";

const Home = () => {
  const cardData = [
    {
      url: "https://blogimages.softwaresuggest.com/blog/wp-content/uploads/2023/02/08161311/Top-15-Hospital-Information-Systems-You-Must-Look-Into-1.jpg",
      contentH: "Access Health Documents Anytime, Anywhere",
      contentD:
        "Store and review all your health-related data with just one click.",
    },
    {
      url: cardImage,
      contentH: "Track Your Health Data Over Time",
      contentD:
        "View your health data with daily, weekly, monthly, and yearly views.",
    },
    {
      url: cardImage2,
      contentH: "Never Miss an Appointment",
      contentD:
        "Get reminders 24 hours and 3 hours before your appointments. Add or remove reminders anytime.",
    },
  ];

  return (
    <div className="flex flex-col items-center pb-5 bg-white">
      <div className="flex flex-col justify-center px-10 pt-12 pb-6 max-w-full w-[781px] max-md:px-5">
        <div className="text-center text-green-600 text-5xl font-extrabold tracking-tighter max-md:mt-10 max-md:max-w-full max-md:text-3xl">
          Welcome to Swasthya Raksha
        </div>
        <div className="mt-2 text-lg rounded text-black-600 leading-[150%] max-md:max-w-full">
          Your personal health dashboard for tracking your health data and
          managing your health records.
        </div>
      </div>
      <div className="flex overflow-hidden relative flex-col items-start pt-4 pr-16 pl-4 mt-5 max-w-full text-base text-black rounded-xl min-h-[350px] w-[528px] max-md:pr-5">
        <img
          src={mainCImg}
          className="object-cover h-50 w-120 absolute inset-0 size-full"
          alt="Main Content"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col px-4 py-10 mt-4 w-full max-w-[960px] max-md:max-w-full">
        <div className="text-4xl text-center font-extrabold tracking-tighter text-green-600 max-md:mr-1 max-md:max-w-full">
          Why Track Your Health Data?
        </div>
        <div className="mt-4 leading-6 text-lg text-neutral-900 max-md:mr-1 max-md:max-w-full">
          Tracking your health data helps you identify trends and patterns,
          enabling informed decisions about your lifestyle and healthcare. With
          Health Tracker, you can easily track your nutrition, workouts, sleep,
          and more, and see your health data over time to better understand your
          health.
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center mt-10 max-w-full">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Home;
