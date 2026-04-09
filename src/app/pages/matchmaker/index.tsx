import * as React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import questions from "@/data/questions.json" with { type: "json" };
import answers from "@/data/answers.json" with { type: "json" };

import { useMatchmaker } from "@/contexts/matchmaker";

export { Results } from "./results";

export function Questionnaire() {
  const [, setLocation] = Wouter.useLocation();
  const [currentStep, setCurrentStep] = React.useState(0);
  const { selectedAnswers, setAnswer } = useMatchmaker();

  const question = questions[currentStep]!;
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerSlug: string) => {
    setAnswer(question.slug, answerSlug);
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLocation("/matchmaker/results");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      history.back();
    }
  };

  return (
    <div className="flex h-svh flex-col bg-white text-neutral-900">
      {/* Questionnaire Content */}
      <main className="mx-auto flex w-full max-w-2xl flex-1 grow flex-col justify-start px-6 py-6">
        {/* Progress Bar */}
        <div className="mb-12 flex flex-col gap-2">
          <div className="mb-2 grid grid-cols-3 items-center text-sm font-semibold text-neutral-400">
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-1"
            >
              <Lucide.MoveLeft className="size-5" />
            </button>

            <Wouter.Link href="/">
              <div className="text-center text-lg leading-none font-bold tracking-tight text-neutral-900">
                Match<span className="text-primary">maker</span>
              </div>
            </Wouter.Link>

            <span className="text-right tracking-wider">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Area */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="mb-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              {question.title}
            </h1>
          </header>

          <div className="grid grid-cols-1 gap-4">
            {question.answers.map((answerSlug) => {
              const answer = answers.find((a) => a.slug === answerSlug);
              if (!answer) return null;

              const isSelected = selectedAnswers[question.slug] === answerSlug;

              return (
                <button
                  key={answerSlug}
                  onClick={() => handleAnswerSelect(answerSlug)}
                  className={`flex items-center justify-between rounded-s-full rounded-e-full border-2 py-4 pr-4 pl-6 text-left outline-3 transition-all ${
                    isSelected
                      ? "border-white bg-primary outline-primary/10"
                      : "border-neutral-100 bg-white outline-transparent hover:border-neutral-200"
                  }`}
                >
                  <span
                    className={`text-base font-medium ${isSelected ? "font-semibold text-white" : "text-neutral-500"}`}
                  >
                    {answer.title}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <div className="grow" />

        {/* Footer Actions */}
        <footer className="flex flex-col gap-2">
          <button
            onClick={nextStep}
            disabled={!selectedAnswers[question.slug]}
            className={`flex h-14 w-full items-center justify-center rounded-full px-8 font-bold transition-all ${
              selectedAnswers[question.slug]
                ? "bg-neutral-900 text-white shadow-md hover:bg-neutral-800 active:scale-95"
                : "pointer-events-none bg-neutral-50 text-neutral-300"
            }`}
          >
            {currentStep === questions.length - 1 ? "Get Results" : "Next"}
          </button>
        </footer>
      </main>
    </div>
  );
}
