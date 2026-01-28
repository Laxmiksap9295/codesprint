namespace codesprint;

@odata.singleton
entity ScanSummary {
    key ID            : UUID;
        totalPackages : Integer;
        linesOfCode   : Integer;
        issuesFound   : Integer;
        scanDuration  : Decimal(5, 2);
}

entity PriorityBreakdown {
    key ID             : UUID;
        highPriority   : Integer;
        mediumPriority : Integer;
        lowPriority    : Integer;
}

entity Remediation {
    key ID              : UUID;
        automaticCount  : Integer;
        manualCount     : Integer;
        autoFixCoverage : Integer;
        autoCoverage    : Decimal(3, 2);
}

entity Finance {
    key ID  : UUID;
        resolved    : Integer;
        inProgress  : Integer;
        pending     : Integer;
        progress    : Integer;
        total       : Integer;
}

entity Materials {
    key ID  : UUID;
        resolved    : Integer;
        inProgress  : Integer;
        pending     : Integer;
        progress    : Integer;
        total       : Integer;
}

entity Sales {
    key ID  : UUID;
        resolved    : Integer;
        inProgress  : Integer;
        pending     : Integer;
        progress    : Integer;
        total       : Integer;
}

entity Controlling {
    key ID  : UUID;
        resolved    : Integer;
        inProgress  : Integer;
        pending     : Integer;
        progress    : Integer;
        total       : Integer;
}

entity Human {
    key ID  : UUID;
        resolved    : Integer;
        inProgress  : Integer;
        pending     : Integer;
        progress    : Integer;
        total       : Integer;
}

entity Production {
    key ID  : UUID;
        resolved    : Integer;
        inProgress  : Integer;
        pending     : Integer;
        progress    : Integer;
        total       : Integer;
}

entity Quality {
    key ID  : UUID;
        resolved    : Integer;
        inProgress  : Integer;
        pending     : Integer;
        progress    : Integer;
        total       : Integer;
}

entity Others {
    key ID  : UUID;
        resolved    : Integer;
        inProgress  : Integer;
        pending     : Integer;
        progress    : Integer;
        total       : Integer;
}