"use client";

import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import FlyingHearts from "@/components/heartAnimation";
import FloatingFlowers from "@/components/flowerAnimation";

import Image from "next/image";

const GOOGLE_FORM_ACTION = process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION || "";
const GOOGLE_FORM_ENTRY_FIELD = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_FIELD || "entry.12213123";

type AnswerState = {
  question1: "yes" | "no" | "";
  question3: string;
  question4: string;
  questionNoReason: string;
  selectedDate?: Date;
};

const foodOptions = [
  { label: "Fried Rice", image: "/rice.jpg" },
  { label: "Burger", image: "/burger.jpg" },
  { label: "Pizza", image: "/pizza.jpg" },
];

const movieOptions = [
  { label: "La La Land", image: "/LaLaLand.jpg" },
  { label: "When Harry Met Sally", image: "/WhenHarryMetSally.jpg" },
  { label: "Shrek", image: "/Shrek.jpg" },
];

const formatDate = (date?: Date) =>
  date ? date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" }) : "";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({
    question1: "",
    question3: "",
    question4: "",
    questionNoReason: "",
    selectedDate: undefined,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submissionNote, setSubmissionNote] = useState("");

  const summary = useMemo(() => {
    const parts = [
      answers.question1 && `Answer: ${answers.question1 === "yes" ? "Yes, let's go!" : "No (for now)"}`,
      answers.selectedDate ? `Date: ${formatDate(answers.selectedDate)}` : "Date: TBD",
      answers.question3 && `Food: ${answers.question3}`,
      answers.question4 && `Movie: ${answers.question4}`,
      answers.questionNoReason && `Reason: ${answers.questionNoReason}`,
    ].filter(Boolean);

    return parts.join(" | ");
  }, [answers]);

  const handleYesNo = (answer: "yes" | "no") => {
    setAnswers((prev) => ({ ...prev, question1: answer }));
    setCurrentQuestion(answer === "yes" ? 1 : 5);
  };

  const handleNext = () => {
    if (currentQuestion === 1) return setCurrentQuestion(2);
    if (currentQuestion === 2) return setCurrentQuestion(3);
    if (currentQuestion === 3) return setCurrentQuestion(4);
    if (currentQuestion === 5) return setCurrentQuestion(6);
  };

  const sendToGoogleForm = async () => {
    if (!GOOGLE_FORM_ACTION) return;
    try {
      setIsSending(true);
      const payload = new FormData();
      payload.append(GOOGLE_FORM_ENTRY_FIELD, summary);
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });
      setSubmissionNote("I saved this to the Google Form for you.");
    } catch (error) {
      setSubmissionNote("I kept everything here, even if the form did not load.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async () => {
    await sendToGoogleForm();
    setFormSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-rose-50 via-white to-pink-100 text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,114,182,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(244,63,94,0.12),transparent_30%),radial-gradient(circle_at_40%_80%,rgba(14,165,233,0.1),transparent_35%)]" />
      <FlyingHearts />
      <FloatingFlowers />
      <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="fade-card w-full max-w-4xl rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur-xl md:p-12">
          <header className="fade-item flex flex-col items-center text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-rose-400">A little invitation</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-rose-500 md:text-5xl">
              Hey, would you spend an evening with me?
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              I made a tiny interactive invite because you deserve something sweet and thoughtful.
            </p>
          </header>

          <form onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()} className="mt-10">
            {formSubmitted ? (
              <div className="fade-card flex flex-col items-center gap-6 text-center">
                <Image src="/cat2.jpg" className="rounded-2xl shadow-xl" width={220} height={220} alt="Cute cat celebrating" />
                <p className="text-3xl font-semibold leading-tight text-rose-500 md:text-4xl">
                  See you on {answers.selectedDate ? formatDate(answers.selectedDate) : "our TBD date"} for
                  {" "}
                  {answers.question3 || "dinner"}
                  {" "}
                  and
                  {" "}
                  {answers.question4 || "a movie"}.
                  {" "}
                  💐❤️
                </p>
                {submissionNote && (
                  <p className="text-sm text-slate-500">{submissionNote}</p>
                )}
              </div>
            ) : (
              <>
                {currentQuestion === 0 && (
                  <div className="fade-card flex flex-col items-center gap-8 text-center">
                    <Image src="/cat1.jpg" className="rounded-2xl shadow-xl" width={220} height={220} alt="Cat asking a question" />
                    <p className="text-3xl font-semibold text-rose-500 md:text-4xl">
                      Wanna go out with me for a date?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button
                        type="button"
                        className="w-[180px] rounded-full bg-rose-500 px-6 py-3 text-lg font-semibold shadow-lg shadow-rose-200 transition hover:translate-y-0.5 hover:bg-rose-400"
                        onClick={() => handleYesNo("yes")}
                      >
                        Yes 😏
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-[180px] rounded-full border-rose-200 px-6 py-3 text-lg font-semibold text-rose-500 transition hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50"
                        onClick={() => handleYesNo("no")}
                      >
                        No 😞
                      </Button>
                    </div>
                  </div>
                )}

                {currentQuestion === 1 && (
                  <div className="fade-card flex flex-col items-center gap-8 text-center">
                    <Image src="/cat.gif" className="rounded-2xl shadow-xl" width={220} height={220} alt="Cat with flowers" />
                    <p className="text-3xl font-semibold text-rose-500 md:text-4xl">
                      You said yes! Here are some flowers for you. 💐
                    </p>
                    <Button
                      type="button"
                      className="w-[180px] rounded-full bg-rose-500 px-6 py-3 text-lg font-semibold shadow-lg shadow-rose-200 transition hover:translate-y-0.5 hover:bg-rose-400"
                      onClick={handleNext}
                    >
                      Aww, thanks 🤍
                    </Button>
                  </div>
                )}

                {currentQuestion === 2 && (
                  <div className="fade-card flex flex-col items-center gap-8 text-center">
                    <p className="text-3xl font-semibold text-rose-500 md:text-4xl">When are you free?</p>
                    <div className="rounded-2xl border border-rose-100 bg-white/80 p-4 shadow-lg">
                      <Calendar
                        mode="single"
                        selected={answers.selectedDate}
                        onSelect={(selectedDate) => setAnswers((prev) => ({ ...prev, selectedDate }))}
                        className="rounded-xl border border-rose-100"
                      />
                    </div>
                    <Button
                      type="button"
                      disabled={!answers.selectedDate}
                      className="w-[200px] rounded-full bg-rose-500 px-6 py-3 text-lg font-semibold shadow-lg shadow-rose-200 transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={handleNext}
                    >
                      Confirm 🥳
                    </Button>
                  </div>
                )}

                {currentQuestion === 3 && (
                  <div className="fade-card flex flex-col items-center gap-8 text-center">
                    <p className="text-3xl font-semibold text-rose-500 md:text-4xl">What should we eat?</p>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {foodOptions.map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, question3: option.label }))}
                          className={`group rounded-2xl border border-transparent bg-white/80 p-4 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl ${answers.question3 === option.label ? "border-rose-200 ring-2 ring-rose-200" : ""
                            }`}
                        >
                          <Image
                            src={option.image}
                            alt={option.label}
                            width={180}
                            height={180}
                            className="h-[160px] w-full rounded-xl object-cover shadow"
                          />
                          <p className="mt-4 text-xl font-semibold text-slate-700">{option.label}</p>
                        </button>
                      ))}
                    </div>
                    <Button
                      type="button"
                      disabled={!answers.question3}
                      className="w-[200px] rounded-full bg-rose-500 px-6 py-3 text-lg font-semibold shadow-lg shadow-rose-200 transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={handleNext}
                    >
                      Next 😌
                    </Button>
                  </div>
                )}

                {currentQuestion === 4 && (
                  <div className="flex flex-col items-center gap-8 text-center">
                    <p className="text-3xl font-semibold text-rose-500 md:text-4xl">And which movie?</p>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {movieOptions.map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, question4: option.label }))}
                          className={`group rounded-2xl border border-transparent bg-white/80 p-4 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl ${answers.question4 === option.label ? "border-rose-200 ring-2 ring-rose-200" : ""
                            }`}
                        >
                          <Image
                            src={option.image}
                            alt={option.label}
                            width={180}
                            height={180}
                            className="h-[180px] w-full rounded-xl object-contain shadow"
                          />
                          <p className="mt-4 text-xl font-semibold text-slate-700">{option.label}</p>
                        </button>
                      ))}
                    </div>
                    <Button
                      type="button"
                      disabled={!answers.question4}
                      className="w-[200px] rounded-full bg-rose-500 px-6 py-3 text-lg font-semibold shadow-lg shadow-rose-200 transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={handleSubmit}
                    >
                      Lock it in 💫
                    </Button>
                    {isSending && <p className="text-sm text-slate-500">Sealing it with a heart...</p>}
                  </div>
                )}

                {currentQuestion === 5 && (
                  <div className="fade-card flex flex-col items-center gap-6 text-center">
                    <p className="text-3xl font-semibold text-rose-500 md:text-4xl">Why no? Be honest.</p>
                    <p className="max-w-xl text-slate-600">
                      If timing is off, that is okay. I just want to hear from you.
                    </p>
                    <textarea
                      className="w-full max-w-xl rounded-2xl border border-rose-100 bg-white/80 p-4 text-slate-700 shadow-inner focus:border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-100"
                      rows={4}
                      placeholder="Tell me anything…"
                      value={answers.questionNoReason}
                      onChange={(event) => setAnswers((prev) => ({ ...prev, questionNoReason: event.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      className="w-[200px] rounded-full bg-rose-500 px-6 py-3 text-lg font-semibold shadow-lg shadow-rose-200 transition hover:bg-rose-400"
                      onClick={handleNext}
                    >
                      Next 😌
                    </Button>
                  </div>
                )}

                {currentQuestion === 6 && (
                  <div className="fade-card flex flex-col items-center gap-6 text-center">
                    <p className="text-3xl font-semibold text-rose-500 md:text-4xl">
                      Are you sure you don&apos;t want to reconsider?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button
                        type="button"
                        className="w-[160px] rounded-full bg-rose-500 px-6 py-3 text-lg font-semibold shadow-lg shadow-rose-200 transition hover:bg-rose-400"
                        onClick={handleSubmit}
                      >
                        Yes, I&apos;m sure
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-[160px] rounded-full border-rose-200 px-6 py-3 text-lg font-semibold text-rose-500 transition hover:border-rose-300 hover:bg-rose-50"
                        onClick={handleSubmit}
                      >
                        Okay, let&apos;s go
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
