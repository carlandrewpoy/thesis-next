type TProject = {
  mov: {
    moa: number;
    report: number;
    budget: number;
    resolution: number;
  };
  data: (File | null)[];
  error: {
    movError: string;
  };
  results: {
    mandatedProgram: string;
    extensionProgramTitle: string;
    dateStarted: string;
    dateEnded: string;
    beneficiaries: string;
  };
};