type TPublicationAutofill = {
    mov: {
        abstract: number;
        title: number;
        table: number;
        full: number;
    };
    data: ({ kind: string; mimeType: string; id: string; name: string } | null)[];
    error: {
        movError: string;
    };
    results: {
        title: string;
        keywords: string;
        authors: string[];
        date: string;
        publisher: string;
        volume: string;
    };
};
