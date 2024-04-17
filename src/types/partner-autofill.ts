type TPartnerAutofill = {
    mov: {
        report: number;
        certif: number;
        moa: number;
    };
    data: {
        kind: string;
        mimeType: string;
        id: string;
        name: string;
    }[];
    error: null;
    results: {
        partner: string;
        extensionActivityTitle: string;
        dateStarted: string;
        dateEnded: string;
        implementors: string;
    };
};
