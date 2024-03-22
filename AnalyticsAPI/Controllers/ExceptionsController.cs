using AdvancedAnalyticsAPI.Models;
using AdvancedAnalyticsAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.ApplicationInsights.Query;

namespace AdvancedAnalyticsAPI.Controllers
{
    [Route("Exceptions")]
    [ApiController]
    public class ExceptionsController : ControllerBase
    {
        private readonly AppInsightsService _appInsightsService;

        public ExceptionsController(AppInsightsService appInsightsService)
        {
            _appInsightsService = appInsightsService;
        }

        [HttpGet]
        [Route("GetLastWeekErrors")]
        public async Task<IEnumerable<SimpleCount>> GetLastWeekErrors()
        {
            var query = @"
                    exceptions
                        | where timestamp >= startofday(ago(7d))
                        | project Day = tostring(split(timestamp, 'T')[0])
                        | summarize Count = count() by Day
                        | order by Day asc 
                ";
            return await _appInsightsService.GetSimpleCountAsync(query);
        }

        [HttpGet]
        [Route("GetUserErrors")]
        public async Task<IEnumerable<Error>> GetUserErrors(int UID)
        {
            var query = @"
                    exceptions 
                    | where timestamp >= startofday(ago(30d))
                    | where user_AccountId == " + UID + @"
                    | project TimeStamp = timestamp, ErrorMessage = outerMessage, PageName = operation_Name
                ";
            return await _appInsightsService.GetUserErrors(query);
        }
    }
}
