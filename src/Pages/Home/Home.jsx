import React from "react";
import Card from "../../Components/Card";
import mainCImg from "../../assets/images/image.png";
import cardImage from "../../assets/images/Card-image.jpg";
import cardImage2 from "../../assets/images/AppointmentReminderImg.jpg";

const Home = () => {
  const cardData = [
    {
      url: "https://blogimages.softwaresuggest.com/blog/wp-content/uploads/2023/02/08161311/Top-15-Hospital-Information-Systems-You-Must-Look-Into-1.jpg",
      contentH: "Access Health Documents anytime anywhere.",
      contentD:
        "You can store and review all the health related data in just one click.",
    },
    {
      url: cardImage,
      contentH: "See your health data over time",
      contentD:
        "Easily view your health data over time with daily, weekly, monthly, and yearly views.",
    },
    {
      url: cardImage2,
      contentH: "Forgeting your the appoinments ? No worries!",
      contentD:
        "Our app will remind you about upcoming appointments. Get reminded before 24hr and 3hr before the appoinment. You can also add or remove them at any time. ",
    },
  ];
  return (
    <div className="flex flex-col items-center pb-5 bg-white">
      <div className="flex flex-col justify-center px-10 pt-12 pb-6 max-w-full w-[781px] max-md:px-5">
        <div className="text-center md:text-green-600 text-5xl font-extrabold tracking-tighter max-md:mt-10 max-md:max-w-full max-md:text-3xl">
          Welcome to Health Tracker
        </div>
        <div className="mt-2 text-lg rounded md:text-black-600 leading-[150%] max-md:max-w-full">
          Your personal health dashboard for tracking your health data and
          managing your health records.
        </div>
      </div>
      <div className="flex overflow-hidden relative flex-col items-start pt-4 pr-16 pl-4 mt-5 max-w-full text-base text-black rounded-xl min-h-[350px] w-[528px] max-md:pr-5">
        <img
          src={mainCImg}
          className="object-cover h-50 w-120 absolute inset-0 size-full"
        />
      </div>
      <div className="flex flex-col px-4 py-10 mt-4 w-full max-w-[960px] max-md:max-w-full">
        <div className="text-4xl text-center font-extrabold tracking-tighter md:text-green-600 max-md:mr-1 max-md:max-w-full">
          Why track your health data?
        </div>
        <div className="mt-4  leading-6 text-lg text-neutral-900 max-md:mr-1 max-md:max-w-full">
          Tracking your health data can help you identify trends and patterns in
          your health, so you can make more informed decisions about your
          lifestyle and healthcare. With Health Tracker, you can easily track
          your nutrition, workouts, sleep, and more, and see your health data
          over time to better understand your health.
        </div>
      </div>
      <div className="grid grid-flow-col grid-rows-2 grid-cols-2 gap-1 place-items-center	mt-10 max-md:mt-10 max-md:max-w-full">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Home;
