using AdvancedAnalyticsAPI.Common;
using AdvancedAnalyticsAPI.Models;
using Azure;
using Microsoft.Azure.ApplicationInsights.Query;
using Microsoft.Azure.ApplicationInsights.Query.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Rest;
using System.Data;

namespace AdvancedAnalyticsAPI.Services
{
    public class AppInsightsService
    {
        public IConfiguration Configuration { get; }
        private readonly ArchitectMainContext _architectMainContext;

        public AppInsightsService(IConfiguration configuration, ArchitectMainContext architectMainContext)
        {
            Configuration = configuration;
            _architectMainContext = architectMainContext;
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

        public async Task<IEnumerable<SimpleCount>> GetPowerUsersAsync(string query)
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

            foreach (var item in responseList)
            {
                var user = await GetUserFullName(item.Variable);
                item.Variable = user.FirstName + " " + user.LastName;
            }

            return responseList;
        }

        public async Task<UserFullName> GetUserFullName(string userId)
        {
            List<SqlParameter> sqlParams = new();
            _architectMainContext.AddParameters(sqlParams, "@UID", SqlDbType.Int, ParameterDirection.Input,Convert.ToInt32(userId));

            var user = await _architectMainContext.UserFullName.FromSqlRaw(_architectMainContext.BuildSQLComand(StoredProcs.GetUserFullName, sqlParams), sqlParams.ToArray()).ToListAsync();
            return new UserFullName
            {
                FirstName = user[0].FirstName,
                LastName = user[0].LastName
            };
        }

        public async Task<IEnumerable<SimpleCount>> GetUserLogins(string query)
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
    }
}
