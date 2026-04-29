import * as React from "react";

interface MatchmakerContextType {
  selectedAnswers: Record<string, string | string[]>;
  setAnswer: (questionSlug: string, answerSlug: string | string[]) => void;
  toggleAnswer: (questionSlug: string, answerSlug: string) => void;
  resetAnswers: () => void;
}

const MatchmakerContext = React.createContext<
  MatchmakerContextType | undefined
>(undefined);

export function MatchmakerProvider({ children }: React.PropsWithChildren<{}>) {
  const [selectedAnswers, setSelectedAnswers] = React.useState<
    Record<string, string | string[]>
  >({});

  const setAnswer = React.useCallback(
    (questionSlug: string, answerSlug: string | string[]) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionSlug]: answerSlug,
      }));
    },
    [],
  );

  const toggleAnswer = React.useCallback(
    (questionSlug: string, answerSlug: string) => {
      setSelectedAnswers((prev) => {
        const current = prev[questionSlug];
        const currentArray = Array.isArray(current) ? current : [];

        if (currentArray.includes(answerSlug)) {
          return {
            ...prev,
            [questionSlug]: currentArray.filter((id) => id !== answerSlug),
          };
        } else {
          return {
            ...prev,
            [questionSlug]: [...currentArray, answerSlug],
          };
        }
      });
    },
    [],
  );

  const resetAnswers = React.useCallback(() => {
    setSelectedAnswers({});
  }, []);

  return (
    <MatchmakerContext.Provider
      value={{ selectedAnswers, setAnswer, toggleAnswer, resetAnswers }}
    >
      {children}
    </MatchmakerContext.Provider>
  );
}

export function useMatchmaker() {
  const context = React.useContext(MatchmakerContext);
  if (context === undefined) {
    throw new Error("useMatchmaker must be used within a MatchmakerProvider");
  }
  return context;
}
