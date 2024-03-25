namespace AdvancedAnalyticsAPI.Models
{
    public class ErrorDetail
    {
        public string TimeStamp { get; set; }
        public string ErrorMessage { get; set; }
        public string PageName { get; set; }
        public string ItemID { get; set; }
        public string Browser { get; set; }
        public string OS { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Method { get; set; }
        public string Stack { get; set; }
        public string UserID { get; set; }

    }
}
