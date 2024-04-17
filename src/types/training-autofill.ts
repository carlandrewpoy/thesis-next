type Filee = {
  kind: string;
  mimeType: string;
  id: string;
  name: string;
};

type ResultsOverallTimeliness = {
  Poor: number;
  fair: number;
  satisfactory: number;
  very_satisfactory: number;
  excellent: number;
};

type ResultsOverall = ResultsOverallTimeliness;

type Results = {
  title: string;
  venue: string;
  dateStarted: string;
  dateEnded: string;
  duration: string;
  totalTrainees: number;
  weightedTrainees: number;
  tookSurvey: number;
  overall: ResultsOverall;
  timeliness: ResultsOverall;
};

type Mov = {
  report: number;
  summary: number;
  attendance: number;
  sample: number;
};

type TTraingingAutofill = {
  mov: Mov;
  data: Filee[];
  error: null | string;
  results: Results;
};
