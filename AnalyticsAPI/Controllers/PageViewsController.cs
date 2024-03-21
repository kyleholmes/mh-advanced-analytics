using AdvancedAnalyticsAPI.Models;
using AdvancedAnalyticsAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.ApplicationInsights.Query;

namespace AdvancedAnalyticsAPI.Controllers
{
    [Route("PageViews")]
    [ApiController]
    public class PageViewsController : ControllerBase
    {
        private readonly AppInsightsService _appInsightsService;

        public PageViewsController(AppInsightsService appInsightsService)
        {
            _appInsightsService = appInsightsService;
        }

        [HttpGet]
        [Route("GetDeviceTypes")]
        public async Task<IEnumerable<SimpleCount>> GetDeviceTypes()
        {
            var query = "pageViews "
                + "| where notempty(customDimensions.ScreenSize) "
                + "| project Device = case(toint(split(customDimensions.ScreenSize, 'x')[0]) < 768, 'Phone', "
                + "toint(split(customDimensions.ScreenSize, 'x')[0]) between (768 .. 992),'Tablet', 'Computer') "
                + "| summarize DeviceCount = count() by Device";

            return await _appInsightsService.GetSimpleCountAsync(query);
        }

        [HttpGet]
        [Route("GetScreenSizes")]
        public async Task<IEnumerable<SimpleCount>> GetScreenSizes()
        {
            var query = @"
                pageViews
                    | where notempty(customDimensions.ScreenSize)
                    | project ScreenSize = customDimensions.ScreenSize, Device = case(toint(split(customDimensions.ScreenSize, 'x')[0]) between(992 .. 1200),
                    'Small Computer 992px-1200px', toint(split(customDimensions.ScreenSize, 'x')[0]) between (1200 .. 1800),
                    'Large Computer 1200px-1800px', 'Extra Large Computer 1800px+')
                    | where toint(split(ScreenSize, 'x')[0]) > 992
                    | summarize DeviceCount = count() by Device
                ";

            return await _appInsightsService.GetSimpleCountAsync(query);
        }

        [HttpGet]
        [Route("GetPageLoads")]
        public async Task<IEnumerable<SimpleCount>> GetPageLoads()
        {
            var query = @"
                pageViews
                    | where timestamp >= startofday(ago(7d))
                    | where customDimensions.Page != ''
                    | project PageName = customDimensions.Page
                    | summarize Count = count() by tostring(PageName)
                    | top 5 by Count
                    | order by Count desc
                ";

            return await _appInsightsService.GetSimpleCountAsync(query);
        }
    }
}
