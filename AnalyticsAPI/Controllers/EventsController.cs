using AdvancedAnalyticsAPI.Models;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.ApplicationInsights.Query;

namespace AdvancedAnalyticsAPI.Controllers
{
    [Route("Events")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        string apiKey = "";
        string appId = "6dbf6d2a-104f-44d2-b549-a8e7f150100c";

        [HttpGet]
        [Route("GetPowerUsers")]
        public async Task<IEnumerable<PowerUser>> GetPowerUsers()
        {
            var credentials = new ApiKeyClientCredentials(apiKey);
            var applicationInsightsClient = new ApplicationInsightsDataClient(credentials);
            var query = @"
                    customEvents
                    | where name == 'ClickEvent'
                    | project UserId = toint(customDimensions.UserId)
                    | summarize UserCount = count() by UserId
                    | top 5 by UserCount
                    | order by UserCount desc
                ";
            var response = await applicationInsightsClient.Query.ExecuteWithHttpMessagesAsync(appId, query);

            var responseList = new List<PowerUser>();
            foreach (var row in response.Body.Tables[0].Rows)
            {
                var responseItem = new PowerUser
                {
                    UserId = row[0].ToString(),
                    Count = Convert.ToInt32(row[1])
                };
                responseList.Add(responseItem);
            }

            return responseList;
        }
    }
}
