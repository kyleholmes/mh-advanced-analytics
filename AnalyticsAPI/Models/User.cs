namespace AdvancedAnalyticsAPI.Models
{
    public class User
    {
        public int? Uid { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? JobTitle { get; set; }
        public int? Active { get; set; }
        public int? LastApp { get; set; }
        public int? LastPID { get; set; }
        public int? LoginCount { get; set; }
        public DateTime? LastLogin { get; set; }
        public DateTime? PrevLogin { get; set; }
        public int? IsMHIUser { get; set; }
        public int? DisplayHeight { get; set; }
        public int?  MacroManagerQuickAccessPageID { get; set; }
        public int? Architect340BQuickAccessPageID { get; set; }
        public int? GatewayQuickAccessPageID { get; set; }
        public DateTime? DateAdded { get; set; }
        public DateTime? ProfileUpdated { get; set; }
    }
}
