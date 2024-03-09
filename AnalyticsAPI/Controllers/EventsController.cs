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

            return await _appInsightsService.GetSimpleCountAsync(query);
        }
    }
}
