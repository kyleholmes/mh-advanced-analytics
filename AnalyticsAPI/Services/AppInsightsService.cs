using AdvancedAnalyticsAPI.Common;
using AdvancedAnalyticsAPI.Models;
using Microsoft.Azure.ApplicationInsights.Query;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<SimpleCount>> GetSimpleCount(string query)
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

        public async Task<string> GetSingleValue(string query)
        {
            var credentials = new ApiKeyClientCredentials(Configuration["apiKey"]);
            var applicationInsightsClient = new ApplicationInsightsDataClient(credentials);
            var returnList = await applicationInsightsClient.Query.ExecuteWithHttpMessagesAsync(Configuration["appId"], query);
            return returnList.Body.Tables[0].Rows[0][0].ToString();
        }

        public async Task<IEnumerable<SimpleCount>> GetPowerUsers(string query)
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

        public async Task<IEnumerable<Error>> GetErrors(string query)
        {
            var credentials = new ApiKeyClientCredentials(Configuration["apiKey"]);
            var applicationInsightsClient = new ApplicationInsightsDataClient(credentials);
            var returnList = await applicationInsightsClient.Query.ExecuteWithHttpMessagesAsync(Configuration["appId"], query);
            var responseList = new List<Error>();
            foreach (var row in returnList.Body.Tables[0].Rows)
            {
                var responseItem = new Error
                {
                    TimeStamp = row[0].ToString(),
                    ErrorMessage = row[1].ToString(),
                    PageName = row[2].ToString(),
                    ItemID = row[3].ToString()
                };
                responseList.Add(responseItem);
            }
            return responseList;
        }

        public async Task<IEnumerable<Activity>> GetActivity(string query)
        {
            var credentials = new ApiKeyClientCredentials(Configuration["apiKey"]);
            var applicationInsightsClient = new ApplicationInsightsDataClient(credentials);
            var returnList = await applicationInsightsClient.Query.ExecuteWithHttpMessagesAsync(Configuration["appId"], query);
            var responseList = new List<Activity>();
            foreach (var row in returnList.Body.Tables[0].Rows)
            {
                var responseItem = new Activity
                {
                    TimeStamp = row[0].ToString(),
                    Action = row[1].ToString(),
                    Page = row[2].ToString(),
                    EventInfo = row[3] != null ? row[3].ToString() : ""
                };
                responseList.Add(responseItem);
            }
            return responseList;
        }

        public async Task<ErrorDetail> GetErrorDetails(string query)
        {
            var credentials = new ApiKeyClientCredentials(Configuration["apiKey"]);
            var applicationInsightsClient = new ApplicationInsightsDataClient(credentials);
            var returnList = await applicationInsightsClient.Query.ExecuteWithHttpMessagesAsync(Configuration["appId"], query);
            var responseList = new List<ErrorDetail>();
            foreach (var row in returnList.Body.Tables[0].Rows)
            {
                var responseItem = new ErrorDetail
                {
                    TimeStamp = row[0].ToString(),
                    ErrorMessage = row[1].ToString(),
                    PageName = row[2].ToString(),
                    ItemID = row[3].ToString(),
                    Browser = row[4].ToString(),
                    OS = row[5].ToString(),
                    City = row[6].ToString(),
                    State = row[7].ToString(),
                    Method = row[8].ToString(),
                    Stack = row[9].ToString(),
                    UserID = row[10].ToString()
                };
                responseList.Add(responseItem);
            }

            foreach (var item in responseList)
            {
                if(item.UserID != "")
                {
                    var user = await GetUserFullName(item.UserID);
                    item.UserID = user.FirstName + " " + user.LastName;
                }
            }

            return responseList[0];
        }
    }
}
