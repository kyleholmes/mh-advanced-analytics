using AdvancedAnalyticsAPI.Models;
using Azure;
using Microsoft.Azure.ApplicationInsights.Query;
using Microsoft.Azure.ApplicationInsights.Query.Models;
using Microsoft.Rest;

namespace AdvancedAnalyticsAPI.Services
{
    public class AppInsightsService
    {
        public IConfiguration Configuration { get; }

        public AppInsightsService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public async Task<IEnumerable<SimpleCount>> GetSimpleCountAsync(string query)
        {
            var credentials = new ApiKeyClientCredentials(Configuration["apiKey"]);
            var applicationInsightsClient = new ApplicationInsightsDataClient(credentials);
            var returnList = await applicationInsightsClient.Query.ExecuteWithHttpMessagesAsync(Configuration["appId"], query);
            var responseList = new List<SimpleCount>();
            foreach (var row in returnList.Body.Tables[0].Rows)
            {
                var responseItem = new SimpleCount
                {
                    Variable = row[0].ToString(),
                    Count = Convert.ToInt32(row[1])
                };
                responseList.Add(responseItem);
            }
            return responseList;
        }

        public async Task<IEnumerable<UserLogin>> GetUserLogins(string query)
        {
            var credentials = new ApiKeyClientCredentials(Configuration["apiKey"]);
            var applicationInsightsClient = new ApplicationInsightsDataClient(credentials);
            var returnList = await applicationInsightsClient.Query.ExecuteWithHttpMessagesAsync(Configuration["appId"], query);
            var responseList = new List<UserLogin>();
            foreach (var row in returnList.Body.Tables[0].Rows)
            {
                var responseItem = new UserLogin
                {
                    LoginTime = row[0].ToString(),
                    UserId = Convert.ToInt32(row[1])
                };
                responseList.Add(responseItem);
            }
            return responseList;
        }
    }
}
