import * as React from "react";

interface MatchmakerContextType {
  selectedAnswers: Record<string, string>;
  setAnswer: (questionSlug: string, answerSlug: string) => void;
  resetAnswers: () => void;
}

const MatchmakerContext = React.createContext<
  MatchmakerContextType | undefined
>(undefined);

export function MatchmakerProvider({ children }: React.PropsWithChildren<{}>) {
  const [selectedAnswers, setSelectedAnswers] = React.useState<
    Record<string, string>
  >({});

  const setAnswer = React.useCallback(
    (questionSlug: string, answerSlug: string) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionSlug]: answerSlug,
      }));
    },
    [],
  );

  const resetAnswers = React.useCallback(() => {
    setSelectedAnswers({});
  }, []);

  return (
    <MatchmakerContext.Provider
      value={{ selectedAnswers, setAnswer, resetAnswers }}
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
