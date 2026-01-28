using {codesprint as db} from '../db/schema';

service DashboardService {
    entity ScanSummary       as projection on db.ScanSummary;
    entity PriorityBreakdown as projection on db.PriorityBreakdown;
    entity Remediation       as projection on db.Remediation;
    entity Finance           as projection on db.Finance;
    entity Materials         as projection on db.Materials;
    entity Sales             as projection on db.Sales;
    entity Controlling       as projection on db.Controlling;
    entity Human             as projection on db.Human;
    entity Production        as projection on db.Production;
    entity Quality           as projection on db.Quality;
    entity Others            as projection on db.Others;

}
