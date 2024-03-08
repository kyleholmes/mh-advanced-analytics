using AdvancedAnalyticsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.ApplicationInsights.Query;

namespace AdvancedAnalyticsAPI.Controllers
{
    [Route("Exceptions")]
    [ApiController]
    public class ExceptionsController : ControllerBase
    {
        string apiKey = "";
        string appId = "6dbf6d2a-104f-44d2-b549-a8e7f150100c";

        [HttpGet]
        [Route("GetLastWeekErrors")]
        public async Task<IEnumerable<ErrorByDay>> GetLastWeekErrors()
        {
            var credentials = new ApiKeyClientCredentials(apiKey);
            var applicationInsightsClient = new ApplicationInsightsDataClient(credentials);
            var query = @"
                    exceptions
                        | where timestamp >= startofday(ago(7d))
                        | project Day = tostring(split(timestamp, 'T')[0])
                        | summarize Count = count() by Day
                        | order by Day asc 
                ";
            var response = await applicationInsightsClient.Query.ExecuteWithHttpMessagesAsync(appId, query);

            var responseList = new List<ErrorByDay>();
            foreach (var row in response.Body.Tables[0].Rows)
            {
                var responseItem = new ErrorByDay
                {
                    Day = row[0].ToString(),
                    Count = Convert.ToInt32(row[1])
                };
                responseList.Add(responseItem);
            }

            return responseList;
        }
    }
}
