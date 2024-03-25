using AdvancedAnalyticsAPI.Models;
using AdvancedAnalyticsAPI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
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
            return await _appInsightsService.GetSimpleCount(query);
        }

        [HttpGet]
        [Route("GetLastWeekErrorsFull")]
        public async Task<IEnumerable<Error>> GetLastWeekErrorsFull()
        {
            var query = @"
                    exceptions
                    | where timestamp >= startofday(ago(7d))
                    | project TimeStamp = timestamp, ErrorMessage = outerMessage, PageName = operation_Name, ItemID = itemId
                    | order by TimeStamp desc
                ";
            return await _appInsightsService.GetErrors(query);
        }

        [HttpGet]
        [Route("GetUserErrors")]
        public async Task<IEnumerable<Error>> GetUserErrors(int UID)
        {
            var query = @"
                    exceptions 
                    | where timestamp >= startofday(ago(30d))
                    | where user_AccountId == " + UID + @"
                    | project TimeStamp = timestamp, ErrorMessage = outerMessage, PageName = operation_Name, ItemID = itemId
                ";
            return await _appInsightsService.GetErrors(query);
        }

        [HttpGet]
        [Route("GetPageErrors")]
        public async Task<IEnumerable<Error>> GetPageErrors(string PageUrl)
        {
            var query = @"
                    exceptions 
                    | where timestamp >= startofday(ago(30d))
                    | where operation_Name has '" + PageUrl + @"'
                    | project TimeStamp = timestamp, ErrorMessage = outerMessage, PageName = operation_Name, ItemID = itemId
                ";
            return await _appInsightsService.GetErrors(query);
        }

        [HttpGet]
        [Route("GetErrorDetails")]
        public async Task<ErrorDetail> GetErrorDetails(string ItemID)
        {
            var query = @"
                    exceptions
                    | where timestamp >= startofday(ago(30d))
                    | where itemId == '" + ItemID + @"'
                    | project TimeStamp = timestamp, ErrorMessage = outerMessage, PageName = operation_Name, ItemID = itemId, Browser = client_Browser, OS = client_OS, City = client_City, State = client_StateOrProvince, Method = method, Stack = details[0].parsedStack, UserID = user_AccountId
                ";
            return await _appInsightsService.GetErrorDetails(query);
        }
    }
}
