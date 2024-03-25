using AdvancedAnalyticsAPI.Models;
using AdvancedAnalyticsAPI.Services;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.ApplicationInsights.Query;

namespace AdvancedAnalyticsAPI.Controllers
{
    [Route("Events")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly AppInsightsService _appInsightsService;

        public EventsController(AppInsightsService appInsightsService)
        {
            _appInsightsService = appInsightsService;
        }

        [HttpGet]
        [Route("GetPowerUsers")]
        public async Task<IEnumerable<SimpleCount>> GetPowerUsers()
        {
            var query = @"
                    customEvents
                    | where name == 'ClickEvent'
                    | project UserId = toint(customDimensions.UserId)
                    | summarize UserCount = count() by UserId
                    | top 5 by UserCount
                    | order by UserCount desc
                ";

            return await _appInsightsService.GetPowerUsers(query);
        }

        [HttpGet]
        [Route("GetUserLogins")]
        public async Task<IEnumerable<SimpleCount>> GetUserLogins()
        {
            var query = @"
                    customEvents
                    | where name == 'USER_LOGGED_IN'
                    | where timestamp >= startofday(ago(7d))
                    | project Day = tostring(split(timestamp, 'T')[0])
                    | summarize Count = count() by Day
                    | order by Day asc 
                ";

            return await _appInsightsService.GetSimpleCount(query);
        }

        [HttpGet]
        [Route("GetUserActivity")]
        public async Task<IEnumerable<Activity>> GetUserActivity(int UID)
        {
            var query = @"
                    customEvents
                    | where timestamp >= startofday(ago(7d))
                    | where customDimensions.UserId == " + UID + @"
                    | order by timestamp desc
                    | project TimeStamp = timestamp, Action = name, Page = customDimensions.Page, EventInfo = customDimensions.EventInfo
                ";

            return await _appInsightsService.GetActivity(query);
        }

        [HttpGet]
        [Route("GetPageActivity")]
        public async Task<IEnumerable<Activity>> GetPageActivity(string PageUrl)
        {
            var query = @"
                    customEvents
                    | where timestamp >= startofday(ago(30d))
                    | where name == 'ClickEvent'
                    | where operation_Name has '" + PageUrl + @"'
                    | order by timestamp desc
                    | project TimeStamp = timestamp, Action = name, Page = customDimensions.Page, EventInfo = customDimensions.EventInfo
                ";

            return await _appInsightsService.GetActivity(query);
        }
    }
}
