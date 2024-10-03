"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import FlyingHearts from "../components/heartAnimation";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    questionNoReason: "",
    selectedDate: undefined as Date | undefined,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleYesNo = (answer: string) => {
    setAnswers({
      ...answers,
      question1: answer,
    });
    if (answer === "yes") {
      setCurrentQuestion(1);
    } else {
      setCurrentQuestion(5);
    }
  };

  const handleNext = () => {
    if (currentQuestion === 1) {
      setCurrentQuestion(2);
    } else if (currentQuestion === 2) {
      setCurrentQuestion(3);
    } else if (currentQuestion === 3) {
      setCurrentQuestion(4);
    } else if (currentQuestion === 5) {
      setCurrentQuestion(6);
    }
  };

  const handleSubmit = () => {
    console.log("Form Submitted: ", { answers, selectedDate: answers.selectedDate?.toDateString() });
    setFormSubmitted(true);
  };

  const formatDate = (date: Date) => {
    if (!date) return "";
    return date.toDateString();
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <FlyingHearts />
      <form onSubmit={(e) => e.preventDefault()}>
        {formSubmitted ? (
          <div className="flex flex-col items-center">
            <Image src="/cat2.jpg" className="rounded-lg shadow-lg" width={200} height={200} alt="cat" />
            <p className="text-4xl font-semibold text-center text-red-500 pt-10">
              <span className="text-black">See you on</span> {answers.selectedDate ? formatDate(answers.selectedDate) : "No date selcted"} <br /> <span className="text-black">with</span> {answers.question3} <span className="text-black">to watch</span> {answers.question4} 💐❤️
            </p>
          </div>
        ) : (
          <>
            {currentQuestion === 0 && (
              <div className="flex flex-col items-center">
                <Image src="/cat1.jpg" className="rounded-lg shadow-lg" width={200} height={200} alt="cat" />
                <p className="text-4xl tracking-tighter text-center font-semibold text-red-500 pt-10">
                  Wanna go out with me <br /> for a date?
                </p>
                <div className="flex justify-center gap-5 pt-9">
                  <Button type="button" className="w-[190px] rounded-full bg-red-500 font-semibold tracking-tight" onClick={() => handleYesNo("yes")}>
                    Yes 😏
                  </Button>
                  <Button type="button" className="rounded-full w-[190px] bg-red-500 font-semibold tracking-tight" onClick={() => handleYesNo("no")}>
                    No 😞
                  </Button>
                </div>
              </div>
            )}

            {currentQuestion === 1 && (
              <div className="flex flex-col items-center">
                <Image src="/cat.gif" className="rounded-lg shadow-lg" width={200} height={200} alt="cat gif" />
                <p className="text-4xl tracking-tighter text-center font-semibold text-red-500 pt-10">
                  Dang..You said Yes! <br /> Here are some flowers for you 💐
                </p>
                <div className="flex justify-center gap-5 pt-9">
                  <Button type="button" className="w-[190px] rounded-full bg-red-500 font-semibold tracking-tight" onClick={handleNext}>
                    Thanks 🤨
                  </Button>
                </div>
              </div>
            )}

            {currentQuestion === 2 && (
              <div className="flex flex-col items-center">
                <p className="text-3xl tracking-tight font-semibold text-red-500">When are you free?</p>
                <Calendar
                  mode="single"
                  selected={answers.selectedDate}
                  onSelect={(selectedDate) => setAnswers({ ...answers, selectedDate })}
                  className="rounded-md border mt-9"
                />
                <Button type="button" className="rounded-full w-[190px] mt-9 bg-red-500 font-semibold tracking-tight" onClick={handleNext}>
                  Confirm 🥳
                </Button>
              </div>
            )}

            {currentQuestion === 3 && (
              <div className="flex flex-col items-center">
                <p className="text-3xl tracking-tight font-semibold text-red-500">So... What are we gonna eat?</p>
                <div className="flex gap-5 mt-9">
                  <div className="relative">
                    <Image
                      src="/rice.jpg"
                      alt="Food Option 1"
                      width={150}
                      height={150}
                      className={`cursor-pointer rounded-md shadow-lg transition-transform duration-200 ${answers.question3 === "option1" ? "scale-105 border-2 border-blue-500" : ""
                        }`}
                      onClick={() => setAnswers({ ...answers, question3: "Fried Rice" })}
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                    <p className="text-xl tracking-tight text-center mt-5">Fried Rice</p>
                  </div>
                  <div className="relative">
                    <Image
                      src="/burger.jpg"
                      alt="Food Option 2"
                      width={150}
                      height={150}
                      className={`cursor-pointer rounded-md shadow-lg transition-transform duration-200 ${answers.question3 === "option2" ? "scale-105 border-2 border-blue-500" : ""
                        }`}
                      onClick={() => setAnswers({ ...answers, question3: "Burger" })}
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                    <p className="text-xl tracking-tight text-center mt-5">Burger</p>
                  </div>
                  <div className="relative">
                    <Image
                      src="/pizza.jpg"
                      alt="Food Option 3"
                      width={150}
                      height={150}
                      className={`cursor-pointer rounded-md shadow-lg transition-transform duration-200 ${answers.question3 === "option3" ? "scale-105 border-2 border-blue-500" : ""
                        }`}
                      onClick={() => setAnswers({ ...answers, question3: "Pizza" })}
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                    <p className="text-xl tracking-tight text-center mt-5">Pizza</p>
                  </div>
                </div>
                <Button
                  type="button"
                  className="mt-9 bg-red-500 rounded-full w-[190px] font-semibold tracking-tight"
                  onClick={handleNext}
                  disabled={!answers.question3}
                >
                  Next 😌
                </Button>
              </div>
            )}

            {currentQuestion === 4 && (
              <div className="flex flex-col items-center">
                <p className="text-3xl tracking-tight font-semibold text-red-500">And you like movies?</p>
                <div className="flex gap-5 mt-9">
                  <div className="relative">
                    <Image
                      src="/LaLaLand.jpg"
                      alt="Movie Option 1"
                      width={150}
                      height={150}
                      className={`cursor-pointer rounded-md shadow-lg transition-transform duration-200 ${answers.question4 === "option1" ? "scale-105 border-2 border-blue-500" : ""
                        }`}
                      onClick={() => setAnswers({ ...answers, question4: "La La Land" })}
                      style={{ width: "190px", height: "190px", objectFit: "contain" }}
                    />
                    <p className="text-xl tracking-tight text-center mt-5">La La Land</p>
                  </div>
                  <div className="relative">
                    <Image
                      src="/WhenharryMetSally.jpg"
                      alt="Movie Option 2"
                      width={150}
                      height={150}
                      className={`cursor-pointer rounded-md shadow-lg transition-transform duration-200 ${answers.question4 === "option2" ? "scale-105 border-2 border-blue-500" : ""
                        }`}
                      onClick={() => setAnswers({ ...answers, question4: "When Harry Met Sally" })}
                      style={{ width: "190px", height: "190px", objectFit: "contain" }}
                    />
                    <p className="text-xl tracking-tight text-center mt-5">When Harry Met Sally</p>
                  </div>
                  <div className="relative">
                    <Image
                      src="/Shrek.jpg"
                      alt="Movie Option 3"
                      width={150}
                      height={150}
                      className={`cursor-pointer rounded-md shadow-lg transition-transform duration-200 ${answers.question4 === "option3" ? "scale-105 border-2 border-blue-500" : ""
                        }`}
                      onClick={() => setAnswers({ ...answers, question4: "Shrek" })}
                      style={{ width: "190px", height: "190px", objectFit: "contain" }}
                    />
                    <p className="text-xl tracking-tight text-center mt-5">Shrek</p>
                  </div>
                </div>
                <Button
                  type="button"
                  className="mt-9 bg-red-500 rounded-full w-[190px] font-semibold tracking-tight"
                  onClick={handleSubmit}
                  disabled={!answers.question4}
                >
                  Next 😌
                </Button>
              </div>
            )}

            {currentQuestion === 5 && (
              <div>
                <p id="no" className="text-3xl tracking-tight font-semibold text-red-500">Why no? Did you lie?</p>
                <input
                  type="text"
                  className="border p-2 mt-4"
                  value={answers.questionNoReason}
                  onChange={(e) => setAnswers({ ...answers, questionNoReason: e.target.value })}
                  required
                />
                <Button type="button" className="mt-4 bg-blue-500 text-white p-2" onClick={handleNext}>
                  Next 😌
                </Button>
              </div>
            )}

            {currentQuestion === 6 && (
              <div>
                <p className="text-3xl tracking-tight font-semibold text-red-500">
                  Are you sure you don&#39;t want to reconsider?
                </p>
                <Button type="button" className="mt-4 bg-blue-500 text-white p-2 mr-2" onClick={handleSubmit}>
                  Yes
                </Button>
                <Button type="button" className="mt-4 bg-red-500 text-white p-2" onClick={handleSubmit}>
                  No
                </Button>
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
}
