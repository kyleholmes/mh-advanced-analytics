using AdvancedAnalyticsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.ApplicationInsights.Query;

namespace AdvancedAnalyticsAPI.Controllers
{
    [Route("PageViews")]
    [ApiController]
    public class PageViewsController : ControllerBase
    {
        string apiKey = "";
        string appId = "6dbf6d2a-104f-44d2-b549-a8e7f150100c";

        [HttpGet]
        [Route("GetDeviceTypes")]
        public async Task<IEnumerable<DeviceType>> GetDeviceTypes()
        {
            var credentials = new ApiKeyClientCredentials(apiKey);
            var applicationInsightsClient = new ApplicationInsightsDataClient(credentials);
            var query = "pageViews "
                + "| where notempty(customDimensions.ScreenSize) "
                + "| project Device = case(toint(split(customDimensions.ScreenSize, 'x')[0]) < 768, 'Phone', "
                + "toint(split(customDimensions.ScreenSize, 'x')[0]) between (768 .. 992),'Tablet', 'Computer') "
                + "| summarize DeviceCount = count() by Device";
            var response = await applicationInsightsClient.Query.ExecuteWithHttpMessagesAsync(appId, query);

            var deviceTypes = new List<DeviceType>();
            foreach (var row in response.Body.Tables[0].Rows)
            {
                var deviceType = new DeviceType
                {
                    DeviceName = row[0].ToString(),
                    Count = Convert.ToInt32(row[1])
                };
                deviceTypes.Add(deviceType);
            }

            return deviceTypes;
        }

        [HttpGet]
        [Route("GetScreenSizes")]
        public async Task<IEnumerable<ScreenSize>> GetScreenSizes()
        {
            var credentials = new ApiKeyClientCredentials(apiKey);
            var applicationInsightsClient = new ApplicationInsightsDataClient(credentials);
            var query = @"
                pageViews
                    | where notempty(customDimensions.ScreenSize)
                    | project ScreenSize = customDimensions.ScreenSize, Device = case(toint(split(customDimensions.ScreenSize, 'x')[0]) between(992 .. 1200),
                    'Small Computer 992px-1200px', toint(split(customDimensions.ScreenSize, 'x')[0]) between (1200 .. 1800),
                    'Large Computer 1200px-1800px', 'Extra Large Computer 1800px+')
                    | where toint(split(ScreenSize, 'x')[0]) > 992
                    | summarize DeviceCount = count() by Device
                ";
            var response = await applicationInsightsClient.Query.ExecuteWithHttpMessagesAsync(appId, query);

            var screenSizes = new List<ScreenSize>();
            foreach (var row in response.Body.Tables[0].Rows)
            {
                var deviceType = new ScreenSize
                {
                    DeviceName = row[0].ToString(),
                    Count = Convert.ToInt32(row[1])
                };
                screenSizes.Add(deviceType);
            }

            return screenSizes;
        }

        [HttpGet]
        [Route("GetPageLoads")]
        public async Task<IEnumerable<PageLoads>> GetPageLoads()
        {
            var credentials = new ApiKeyClientCredentials(apiKey);
            var applicationInsightsClient = new ApplicationInsightsDataClient(credentials);
            var query = @"
                pageViews
                    | where timestamp >= startofday(ago(7d))
                    | project operation_Name
                    | summarize Count = count() by operation_Name
                    | top 5 by Count
                    | order by Count desc
                ";
            var response = await applicationInsightsClient.Query.ExecuteWithHttpMessagesAsync(appId, query);

            var returnList = new List<PageLoads>();
            foreach (var row in response.Body.Tables[0].Rows)
            {
                var responseItem = new PageLoads
                {
                    PageName = row[0].ToString().Split("/#/")[1],
                    Count = Convert.ToInt32(row[1])
                };
                returnList.Add(responseItem);
            }

            return returnList;
        }
    }
}
