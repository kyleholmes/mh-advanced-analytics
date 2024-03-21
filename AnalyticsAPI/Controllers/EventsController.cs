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

            return await _appInsightsService.GetPowerUsersAsync(query);
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

            return await _appInsightsService.GetUserLogins(query);
        }
    }
}
